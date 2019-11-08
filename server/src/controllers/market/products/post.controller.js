const MarketPost = require( "../../../models/market/products/post.model" );

module.exports = {
  "index": async ( req, res ) => {
    let dataResponse = null;

    // Check if query get one item from _id
    if ( req.query._id ) {
      dataResponse = await MarketPost.findOne( { "_id": req.query._id } ).lean();
      return res.status( 200 ).json( { "status": "success", "data": dataResponse } );
    }

    // Handle get items by pagination from database
    if ( req.query._size && req.query._page ) {
      const pageNo = parseInt( req.query._page ),
        size = parseInt( req.query._size ),
        query = {},
        totalPosts = await MarketPost.countDocuments( { } );

      // Check catch
      if ( pageNo < 0 || pageNo === 0 ) {
        return res.status( 403 ).json( { "status": "error", "message": "Dữ liệu số trang không đúng, phải bắt đầu từ 1." } );
      }

      // Handle input data before connect to mongodb
      query.skip = size * ( pageNo - 1 );
      query.limit = size;
      query.sort = { "$natural": -1 };

      // Handle with mongodb
      dataResponse = await MarketPost.find( {}, "-__v", query ).lean();

      return res.status( 200 ).json( { "status": "success", "data": { "results": dataResponse, "page": Math.ceil( totalPosts / size ), "size": size } } );
    }

    res.status( 304 ).json( { "status": "fail", "data": "API này không được cung cấp!" } );
  },
  "create": async ( req, res ) => {
    let { body } = req, newPost;

    // Check catch
    if ( body.title === "" || body.title === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "title": "Tiêu đề bài viết mẫu không được bỏ trống!" } );
    } else if ( body.content === "" || body.content === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "content": "Nội dung bài viết mẫu này không được bỏ trống!" } );
    }
    // set value default post
    body.content = body.content.replace( /(<br \/>)|(<br>)/gm, "\n" ).replace( /(<\/p>)|(<\/div>)/gm, "\n" ).replace( /(<([^>]+)>)/gm, "" );
    body._creator = req.uid;

    // set new object mongo
    newPost = await new MarketPost( body );

    await newPost.save();

    res.status( 201 ).json( { "status": "success", "data": newPost } );
  },
  "update": async ( req, res ) => {
    const { body, query } = req,
      postInfo = await MarketPost.findOne( { "_id": query._id } );

    // check catch
    if ( body.title === "" || body.title === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "title": "Tiêu đề bài viết mẫu không được bỏ trống!" } );
    } else if ( body.content === "" || body.content === undefined ) {
      return res.status( 403 ).json( { "status": "fail", "content": "Nội dung bài viết mẫu này không được bỏ trống!" } );
    } else if ( !postInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sản phẩm này không tồn tại!" } );
    }

    body.content = body.content.replace( /(<br \/>)|(<br>)/gm, "\n" ).replace( /(<\/p>)|(<\/div>)/gm, "\n" ).replace( /(<([^>]+)>)/gm, "" );

    res.status( 200 ).json( { "status": "success", "data": ( await MarketPost.findByIdAndUpdate( query._id, { "$set": body }, { "new": true } ) ) } );
  },
  "delete": async ( req, res ) => {
    const { query } = req,
      postInfo = await MarketPost.findOne( { "_id": query._id } );

    // check catch
    if ( !postInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Sản phẩm này không tồn tại!" } );
    }

    await postInfo.remove();

    res.status( 200 ).json( { "status": "success", "data": null } );
  },
  "upload": async ( req, res ) => {
    if ( !req.files || req.files.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "photos": "Không có ảnh upload, vui lòng kiểm tra lại!" } );
    }
    const photosList = req.files.map( ( file ) => {
      if ( file.fieldname === "photos" && file.mimetype.includes( "image" ) ) {
        return `${process.env.APP_URL}:${process.env.PORT_BASE}/${file.path.replace( /\\/gi, "/" )}`;
      }
    } );

    return res.status( 200 ).json( { "status": "success", "data": photosList } );
  },
  "search": async ( req, res ) => {
    if ( req.query.keyword === undefined ) {
      return res
        .status( 404 )
        .json( {
          "status": "fail",
          "keyword": "Vui lòng cung cấp từ khóa để tìm kiếm!"
        } );
    }

    let page = null, dataResponse = null, data = ( await MarketPost.find( { "$text": { "$search": `\"${req.query.keyword}\"`, "$language": "none" } } ).lean() );

    if ( req.query._size && req.query._page ) {
      dataResponse = data.slice(
        ( Number( req.query._page ) - 1 ) * Number( req.query._size ),
        Number( req.query._size ) * Number( req.query._page )
      );
    } else if ( req.query._size ) {
      dataResponse = data.slice( 0, Number( req.query._size ) );
    }

    if ( req.query._size ) {
      if ( data.length % req.query._size === 0 ) {
        page = Math.floor( data.length / req.query._size );
      } else {
        page = Math.floor( data.length / req.query._size ) + 1;
      }
    }

    res.status( 200 ).json( { "status": "success", "data": { "results": dataResponse, "page": page, "total": data.length } } );
  },
  "download": async ( req, res ) => {
    return res
      .status( 404 )
      .json( {
        "status": "success",
        "data": "meomeo"
      } );
  }
};
