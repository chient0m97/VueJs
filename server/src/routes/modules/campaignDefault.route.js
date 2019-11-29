/**
 * Create Campaign Default for project
 * author: hoc_anms
 * date: 21/06/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const CampaignDefaultRoute = require( "../../controllers/campaignDefault.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const collaborator = require( "../../helpers/middleware/collaborator.middleware" );

router
  .route( "/" )
  .get( auth, CampaignDefaultRoute.index )
  .post( auth, collaborator, CampaignDefaultRoute.create )
  .patch( auth, collaborator, CampaignDefaultRoute.update )
  .delete( auth, collaborator, CampaignDefaultRoute.delete );
router.route( "/duplicate" ).post( auth, CampaignDefaultRoute.duplicate );
module.exports = router;
