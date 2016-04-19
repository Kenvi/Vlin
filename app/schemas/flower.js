const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var FlowerSchema  = new Schema({
	location : String,
	title : String,
	scenarios : String,
	culture : String,
	conservation : String,
	price : String,
	poster : String,
	pv : {
		type : Number,
		default : 0
	},
	catetory : {
		type : ObjectId,
		ref : 'Catetory',
		unique:true
	},
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

FlowerSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

	next();
})

FlowerSchema.statics = {
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

module.exports = FlowerSchema;