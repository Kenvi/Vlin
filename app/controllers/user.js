const User = require('../models/user');


//signup
exports.showSignup = function(req,res){
	res.render('signup', {
		title:'广州微林园林绿化工程有限公司-注册'
	})
}

exports.signup = function(req,res){
	var _user = req.body.user;

	User.findOne({name:_user.name},function(err,user){
		if(err){
			console.log(err);
		}
		if(user){
			return res.redirect('/signin');
		}else{
			var user = new User(_user);
			user.save(function(err,user){
				if(err){
					console.log(err);
				}
				res.redirect('/')
			})
		}
	})
	
}


//signin
exports.showSignin = function(req,res){
	res.render('signin', {
		title:'广州微林园林绿化工程有限公司-登陆'
	})
}

exports.signin =function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name:name},function(err,user){//用户名是否存在
		if(err){
			console.log(err);
		}
		if(!user){
			return res.redirect('/signup');
		}

		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err);
			}
			if(isMatch){//密码是否匹配
				req.session.user = user;				
				return res.redirect('/');
			}else{
				return res.redirect('/signin');
			}
		})
	})
}

//logout
exports.logout =function(req,res){
	delete req.session.user;
	res.redirect('/');
}

//userlist page
exports.list =function(req,res){

	User.fetch(function(err,users){
		if(err){
			console.log(err);
		}
		res.render('userlist', {
			title:'广州微林园林绿化工程有限公司-用户列表页',
			users:users
		})
	})
	
}

//midware for user
exports.signinRequest =function(req,res,next){
	var user = req.session.user;
	if(!user){
		return res.redirect('/signin')
	}
	next();
		
}

exports.adminRequest =function(req,res,next){
	var user = req.session.user;	
	if(user.role <= 10 ){
		return res.redirect('/signin')		
	}
	next();
}

//list delete user
exports.del = function(req,res){
	var id = req.query.id;
	if(id){
		User.remove({_id:id},function(err,user){
			if(err){
				console.log(err);
			}else{
				res.json({success:1})
			}
		})
	}
}