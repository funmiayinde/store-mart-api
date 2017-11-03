var shop = require("../models/ShopModel").shop;

exports.create = function (req, res, next) {
    if (req.body.title == null || req.body.title == "") {

        return res.status(400).json(vm(false, "title cannot be empty", null));

    } else if (req.body.description == null || req.body.description == "") {

        return res.status(400).json(vm(false, "description cannot be empty", null));

    } else if (req.body.rating == null || req.body.rating == "") {

        return res.status(400).json(vm(false, "rating cannot be empty", null));

    } else if (req.body.street_name == null || req.body.street_name == "") {

        return res.status(400).json(vm(false, "street_name cannot be empty", null));

    }else if (req.body.latitude == null || req.body.latitude == "") {

        return res.status(400).json(vm(false, "latitude cannot be empty", null));

    }else if (req.body.longitude == null || req.body.longitude == "") {

        return res.status(400).json(vm(false, "longitude cannot be empty", null));

    } else {
        shop.create(req.body, function (err, store_details) {
            if (err) {
                return res.status(500).json(false, "an error occur", err);
            } else {
                res.status(201).json(vm(true, "store successfully logged", store_details));
            }
        });
    }
};
exports.get_store_by_id = function (req, res, next) {
    if (req.params.id != null){
        shop.get({_id: req.params.id},function (err, store_details) {
            if(err){
                return res.status(500).json(vm(false, "an error occur", null));
            }
            res.status(200).json(vm(true, "store details", {
                title: store_details.title,
                description: store_details.description,
                rating: store_details.rating,
                lat: store_details.latitude,
                street_name: store_details.street_name,
                lng: store_details.longitude,
                created: store_details.created
            }));

        });
    }
};
exports.get_all_shop = function (req, res, next) {
    shop.getAll({},function (err, store_details) {
            if(err){
                return res.status(500).json(vm(false, "an error occur", null));
            }
            res.status(200).json(vm(true, "store details",store_details));

        });
};
function vm(status, message, data) {
    return {
        status: status,
        message: message,
        data: data
    };
}