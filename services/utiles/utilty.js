const CONSTANT = require('../config/constant').CONSTANT;
const AuthenticationDataModelObject = require('../datamodels/AuthenticationDataModel').AuthenticationDataModel;

module.exports.Utility = (function() {
    
    'use strict';
    /**
     * @namespace UtilityModule
     * @class Utility
     * @constructor
     */
    function Utility() {}

    /**
     * Get Server Response.
     * @method prepareServerObject
     * @param success get HTTP response
     * @param error get response error
     * @return serverResponse
     */
    Utility.prototype.prepareServerObject = function(response, message, data) {
        let returnObject = {
            response: {
                message: null,
                data: null
            }
        };
        response ? returnObject.success = 1 : returnObject.error = 1;
        message ? returnObject.response.message = message : returnObject.response.message = '';
        data ? returnObject.response.data = data : returnObject.response = null;
        console.log("Server response returnObject");
        console.log(returnObject);
        return returnObject;
    };

    Utility.prototype.userSessionValidity = function(headers) {
        return (headers.accesstoken && AuthenticationDataModelObject.verifySessionToken(headers.accesstoken) && headers.userid && CONSTANT.LOGGED_IN_USERS[headers.userid] && CONSTANT.LOGGED_IN_USERS[headers.userid].indexOf(headers.accesstoken) > -1);
    }
    
    return new Utility();

})();