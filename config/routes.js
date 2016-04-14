const Movie= require('../app/controllers/movie');
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


	//Movie
	app.get('/movie/:id',Movie.detail);
	app.get('/admin/movie/new',User.signinRequest,User.adminRequest,Movie.new);
	app.get('/admin/movie/update/:id',User.signinRequest,User.adminRequest,Movie.update);
	app.post('/admin/movie',User.signinRequest,User.adminRequest,Movie.savePoster,Movie.save);
	app.get('/admin/movie/list',User.signinRequest,User.adminRequest,Movie.list);
	app.delete('/admin/movie/list',User.signinRequest,User.adminRequest, Movie.del);

	//Comment
	app.post('/user/comment',User.signinRequest,Comment.save);

	//Catetory
	app.get('/admin/catetory/new',User.signinRequest,User.adminRequest,Catetory.new);
	app.post('/admin/catetory',User.signinRequest,User.adminRequest,Catetory.save);
	app.get('/admin/catetory/list',User.signinRequest,User.adminRequest,Catetory.list);

	//Results
	app.get('/results',Index.search);

}