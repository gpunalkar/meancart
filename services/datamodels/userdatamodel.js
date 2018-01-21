'use strict';
var mongoose = require("mongoose");
var Promise = require("promise")
var userModel = require('../models/userModel');

function UserDataModel() {

}

UserDataModel.prototype.find = function(userObj) {
    return new Promise(function (resolve, reject) {
        try {
            console.log('userObj****', userObj);
            userModel.find({
                email_id: userObj.email_id,
                password: userObj.password,
                isadmin: userObj.isadmin
            }, {
                password: 0,
            }, function (err, response) {
                if (err) {
                    console.log("error" + err);
                    reject(err);
                } else {
                    console.log('test11222 ' + response);
                    if (response && response[0]) {
                        resolve(response[0]);
                    } else {
                        reject(response);
                    }
                }
            });
        } catch (error) {
            reject(error);
        }
    });

}


UserDataModel.prototype.fetchAllExcept = function(userObj) {
    return new Promise(function (resolve, reject) {
        try {
            console.log('userObj****', userObj);
            var matchCriteria = {
                email_id: {
                    $ne: userObj.email_id
                }
            }
            // if(userObj.isadmin === false){
            //     matchCriteria.isadmin = {
            //         $ne: userObj.isadmin === true
            //     }
            // }
            userModel.find(matchCriteria, {
                password: 0,
            }, function (err, response) {
                if (err) {
                    console.log("error" + err);
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

UserDataModel.prototype.adduser = function(userObj) {
    return new Promise(function (resolve, reject) {
        let user = userObj;
        user.password = '#test123';
        try {
            userModel.create(user, function (err, response) {
                if (err) {
                    console.log("error" + err);
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

UserDataModel.prototype.updateuser = function(userObj) {
    return new Promise(function (resolve, reject) {
        try {
            console.log('userObj****', userObj);
            // var matchCriteria = {
            //     email_id: {
            //         $ne: userObj.email_id
            //     }
            // }
            userModel.update({'_id': userObj._id}, userObj, function (err, response) {
                if (err) {
                    console.log("error" + err);
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

UserDataModel.prototype.deleteUser = function(userObj) {
    return new Promise(function (resolve, reject) {
        try {
            console.log('userObj****', userObj);
            userModel.remove(userObj, function (err, response) {
                if (err) {
                    console.log("error" + err);
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

UserDataModel.prototype.updateuser = function(userObj) {
    return new Promise(function (resolve, reject) {
        try {
            console.log('userObj****', userObj);
            // var matchCriteria = {
            //     email_id: {
            //         $ne: userObj.email_id
            //     }
            // }
            userModel.update({'_id': userObj._id}, userObj, function (err, response) {
                if (err) {
                    console.log("error" + err);
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};
// }

module.exports = new UserDataModel();