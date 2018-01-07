var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8001;
var ENVIORNMENT = require('./services/config/enviornment').ENVIORNMENT;
var dbConection = require('./services/config/dbconnect').DBConnect;

var env = process.env.NODE_ENV || "DEVELOPMENT";
//console.log(ENVIORNMENT[env]);

var dbURL = ENVIORNMENT[env].DB_URL;
dbConection(dbURL);
//require('./services/controllers/usercontroller');
require('./services/routes/userroutes')(app);
app.listen(port, function () {
    console.log('Starting Server 8001')
});