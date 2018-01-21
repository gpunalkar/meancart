'use strict';
var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;
var UserDataModel = require('../datamodels/userdatamodel');
var AuthenticationDataModel = require('../datamodels/AuthenticationDataModel').AuthenticationDataModel;
var UtilityObject = require('../utiles/utilty').Utility;


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
                let res = UtilityObject.prepareServerObject(true, 'User Validated Successfully', responseData);
                resolve(res);
                // }
            },
            function (err) {
                console.log("User Model Error", err);
                let error = UtilityObject.prepareServerObject(false, 'User Not Found', err);
                reject(error);
            }
        )
    })
}

UserController.prototype.getallusers = function (userObj, headers) {
    return new Promise(function (resolve, reject) {
        var that = this;
        try {
            if (UtilityObject.userSessionValidity(headers)) {
                UserDataModel.fetchAllExcept(userObj).then(
                    function (response) {
                        let res = UtilityObject.prepareServerObject(true, 'User Validated Successfully', response);
                        resolve(res);
                    },
                    function (err) {
                        console.log("User Model Error", err);
                        let error = UtilityObject.prepareServerObject(false, 'User Not Found', err);
                        reject(error);
                    }
                )
            } else {
                let res = UtilityObject.prepareServerObject(true, 'User Logout Successfully', {
                    logout: 1
                });
                resolve(res);

            }
        } catch (error) {
            let err = UtilityObject.prepareServerObject(false, 'logout failed', error);
            reject(err);
        }
    })
}

UserController.prototype.adduser = function (userObj, headers) {
    return new Promise(function (resolve, reject) {
        var that = this;
        try {
            if (UtilityObject.userSessionValidity(headers)) {
                UserDataModel.adduser(userObj).then(
                    function (response) {
                        let res = UtilityObject.prepareServerObject(true, 'User Added Successfully', response);
                        resolve(res);
                    },
                    function (err) {
                        console.log("User Model Error", err);
                        let error = UtilityObject.prepareServerObject(false, 'User Not Found', err);
                        reject(error);
                    }
                )
            } else {
                let res = UtilityObject.prepareServerObject(true, 'Session Expire', {
                    logout: 1
                });
                reject(res);

            }
        } catch (error) {
            let err = UtilityObject.prepareServerObject(false, 'Exception Error', error);
            reject(err);
        }
    })
}


UserController.prototype.updateuser = function (userObj, headers) {
    return new Promise(function (resolve, reject) {
        var that = this;
        try {
            if (UtilityObject.userSessionValidity(headers)) {
                UserDataModel.updateuser(userObj).then(
                    function (response) {
                        let res = UtilityObject.prepareServerObject(true, 'User Modified Successfully', response);
                        resolve(res);
                    },
                    function (err) {
                        console.log("User Model Error", err);
                        let error = UtilityObject.prepareServerObject(false, 'User Not Found', err);
                        reject(error);
                    }
                )
            } else {
                let res = UtilityObject.prepareServerObject(true, 'Session Expire', {
                    logout: 1
                });
                reject(res);

            }
        } catch (error) {
            let err = UtilityObject.prepareServerObject(false, 'Exception Error', error);
            reject(err);
        }
    })
}

UserController.prototype.deleteuser = function (userObj) {
    return new Promise(function (resolve, reject) {
        var that = this;
        try {
            if (UtilityObject.userSessionValidity(headers)) {
                UserDataModel.deleteUser(userObj).then(
                    function (response) {
                        let res = UtilityObject.prepareServerObject(true, 'User Deleted Successfully', response);
                        resolve(res);
                    },
                    function (err) {
                        console.log("User Model Error", err);
                        let error = UtilityObject.prepareServerObject(false, 'User Not Found', err);
                        reject(error);
                    }
                )
            } else {
                let res = UtilityObject.prepareServerObject(true, 'Session Expire', {
                    logout: 1
                });
                resolve(res);
            }
        } catch (error) {
            let err = UtilityObject.prepareServerObject(false, 'Exception Error: ', error);
            reject(err);
        }
    })
}

UserController.prototype.logout = function (userObj, headers) {
    return new Promise(function (resolve, reject) {
        try {
            if (UtilityObject.userSessionValidity(headers)) {
                let res = UtilityObject.prepareServerObject(true, 'User Logout Successfully', {
                    logout: 1
                });
                resolve(res);
            } else {
                let res = UtilityObject.prepareServerObject(true, 'User Logout Rejected', {
                    logout: 1
                });
                reject(res);
            }
            
        } catch (err) {
            let error = UtilityObject.prepareServerObject(false, 'Session Expire', err);
            reject(err);
        }
    })
}

module.exports = new UserController();