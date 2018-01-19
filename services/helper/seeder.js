var mongoose = require("mongoose");
const CONSTANT = require('../config/constant');
var userModel = require('../models/userModel');

function Seeder() {
    this.users = [{
            "first_name": "John",
            "last_name": "Snow",
            "email_id": "john.node@mailinator.com",
            // "password": "925f806a1bccdbd773c0897dbce5ca3611306f51c30b5551269edac678bba6c5",
            "password": "#test123",
            "isactive": true,
            "isnew": false,
            "isadmin": 1
        },
        {
            "first_name": "Peter",
            "last_name": "Lee",
            "email_id": "peter.node@mailinator.com",
            // "password": "925f806a1bccdbd773c0897dbce5ca3611306f51c30b5551269edac678bba6c5",
            "password": "#test123",
            
            "isactive": true,
            "isnew": false,
            "isadmin": 0
        },
    ];

    this.checkUser();
}

Seeder.prototype.checkUser = function () {
    let that = this;
    userModel.count({}, function (err, count) {
        if (!count) {
            that.writeToDB();
        } else {
            console.log(err);
        }
    });
}

Seeder.prototype.writeToDB = function () {
    this.users.forEach(function (usersObj) {
        var userModelObj = new userModel(usersObj);
        userModelObj.save(function (err, newUser) {
            console.log("user inserted");
        });
    });
}

module.exports = new Seeder();