var mongoose = require("mongoose");
var Promise = require("promise")
var userModel = require('../models/userModel');

class UserDataModel {
    constructor() {
        this.find();
    }
    find(userObj) {
        return new Promise(function (resolve, reject) {
            try {
                console.log('userObj****', userObj);
                userModel.find({
                    email_id: userObj.email_id,
                    password: userObj.password
                }, {
                        password: 0,
                    }, function (err, response) {
                        if (err) {
                            console.log("error" + err);
                            reject(err);
                        }
                        else {
                            console.log('test11222 ' + response);
                            if (response && response[0]) {
                                resolve(response[0]);
                            }
                            else {
                                reject(response);
                            }
                        }
                    });
            }
            catch (error) {
                reject(error);
            }
        });

    }


    fetchAllExcept(userObj) {
        return new Promise(function (resolve, reject) {
            try {
                console.log('userObj****', userObj);
                userModel.find({}, {
                    password: 0,
                }, function (err, response) {
                    if (err) {
                        console.log("error" + err);
                        reject(err);
                    }
                    else {
                        console.log('fetchalluser:  ' + response);
                        if (response && response[0]) {
                            resolve(response[0]);
                        }
                        else {
                            reject(response);
                        }
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    };
}

module.exports = new UserDataModel();