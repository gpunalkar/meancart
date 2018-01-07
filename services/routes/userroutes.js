const CONSTANT = require('../config/constant').CONSTANT;
var UserController = require('../controllers/usercontroller');


function userRoutes(app){
     app.post(CONSTANT.ENDPOINT.LOGIN, function(req, res){
         UserController.validation(req.body).then(function(response){
             res.send(response);
         }, 
         function(err){
             res.send(err);
         });
     }) 
}

module.exports = userRoutes;