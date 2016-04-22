const Flower= require('../app/controllers/flower');
const Index = require('../app/controllers/index');
const User = require('../app/controllers/user');
const Comment = require('../app/controllers/comment');
const Catetory = require('../app/controllers/catetory');

module.exports = function(app){
	
	//pre handle user
	app.use(function(req,res,next){
		var _user = req.session.user;
		app.locals.user = _user;
		 next();
	})

	//index 
	app.get('/',Index.index);

	//User
	app.post('/user/signup',User.signup);	
	app.get('/admin/user/list',User.signinRequest,User.adminRequest, User.list);	
	app.post('/user/signin',User.signin);	
	app.get('/signin',User.showSignin);
	app.get('/signup',User.showSignup);
	app.get('/logout',User.logout);
	app.delete('/admin/user/list',User.signinRequest,User.adminRequest, User.del);


	//Flower
	app.get('/flower/:id',Flower.detail);
	app.get('/admin/flower/new',User.signinRequest,User.adminRequest,Flower.new);
	app.get('/admin/flower/update/:id',User.signinRequest,User.adminRequest,Flower.update);
	app.post('/admin/flower',User.signinRequest,User.adminRequest,Flower.savePoster,Flower.save);
	app.get('/admin/flower/list',User.signinRequest,User.adminRequest,Flower.list);
	app.delete('/admin/flower/list',User.signinRequest,User.adminRequest, Flower.del);

	//Comment
	app.post('/user/comment',User.signinRequest,Comment.save);

	//Catetory
	app.get('/admin/catetory/new',User.signinRequest,User.adminRequest,Catetory.new);
	app.post('/admin/catetory',User.signinRequest,User.adminRequest,Catetory.save);
	app.get('/admin/catetory/list',User.signinRequest,User.adminRequest,Catetory.list);
	app.delete('/admin/catetory/list',User.signinRequest,User.adminRequest, Catetory.del);

	//Results
	app.get('/results',Index.search);

}