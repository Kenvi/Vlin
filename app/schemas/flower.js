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
	poster : [{type:String}],
	pv : {
		type : Number,
		default : 0
	},
	catetory : {
		type : ObjectId,
		ref : 'Catetory'
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

FlowerSchema.pre('save', function(next){//保存前先判断数据是否新建
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();//如果是新建则录入时间等于更新时间
	}else{
		this.meta.updateAt = Date.now();
	}

	next();
})

FlowerSchema.statics = {
	fetch : function(cb){//取出当前数据库所有数据
		return this
		.find({})
		.sort('meta.updateAt')//按更新时间排序，然后回调
		.exec(cb)
	},
	findById : function(id, cb){
		return this
		.findOne({_id:id})
		.exec(cb)
	}
}

module.exports = FlowerSchema;