/* eslint-disable no-unused-vars */
const request = require( "axios" );

module.exports = {
  "signUpSync": ( url, data ) => {
    return request( {
      "method": "post",
      "url": url,
      "data": data
    } );
  },
  "createNewPasswordSync": ( url, data, headers ) => {
    return request( {
      "method": "post",
      // eslint-disable-next-line no-nested-ternary
      "url": url,
      "data": data,
      "headers": headers
    } );
  },
  "activeAccountSync": ( url, data, headers ) => {
    return request( {
      "method": "patch",
      // eslint-disable-next-line no-nested-ternary
      "url": url,
      "data": data,
      "headers": {
        "Authorization": headers
      }
    } );
  },
  "changeStatusAccountSync": ( url, data, headers ) => {
    return request( {
      "method": "patch",
      "url": url,
      "data": data,
      "headers": {
        "Authorization": headers
      }
    } );
  },
  "updateUserSync": ( url, data, headers ) => {
    return request( {
      "method": "patch",
      "url": `${url}/api/v1/users/sync/user`,
      "data": data
    } );
  }
};
