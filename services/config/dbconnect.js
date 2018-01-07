var mongoose = require("mongoose");

module.exports.DBConnect = function (dbURL) {
    mongoose.connect(dbURL);
    console.log(dbURL);
    require('../helper/seeder');
}
