/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  AgencySchema = new Schema( {
    "customer": {
      "total": { // Auto generate
        "type": Number,
        "default": 0
      },
      "listOfUser": [ // Create method
        {
          "user": {
            "type": Schema.Types.ObjectId,
            "ref": "Account"
          },
          "typeUser": Number // 0 - Agency add, 1 - Link affiliate
        }
      ]
    },
    "expire": {
      "start": Date,
      "end": Date,
      "usedTime": { // Auto generate
        "type": Number,
        "default": 0
      },
      "leftTime": { // Auto generate
        "type": Number,
        "default": 0
      }
    },
    "status": {
      "type": Boolean,
      "default": true
    },
    "_account": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "_creator": { // Auto generate
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "_editor": { // Auto generate
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "_package": {
      "type": Schema.Types.ObjectId,
      "ref": "Package"
    },
    "linkAffiliate": String,
    "subDomain": {
      "type": String,
      "default": "None"
    },
    "createdAt": { // Auto generate
      "type": Date,
      "default": Date.now()
    },
    "updatedAt": Date // Auto generate
  } );

AgencySchema.pre( "save", function( next ) {
  this.updatedAt = Date.now();
  next();
} );

const Agency = mongoose.model( "Agency", AgencySchema );

module.exports = Agency;
