'use strict';
const CONSTANT = require('../config/constant').CONSTANT;
var UserController = require('../controllers/usercontroller');

function userRoutes(app){
     app.post(CONSTANT.ENDPOINT.LOGIN, function(req, res){
         console.log('req.body', req.body);
         UserController.validation(req.body).then(function(response){
             res.send(response);
         }, 
         function(err){
             res.send(err);
         });
     });

     app.post(CONSTANT.ENDPOINT.GET_ALL_USERS, function(req, res){
        console.log('req.body', req.body);
        UserController.getallusers(req.body).then(function(response){
            res.send(response);
        }, 
        function(err){
            res.send(err);
        });
    });

    app.post(CONSTANT.ENDPOINT.DELETE_USERS, function(req, res){
        console.log('req.body', req.body);
        UserController.deleteuser(req.body).then(function(response){
            res.send(response);
        }, 
        function(err){
            res.send(err);
        });
    });
}

module.exports = userRoutes;