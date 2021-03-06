const Flower= require('../app/controllers/flower');
const Index = require('../app/controllers/index');
const Product = require('../app/controllers/list');
const About = require('../app/controllers/about');
const News = require('../app/controllers/news');
const Knowledge = require('../app/controllers/knowledge');
const User = require('../app/controllers/user');
const Comment = require('../app/controllers/comment');
const Catetory = require('../app/controllers/catetory');
const Banner = require('../app/controllers/banner');

module.exports = function(app){
	
	//pre handle user
	app.use(function(req,res,next){
		var _user = req.session.user;
		app.locals.user = _user;
		 next();
	});

	//index 
	app.get('/',Index.index);

	//list
	app.get('/pro-list',Product.proList);

	//about-us
	app.get('/about-us',About.about);

	//knowledge
	app.get('/knowledge',Knowledge.knowledge);

	//news
	app.get('/news',News.news);
	app.get('/admin/news/new',User.signinRequest,User.adminRequest,News.new);
	app.get('/admin/news/update/:id',User.signinRequest,User.adminRequest,News.update);
	app.get('/admin/news/list',User.signinRequest,User.adminRequest,News.list);
	app.post('/admin/news',User.signinRequest,User.adminRequest,News.save);
	app.delete('/admin/news/list',User.signinRequest,User.adminRequest, News.del);

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
	app.post('/admin/flower',User.signinRequest,User.adminRequest,Flower.saveThumbnail,Flower.savePoster,Flower.save);
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

	//Banner
	app.get('/admin/banner/new',User.signinRequest,User.adminRequest,Banner.new);
	app.post('/admin/banner',User.signinRequest,User.adminRequest,Banner.saveBanner,Banner.save);
	app.get('/admin/banner/list',User.signinRequest,User.adminRequest,Banner.list);
	app.get('/admin/banner/update/:id',User.signinRequest,User.adminRequest,Banner.update);
	app.delete('/admin/banner/list',User.signinRequest,User.adminRequest, Banner.del);

	//Admin
	app.get('/admin/index',User.signinRequest,User.adminRequest,User.index);

};