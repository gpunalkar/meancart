'use strict';
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var ENVIORNMENT = require('./services/config/enviornment').ENVIORNMENT;
var dbConection = require('./services/config/dbconnect').DBConnect;

var env = process.env.NODE_ENV || "DEVELOPMENT";
//console.log(ENVIORNMENT[env]);

var dbURL = ENVIORNMENT[env].DB_URL;
dbConection(dbURL);
//require('./services/controllers/usercontroller');


app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, userid, accessToken, locale");
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    next();
  });

  require('./services/routes/userroutes')(app);


//   app.get('/', function(req, res, next) {
//     // Handle the get for this route
//   });
  
//   app.post('/', function(req, res, next) {
//    // Handle the post for this route
//   });


app.listen(port, function () {
    console.log('Starting Server 8000')
});