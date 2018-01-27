'use strict';
var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;
var UserDataModel = require('../datamodels/userdatamodel');
var AuthenticationDataModel = require('../datamodels/AuthenticationDataModel').AuthenticationDataModel;
var UtilityObject = require('../utiles/utilty').Utility;
var nodemailer = require('nodemailer');

function UserController() {}

UserController.prototype.validation = function (userObj) {
    return new Promise(function (resolve, reject) {
        var that = this;

        UserDataModel.find(userObj).then(
            function (response) {
                console.log('==================================================================');
                console.log("User Model", response);
                // if(Array.isArray(response) && response.length !== 0){
                var token = AuthenticationDataModel.createSessionToken(response._id);
                var responseData = JSON.parse(JSON.stringify(response));
                responseData.token = token;
                if (CONSTANT.LOGGED_IN_USERS[responseData._id]) {
                    if (CONSTANT.LOGGED_IN_USERS[responseData._id].length <= 3) {
                        CONSTANT.LOGGED_IN_USERS[responseData._id].push(token);
                    } else {
                        CONSTANT.LOGGED_IN_USERS[responseData._id].shift();
                        CONSTANT.LOGGED_IN_USERS[responseData._id].push(token);
                    }
                } else {
                    CONSTANT.LOGGED_IN_USERS[responseData._id] = [];
                    CONSTANT.LOGGED_IN_USERS[responseData._id].push(token);
                }
                let res = UtilityObject.prepareServerObject(true, 'User Validated Successfully', responseData);
                resolve(res);
                // }
            },
            function (err) {
                console.log("User Model Error", err);
                UtilityObject.manageAccesstokenSession(headers);
                let error = UtilityObject.prepareServerObject(false, 'User Not Found', err);
                reject(error);
            }
        )
    })
}

UserController.prototype.getallusers = function (userObj, headers) {
    return new Promise(function (resolve, reject) {
        var that = this;
        try {
            if (UtilityObject.userSessionValidity(headers)) {
                UserDataModel.fetchAllExcept(userObj).then(
                    function (response) {
                        let res = UtilityObject.prepareServerObject(true, 'User Validated Successfully', response);
                        resolve(res);
                    },
                    function (err) {
                        console.log("User Model Error", err);
                        let error = UtilityObject.prepareServerObject(false, 'User Not Found', err);
                        reject(error);
                    }
                )
            } else {
                let res = UtilityObject.prepareServerObject(true, CONSTANT.LOG.SESSION_EXPIRE, CONSTANT.LOGOUT_OBJECT);
                resolve(res);

            }
        } catch (error) {
            UtilityObject.manageAccesstokenSession(headers);
            let err = UtilityObject.prepareServerObject(false, 'Exception Error', error);
            reject(err);
        }
    })
}

UserController.prototype.adduser = function (userObj, headers) {
    return new Promise(function (resolve, reject) {
        var that = this;
        try {
            if (UtilityObject.userSessionValidity(headers) && userObj) {
                UserDataModel.adduser(userObj).then(
                    function (response) {
                        let res = UtilityObject.prepareServerObject(true, 'User Added Successfully', response);
                        resolve(res);
                    },
                    function (err) {
                        console.log("User Model Error", err);
                        let error = UtilityObject.prepareServerObject(false, 'User Not Found', err);
                        reject(error);
                    }
                )
            } else {
                UtilityObject.manageAccesstokenSession(headers);
                let res = UtilityObject.prepareServerObject(true, CONSTANT.LOG.SESSION_EXPIRE,
                    CONSTANT.LOGOUT_OBJECT
                );
                reject(res);

            }
        } catch (error) {
            UtilityObject.manageAccesstokenSession(headers);
            let err = UtilityObject.prepareServerObject(false, 'Exception Error', error);
            reject(err);
        }
    })
}


UserController.prototype.updateuser = function (userObj, headers) {
    return new Promise(function (resolve, reject) {
        var that = this;
        try {
            if (UtilityObject.userSessionValidity(headers)) {
                UserDataModel.updateuser(userObj).then(
                    function (response) {
                        let res = UtilityObject.prepareServerObject(true, 'User Modified Successfully', response);
                        resolve(res);
                    },
                    function (err) {
                        console.log("User Model Error", err);
                        let error = UtilityObject.prepareServerObject(false, 'User Not Found', err);
                        reject(error);
                    }
                )
            } else {
                UtilityObject.manageAccesstokenSession(headers);
                let res = UtilityObject.prepareServerObject(false, 'Session Expire',
                    CONSTANT.LOGOUT_OBJECT
                );
                reject(res);

            }
        } catch (error) {
            UtilityObject.manageAccesstokenSession(headers);
            let err = UtilityObject.prepareServerObject(false, 'Exception Error', error);
            reject(err);
        }
    })
}

