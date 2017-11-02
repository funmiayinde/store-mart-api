var sign_up = require("../models/SignUpModel").sign_up;
var bcrypt = require('bcrypt-nodejs');

exports.findUserByUsername = function (username, next) {
    console.log("user details: ", username);
    sign_up.findOne({username: username}, function (err, user_details) {
        next(err, user_details);
    });
};

exports.addUser = function (data, next) {
    bcrypt.hash(data.password, null, null, function (err, hash) {
        if (err) {
            return next(err);
        }
        var new_user = new sign_up({
            username: data.username,
            email : data.email,
            password: hash
        });
        new_user.save(function (err,user_details) {
            if (err) {
                return next(err);
            }
            return next(null,user_details);
        });
    })
};