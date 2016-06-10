const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
	name:{
		type:String,
		unique:true
	},
	password:String,
	role:{
		//0:normal user;1:verified user;2:porfessonal user;>10:admin;>50:super admin;
		type:Number,
		default:0
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
});

UserSchema.pre('save', function(next){
	var user = this;

	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		if(err){
			return next(err);
		}
		bcrypt.hash(user.password,salt,null, function(err,hash){
			if(err){
				return next(err);
			}
			user.password = hash;
			next();
		})
	});

});

UserSchema.methods = {
	comparePassword:function(_password , cb){
		bcrypt.compare(_password, this.password, function(err,isMatch){
			if(err){
				console.log(err  +  this.password);
				// return cb(err);
			}
			cb(null,isMatch);
		})
	}
};

UserSchema.statics = {
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

module.exports = UserSchema;