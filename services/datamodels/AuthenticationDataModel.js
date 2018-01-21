var jwt = require('jsonwebtoken');
/**
 * @module ArmacellServiceModule
 * @class AuthenticationDataModel
 */
module.exports.AuthenticationDataModel = (function () {
    'use strict';
    /**
     * AuthenticationDataModel is a controller that does user authentication.
     * @namespace ArmacellServiceModule
     * @class AuthenticationDataModel
     * @constructor
     */
    function AuthenticationDataModel() {
        this.secret = 'LA9prjchRrgZZgAcRztQr2ZVnLYL7QeG3vT6V2U5FfSuyi8RXY4zXQ7urXif';
    }

    /**
     * This method is used to create session token.
     * @method createSessionToken
     * @param {object} userObject user information
     * @return {string} result access token
     */
    AuthenticationDataModel.prototype.createSessionToken = function (userObject) {
        return jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (2 * 60 * 60),
                data: userObject
            },
            this.secret);
    };

    /**
     * This method is used to verifies whether given access token is still valid.
     * @method verifySessionToken
     * @param {string} token access token
     * @return {boolean} decoded status
     */
    AuthenticationDataModel.prototype.verifySessionToken = function (token) {

        var decoded = false;
        try {
            jwt.verify(token, this.secret);
            decoded = true;
        } catch (e) {
            decoded = false;
        }
        return decoded;
    };

    /**
     * This method is used to createResetPasswordToken.
     * @method createResetPasswordToken
     * @param {object} userObject user information
     * @return {string} result reset password token
     */
    AuthenticationDataModel.prototype.createResetPasswordToken = function (userObject) {

        return jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (15 * 60),
                data: userObject
            },
            this.secret);
    };

    /**
     * This method is used to verify the provided token for resetting the password.
     * @method verifyResetPasswordToken
     * @param {string} token access token
     * @return {boolean} decoded status
     */
    AuthenticationDataModel.prototype.verifyResetPasswordToken = function (token) {
        var decoded = false;
        try {
            jwt.verify(token, this.secret);
            decoded = true;
        } catch (e) {
            decoded = false;
        }
        return decoded;
    };

    return new AuthenticationDataModel();

})();