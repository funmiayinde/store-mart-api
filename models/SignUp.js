'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var sign_up_schema = new Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String}
}, {collection: "sign_up"});


sign_up_schema.statics = {

    /**
     * find one user
     * @param query: get the id of the user
     * @param callback: callback of this form
     * */
    get: function(query, callback){
        this.findOne(query,callback);
    },

    /**
     * get all users
     * @param query: get all users
     * @param callback: callback of this form
     * */
    getAll: function (query, callback) {
        this.find(query,callback);
    },


    /**
     * update user info
     * @param id : existing user id
     * @param update_data: query: get all users
     * @param callback: callback of this form
     * */
    updateById: function (id, update_data, callback) {
        this.update(id,{$set:update_data},callback);
    },
    
    remove: function (remove_data, callback) {
        this.remove(remove_data,callback);
    },

    create: function (data, callback) {
        var sign_up = new this(data);
        sign_up.save(callback);
    }


};

var sign_up_model = mongoose.model("sign_up",sign_up_schema);
module.exports = {sign_up: sign_up_model};