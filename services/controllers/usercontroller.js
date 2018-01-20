'use strict';
var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;
var UserDataModel = require('../datamodels/userdatamodel');
var AuthenticationDataModel = require('../datamodels/AuthenticationDataModel').AuthenticationDataModel;

function UserController() {}

UserController.prototype.validation = function (userObj) {
    return new Promise(function (resolve, reject) {
        var that = this;
        UserDataModel.find(userObj).then(
            function (response) {
                console.log('==================================================================');
                console.log("User Model", response);
                // if(Array.isArray(response) && response.length !== 0){
                var token = AuthenticationDataModel.createSessionToken(response._id);
                var responseData = JSON.parse(JSON.stringify(response));
                responseData.token = token;
                if (CONSTANT.LOGGED_IN_USERS[responseData._id]) {
                    if (CONSTANT.LOGGED_IN_USERS[responseData._id].length <= 3) {
                        CONSTANT.LOGGED_IN_USERS[responseData._id].push(token);
                    } else {
                        CONSTANT.LOGGED_IN_USERS[responseData._id].shift();
                        CONSTANT.LOGGED_IN_USERS[responseData._id].push(token);
                    }
                } else {
                    CONSTANT.LOGGED_IN_USERS[responseData._id] = [];
                    CONSTANT.LOGGED_IN_USERS[responseData._id].push(token);
                }
                let res = prepareServerObject(true, 'User Validated Successfully', responseData);
                resolve(res);
                // }
            },
            function (err) {
                console.log("User Model Error", err);
                let error = prepareServerObject(false, 'User Not Found', err);
                reject(error);
            }
        )
    })
}

UserController.prototype.getallusers = function (userObj) {
    return new Promise(function (resolve, reject) {
        var that = this;
        UserDataModel.fetchAllExcept(userObj).then(
            function (response) {
                let res = prepareServerObject(true, 'User Validated Successfully', response);
                resolve(res);
            },
            function (err) {
                console.log("User Model Error", err);
                let error = prepareServerObject(false, 'User Not Found', err);
                reject(error);
            }
        )
    })
}

function prepareServerObject(response, message, data) {
    var returnObject = {
        response: {
            message: null,
            data: null
        }
    };
    response ? returnObject.success = 1 : returnObject.error = 1;
    message ? returnObject.response.message = 1 : returnObject.response.message = " ";
    data ? returnObject.response.data = data : returnObject.response.data = null;
    return returnObject;
}


UserController.prototype.deleteuser = function (userObj) {
    return new Promise(function (resolve, reject) {
        var that = this;
        UserDataModel.deleteUser(userObj).then(
            function (response) {
                let res = prepareServerObject(true, 'User deleted Successfully', response);
                resolve(res);
            },
            function (err) {
                console.log("User Model Error", err);
                let error = prepareServerObject(false, 'User Not Found', err);
                reject(error);
            }
        )
    })
}


UserController.prototype.logout = function (userObj) {
    return new Promise(function (resolve, reject) {
        var that = this;
        UserDataModel.logoutUser(userObj).then(
            function (response) {
                let res = prepareServerObject(true, 'User Logout Successfully', response);
                resolve(res);
            },
            function (err) {
                console.log("User Model Error", err);
                let error = prepareServerObject(false, 'User Not Found', err);
                reject(error);
            }
        )
    })
}



module.exports = new UserController();