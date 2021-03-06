/**
 * Created by Kenvi on 2016/4/2.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var CatetorySchema  = new Schema({
    name : String,
    flowers : [{type:ObjectId,ref:'Flower'}],
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
})

CatetorySchema.pre('save', function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    next();
})

CatetorySchema.statics = {
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
}

module.exports = CatetorySchema;