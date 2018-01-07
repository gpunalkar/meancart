var mongoose = require("mongoose");
var Promise = require("promise")
var userModel = require('../models/userModel');

function UserDataModel() {
    this.find();
}

UserDataModel.prototype.find = function (userObj) {
    return new Promise(function (resolve, reject) {
        userModel.find({
            email_id: userObj.email_id,
            password: userObj.password,
            isactive: userObj.isactive
        }, {
            password: false
        }, function (err, response) {
            if (err) {
                console.log(err);
                reject(err);
            }
            console.log(response);
            resolve(response);
        });
    });
}

module.exports = new UserDataModel();