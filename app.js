const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const multipart = require('connect-multiparty');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const port = process.env.PORT || 3000 ;
var app = express();
var dbUrl = 'mongodb://127.0.0.1:27017/MongoDB';
var db = mongoose.connect(dbUrl);

//models loading
//var models_path = __dirname + '/app/models';
//var walk = function(){
//	fs
//		.readdirSync(path)
//		.forEach(function(file){
//			var newPath = path + '/' + file;
//			var stat = fs.statSync(newPath);
//
//			if(stat.isFile()){
//				if(/(.*)\.(js|coffee)/.test(file)){
//					require(newPath);
//				}
//			}else if(stat.isDirectory()){
//				walk(newPath);
//			}
//		})
//
//}
//walk(models_path);

app.set('views','./app/views/pages');
app.set('view engine','jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(multipart());
app.use(session({
	secret:'imooc',
	store:new mongoStore({
		url:dbUrl,
		collection:'sessions'
	})
}));

var env = process.env.NODE_ENV || 'development';
if('development' === env){
	app.set('showStarkError',true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug',true);
}
require('./config/routes')(app);
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('Server start on port ' + port);

db.connection.on('error', function (error) { 
	console.log( error); 
}); 
db.connection.on('open', function () { 
	console.log("数据库连接成功！"); 
});
