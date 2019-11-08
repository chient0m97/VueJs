/**
 * Create route help category for project
 * author: hocpv
 * editor: SKy Albert
 * date: 15/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const HelpCategoryController = require( "../../../controllers/help/category.controller" );

const auth = require( "../../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../../helpers/middleware/permission.middleware" );

// Handle upload file image
const multer = require( "multer" ),
  fs = require( "fs-extra" ),
  storage = multer.diskStorage( {
    "destination": ( req, file, cb ) => {
      const path = "./uploads/help/category";

      fs.mkdirsSync( path );
      cb( null, path );
    },
    "filename": ( req, file, cb ) => {
      cb(
        null,
        `${new Date().toISOString().replace( /:|\./g, "" )}-${file.originalname}`
      );
    }
  } ),
  upload = multer( {
    "storage": storage,
    "limits": {
      "fileSize": 1024 * 1024 * 25
    },
    "fileFilter": function( req, file, cb ) {
      if ( !file.originalname.match( /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/ ) ) {
        return cb( new Error( "Ảnh không đúng dạng, vui lòng thử lại!" ) );
      }
      cb( null, true );
    }
  } );

router
  .route( "/" )
  .get( HelpCategoryController.index )
  .patch( auth, permission, HelpCategoryController.update )
  .post( auth, permission, HelpCategoryController.create )
  .delete( auth, permission, HelpCategoryController.delete );

router.route( "/upload" )
  .post( auth, permission, upload.single( "file" ), HelpCategoryController.upload );

module.exports = router;
