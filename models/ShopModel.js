'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var shop_schema = new Schema({
    title: {type: String},
    description: {type: String},
    rating: {type: String},
    country_name: {type: String},
    street_name: {type: String},
    latitude: {type: String},
    longitude: {type: String},
    created: {type: String,default: Date.now}
}, {collection: "sign_up"});


shop_schema.statics = {

    /**
     * find one shop
     * @param query: get the id of the shop
     * @param callback: callback of this form
     * */
    get: function(query, callback){
        this.findOne(query,callback);
    },

    /**
     * get all shops
     * @param query: get all shops
     * @param callback: callback of this form
     * */
    getAll: function (query, callback) {
        this.find(query,callback);
    },


    /**
     * update shop info
     * @param id : existing shop id
     * @param update_data: query: get all shops
     * @param callback: callback of this form
     * */
    updateById: function (id, update_data, callback) {
        this.update(id,{$set:update_data},callback);
    },

    remove: function (remove_data, callback) {
        this.remove(remove_data,callback);
    },

    create: function (data, callback) {
        var shop = new this(data);
        shop.save(callback);
    }


};

var shop_model = mongoose.model("shop_model",shop_schema);
module.exports = {sign_up: shop_model};