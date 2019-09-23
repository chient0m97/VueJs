/**
 * Create route Photo Library Category for project
 * author: sky albert
 * date: 23/09/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();

const PhotoLibraryCategoryController = require( "../../controllers/photolibrarycategory.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( auth, permission, PhotoLibraryCategoryController.index )
  .post( auth, permission, PhotoLibraryCategoryController.create )
  .patch( auth, permission, PhotoLibraryCategoryController.update )
  .delete( auth, permission, PhotoLibraryCategoryController.delete );

module.exports = router;
