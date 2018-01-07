var Promise = require('promise');
var UserDataModel = require('../datamodels/userdatamodel');

function UserController() {
    // this.validation();
}

UserController.prototype.validation = function (userObj) {
    return new Promise(function (resolve, reject) {

        // var userObj = {
        //     // "email_id": "john.node@mailinator.com",
        //     // "password": "925f806a1bccdbd773c0897dbce5ca3611306f51c30b5551269edac678bba6c5",
        //     // "isactive": true,
        //     "email_id": "peter.node@mailinator.com",
        //     "password": "925f806a1bccdbd773c0897dbce5ca3611306f51c30b5551269edac678bba6c5",
        //     "isactive": true
        // }

        UserDataModel.find(userObj).then(
            function (response) {

                console.log('==================================================================');
                console.log("User Model", response);
            },
            function (err) {
                console.log("User Model Error", err);
            }
        )
    })
}

module.exports = new UserController();