UserController.prototype.changepassword = function (userObj, headers) {
    return new Promise(function (resolve, reject) {
        var that = this;
        console.log(userObj, headers);
        try {
            if (UtilityObject.userSessionValidity(headers)) {
                UserDataModel.changepassword(userObj).then(
                    function (response) {
                        resolve(UtilityObject.prepareServerObject(true, 'Password Reset Successfully', response));
                    },
                    function (err) {
                        console.log("Error while resetting password: ", err);
                        rejectUtilityObject.prepareServerObject(false, 'Exception Error Reset', err);
                    }
                )
            } else {
                UtilityObject.manageAccesstokenSession(headers);
                reject(UtilityObject.prepareServerObject(false, 'Session Expire', CONSTANT.LOGOUT_OBJECT));

            }
        } catch (error) {
            UtilityObject.manageAccesstokenSession(headers);
            let err = UtilityObject.prepareServerObject(false, 'Exception Error', error);
            reject(err);
        }
    })
}

UserController.prototype.forgotpassword = function (userObj, headers) {
    return new Promise(function (resolve, reject) {
        var that = this;
        console.log(userObj, headers);
        try {
            // if (UtilityObject.userSessionValidity(headers)) {
            UserDataModel.forgotpassword(userObj).then(
                function (response) {
                    console.log('sendmial response: ', response);

                // var token = AuthenticationDataModel.createResetPasswordToken(userObj._id);
                var token = 'gggggggggggggggggggg';    
                let transporter = nodemailer.createTransport({
                        // host: 'smtp.ethereal.email',
                        // port: 587,
                        
                        service: 'gmail',
                        //  secure: false, // true for 465, false for other ports
                        auth: {
                            user: 'shilpa3181@gmail.com', // generated ethereal user
                            pass: '27032991' // generated ethereal password
                        }
                    });

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: 'shilpa3181@gmail.com', // sender address
                        to: userObj.email_id, // list of receivers
                        subject: 'Reset Password Link', // Subject line
                        text: 'Hello world?' + token, // plain text body
                        html: '<b>Hello world?</b>' + token // html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        console.log('eeeeeeeeeeeeeeeeeeee ', error);
                        console.log('iiiiiiiiiiiiiiiiiiiiiiii ', info);
                        if (error) {
                            console.log(error);    
                            reject(UtilityObject.prepareServerObject(false, 'Session Expire', CONSTANT.LOGOUT_OBJECT));

                        } else {
                            console.log('Sucess');
                            resolve(UtilityObject.prepareServerObject(true, 'Password Reset Successfully', response));
                        }
                        // Preview only available when sending through an Ethereal account
                        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                    });

                    // resolve(UtilityObject.prepareServerObject(true, 'Password Reset Successfully', response));
                },
                function (err) {
                    console.log("Error while resetting password: ", err);
                    resolve(UtilityObject.prepareServerObject(true, 'Password Reset Successfully', response));
                }
            )
            // } else {
            //     UtilityObject.manageAccesstokenSession(headers);
            //     reject(UtilityObject.prepareServerObject(false, 'Session Expire', CONSTANT.LOGOUT_OBJECT));

            // }
        } catch (error) {
            UtilityObject.manageAccesstokenSession(headers);
            let err = UtilityObject.prepareServerObject(false, 'Exception Error', error);
            reject(err);
        }
    })
}


UserController.prototype.deleteuser = function (userObj, headers) {
    return new Promise(function (resolve, reject) {
        var that = this;
        try {
            if (UtilityObject.userSessionValidity(headers)) {
                UserDataModel.deleteUser(userObj).then(
                    function (response) {
                        let res = UtilityObject.prepareServerObject(true, 'User Deleted Successfully', response);
                        resolve(res);
                    },
                    function (err) {
                        console.log("User Model Error", err);
                        let error = UtilityObject.prepareServerObject(false, 'User Not Found', err);
                        reject(error);
                    }
                )
            } else {
                UtilityObject.manageAccesstokenSession(headers);
                let res = UtilityObject.prepareServerObject(false, 'Session Expire',
                    CONSTANT.LOGOUT_OBJECT);
                reject(res);
            }
        } catch (error) {
            UtilityObject.manageAccesstokenSession(headers);
            let err = UtilityObject.prepareServerObject(false, 'Exception Error: ', error);
            reject(err);
        }
    })
}

UserController.prototype.logout = function (userObj, headers) {
    return new Promise(function (resolve, reject) {
        try {
            if (UtilityObject.userSessionValidity(headers)) {
                UtilityObject.manageAccesstokenSession(headers);
                let res = UtilityObject.prepareServerObject(true, 'User Logout Successfully',
                    CONSTANT.LOGOUT_OBJECT
                );
                resolve(res);
            } else {
                UtilityObject.manageAccesstokenSession(headers);
                let res = UtilityObject.prepareServerObject(false, 'Session Expire',
                    CONSTANT.LOGOUT_OBJECT
                );
                reject(res);
            }

        } catch (err) {
            UtilityObject.manageAccesstokenSession(headers);
            let error = UtilityObject.prepareServerObject(false, 'Exception Error', err);
            reject(err);
        }
    })
}

module.exports = new UserController();