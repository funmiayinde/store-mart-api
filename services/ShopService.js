var sign_up = require("../models/SignUpModel").sign_up;


exports.findUserByUsername = function (username, next) {
    console.log("user details: ", username);
    sign_up.findOne({username: username}, function (err, user_details) {
        next(err, user_details);
    });
};

exports.addStore = function (data, next) {
    var new_shop = new sign_up({
        title: data.title,
        description: data.description,
        rating: data.rating,
        status: data.status
    });
    new_shop.save(function (err, shop_details) {
        if (err) {
            return next(err,null);
        }
        return next(null, shop_details);
    });
};