/**
 * Created by Kenvi on 2016/5/16.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BannerSchema  = new Schema({
    name : String,
    banner : String,
    url : String,
    meta : {
        createAt : {
            type : Date,
            default : Date.now()
        },
        updateAt : {
            type : Date,
            default : Date.now()
        }
    }
});

BannerSchema.pre('save', function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    next();
});

BannerSchema.statics = {
    fetch : function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById : function(id, cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
};

module.exports = BannerSchema;