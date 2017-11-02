var sign_up = require("../models/SignUp").sign_up;
var bcrypt = require("bcrypt-nodejs");

exports.create = function (req, res, next) {
    if (req.body.email == null || req.body.email == "") {

        return res.status(400).json(vm(false, "email cannot be empty", null));

    } else if (req.body.username == null || req.body.email == "") {

        return res.status(400).json(vm(false, "username cannot be empty", null));

    } else if (req.body.password == null || req.body.password == "") {

        return res.status(400).json(vm(false, "password cannot be empty", null));

    } else if (req.body.repeat_password == null || req.body.repeat_password == "") {

        return res.status(400).json(vm(false, "repeat password cannot be empty", null));

    } else if (req.body.repeat_password != req.body.password) {

        return res.status(400).json(vm(false, "password does not match", null));

    } else {

        sign_up.get({email: req.body.email}, function (err, user_details) {
            console.log("user details :", user_details);
            if (user_details != null) {
                return res.status(400).json(false, "email already exist", null);
            }

            bcrypt.hash(req.body.password, null, null, function (err, hash) {
                req.body.password = hash;
                sign_up.create(req.body, function (err, user_details) {
                    if (err) {
                        return res.status(500).json(false, "an error occur", err);
                    } else {
                        res.status(200).json(vm(true, "user successfully logged", {
                            username: user_details.username,
                            email: user_details.email
                        }));
                    }
                });
            });
        });

    }
};
exports.do_login = function (req, res, next) {
    if (req.body.username == null || req.body.email == "") {

        return res.status(400).json(vm(false, "username cannot be empty", null));

    } else if (req.body.password == null || req.body.password == "") {

        return res.status(400).json(vm(false, "password cannot be empty", null));

    } else {
        sign_up.get({username: req.body.username}, function (err, user_details) {

            if (err) {
                return res.status(400).json(vm(false, "able to find username", null));
            }

            bcrypt.compare(req.body.password, user_details.password, function (err, same) {
                if (err) {
                    return res.status(500).json(vm(false, "an error occur", null));

                } else if (!same) {
                    return res.json(vm(false, "incorrect password", null));

                } else {
                    return res.status(200).json(vm(true, "user authenticated", {
                        username: user_details.username,
                        email: user_details.email
                    }));
                }
            })
        });
    }
};
exports.get_user_info_by_email = function (req, res, next) {
    if (req.params.email != null){
        sign_up.get({email: req.params.email},function (err, user_details) {
           if(err){
               return res.status(500).json(vm(false, "an error occur", null));
           }
        });
    }
};
function vm(status, message, data) {
    return {
        status: status,
        message: message,
        data: data
    };
}