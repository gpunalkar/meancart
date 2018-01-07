var app = require('express');
//var server = app.listen(8001);

var CONSTANT = require('../config/constant').CONSTANT;
var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/db');
var db = mongoose.connection;

var userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isnew: {
        type: Boolean,
        required: true
    },
    isadmin: {
        type: Boolean,
        required: true
    },
    isactive: {
        type: Boolean
    },
    timestamp: {
        type: String,
        default: Date.now
    }
});

console.log(CONSTANT);
module.exports = mongoose.model(CONSTANT.SCHMEA.USERS, userSchema);
