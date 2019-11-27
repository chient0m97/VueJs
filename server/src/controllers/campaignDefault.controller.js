/**
 * Controller campaign example for project
 * author: hoc-anms
 * updater: ___
 * date up: 21/06/2019
 * date to: ___
 * team: BE-RHP
 */
// const MarketProductPost = require( "../models/market/products/post.model" );
const CategoryDefault = require( "../models/CategoryDefault.model" );
const CampaignDefault = require( "../models/CampaignDefault.model" );
const Account = require( "../models/Account.model" );
const Server = require( "../models/Server.model" );

const jsonResponse = require( "../configs/response" ),
  { syncCampaignExample } = require( "../microservices/synchronize/campaign" );


module.exports = {
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await CampaignDefault.findOne( { "_id": req.query._id } )
        .populate( "postCategory.morning postCategory.night mix.open mix.close" )
        .populate( { "path": "_account", "select": "name imageAvatar" } )
        .populate( { "path": "_editor", "select": "name imageAvatar" } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await CampaignDefault.find( {} )
        .populate( "postCategory.morning postCategory.night" )
        .populate( { "path": "_account", "select": "name imageAvatar" } )
        .populate( { "path": "_editor", "select": "name imageAvatar" } ).lean();
    }

    res
      .status( 200 )
      .json( jsonResponse( "success", dataResponse ) );
  },
  "create": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" || req.body.title === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề chiến dịch không được bỏ trống!" } } );
    }
    // Handle create with mongodb
    const morning = await CategoryDefault.findOne( { "_id": req.body.postCategory.morning } ).lean(),
      night = await CategoryDefault.findOne( { "_id": req.body.postCategory.night } ).lean(),
      mixOpen = await CategoryDefault.findOne( { "_id": req.body.mix.open } ).lean(),
      mixClose = await CategoryDefault.findOne( { "_id": req.body.mix.close } ).lean(),
      newCampaignDefault = await new CampaignDefault( {
        "title": req.body.title,
        "totalDay": req.body.totalDay,
        "postCategory": {
          "morning": morning,
          "night": night
        },
        "mix": {
          "open": mixOpen,
          "close": mixClose
        },
        "description": req.body.description ? req.body.description : "",
        "_account": req.uid
      } );

    // Save mongodb
    await newCampaignDefault.save();

    res.status( 200 ).json( jsonResponse( "success", newCampaignDefault ) );
  },
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tiêu đề chiến dịch mẫu không được bỏ trống!" } } );
    }

    const campaignDefaultInfo = await CampaignDefault.findOne( { "_id": req.query._id } );

    // Check catch when update post categories
    if ( !campaignDefaultInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch mẫu không tồn tại!" } );
    }

    // Last person update
    req.body._editor = req.uid;

    res.status( 201 ).json( jsonResponse( "success", await CampaignDefault.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) ) );
  },
  "delete": async ( req, res ) => {
    const campaignDefaultInfo = await CampaignDefault.findOne( { "_id": req.query._id } );

    // Check catch when delete post categories
    if ( !campaignDefaultInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch mẫu không tồn tại!" } );
    }

    await CampaignDefault.findByIdAndRemove( req.query._id );
    res.status( 200 ).json( jsonResponse( "success", null ) );
  },
  "duplicate": async ( req, res ) => {
    const findCampaignExample = await CampaignDefault.findOne( { "_id": req.query._campaignId } )
        .select( "-updated_at -__v" )
        .populate( "postCategory.morning postCategory.night mix.open mix.close" )
        .populate( { "path": "postCategory.morning", "populate": { "path": "postList", "select": "title content _id photos" } } )
        .populate( { "path": "postCategory.night", "populate": { "path": "postList", "select": "title content _id photos" } } )
        .populate( { "path": "mix.open", "populate": { "path": "postList", "select": "title content _id" } } )
        .populate( { "path": "mix.close", "populate": { "path": "postList", "select": "title content _id" } } )
        .lean(),
      userInfo = await Account.findOne( { "_id": req.uid } ),
      vpsContainServer = await Server.findOne( { "userAmount": userInfo._id } ).select( "info" ).lean();

    // Check catch when duplicate
    if ( !findCampaignExample ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chiến dịch không tồn tại!" } );
    }

    let data = {
        "campaignExample": findCampaignExample,
        "facebookId": req.body.facebookId,
        "finished_at": req.body.finished_at
      },
      resCampaignSync = await syncCampaignExample(
        `${vpsContainServer.info.domainServer}:${vpsContainServer.info.serverPort}/api/v1/campaigns/sync/duplicate`,
        data,
        req.headers.authorization
      );

    if ( resCampaignSync.data.status !== "success" ) {
      return res.status( 404 ).json( { "status": "error", "message": "Máy chủ bạn đang hoạt động có vấn đề! Vui lòng liên hệ với bộ phận CSKH." } );
    }

    res.status( 200 ).json( jsonResponse( "success", resCampaignSync.data ) );
  }
};
