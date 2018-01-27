'use strict';
const CONSTANT = require('../config/constant').CONSTANT;
var UserController = require('../controllers/usercontroller');

function userRoutes(app){

     app.post(CONSTANT.ENDPOINT.LOGIN, function(req, res){
         console.log('req.body', req.body);
         UserController.validation(req.body, req.headers).then(function(response){
             res.send(response);
         }, 
         function(err){
             res.send(err);
         });
     });

     app.post(CONSTANT.ENDPOINT.ADD_USERS, function(req, res){
        console.log('req.body', req.body, req.headers);
        UserController.adduser(req.body, req.headers).then(function(response){
            res.send(response);
        }, 
        function(err){
            res.send(err);
        });
    }); 
    
    app.post(CONSTANT.ENDPOINT.UPDATE_USERS, function(req, res){
        console.log('req.body', req.body);
        UserController.updateuser(req.body, req.headers).then(function(response){
            res.send(response);
        }, 
        function(err){
            res.send(err);
        });
    });

    app.post(CONSTANT.ENDPOINT.CHANGE_PASSWORD, function(req, res){
        console.log('req.body', req.body);
        UserController.changepassword(req.body, req.headers).then(function(response){
            res.send(response);
        }, 
        function(err){
            res.send(err);
        });
    });

    app.post(CONSTANT.ENDPOINT.RESET_PASSWORD, function(req, res){
        console.log('req.body', req.body);
        UserController.forgotpassword(req.body, req.headers).then(function(response){
            res.send(response);
        }, 
        function(err){
            res.send(err);
        });
    });

    app.post(CONSTANT.ENDPOINT.DELETE_USERS, function(req, res){
        console.log('req.body', req.body);
        UserController.deleteuser(req.body, req.headers).then(function(response){
            res.send(response);
        }, 
        function(err){
            res.send(err);
        });
    });

    app.post(CONSTANT.ENDPOINT.GET_ALL_USERS, function(req, res){
        console.log('req.body', req.body);
        UserController.getallusers(req.body, req.headers).then(function(response){
            res.send(response);
        }, 
        function(err){
            res.send(err);
        });
    });

    app.get(CONSTANT.ENDPOINT.LOGOUT, function(req, res){
        console.log('req.body', req.body);
        UserController.logout(req.body, req.headers).then(function(response){
            res.send(response);
        }, 
        function(err){
            res.send(err);
        });
    });
}

module.exports = userRoutes;