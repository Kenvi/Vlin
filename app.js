const express = require('express');//引用Express框架
const path = require('path');//引用路径模块
const fs = require('fs');//文件读写模块
const bodyParser = require('body-parser');//将表单提交的数据序列化成对象
const mongoose = require('mongoose');//数据库模型设计模块，能对mongodb进行建模操作
const cookieParser = require('cookie-parser');//解析浏览器cookie数据的中间件，这个模块配合session使用
const multipart = require('connect-multiparty');
const session = require('express-session');//express框架session中间件，用来在服务器暂时端存储用户数据
const mongoStore = require('connect-mongo')(session);//存储session到数据库所需的中间件
const logger = require('morgan');
const port = process.env.PORT || 80 ;//设置项目启动端口默认为3000（如果在开发环境设置端口则启动端口变为设置端口）
var app = express();
var dbUrl = 'mongodb://127.0.0.1:27017/vlin';//本地数据库url
//var dbUrl = 'mongodb://121.42.182.127:27017/vlin';//阿里云数据库url
var db = mongoose.connect(dbUrl);//连接数据库

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

app.set('views','./app/views/pages');//设置视图文件路径
app.set('view engine','jade');//设置模板引擎
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(multipart());
app.use(session({
	secret:'vlin',
	store:new mongoStore({
		url:dbUrl,
		collection:'sessions'
	})
}));

//var env = process.env.NODE_ENV || 'development';
//if('development' === env){//开发环境调试输出内容
//	app.set('showStarkError',true);//堆栈出错
//	app.use(logger(':method :url :status'));//输出请求方式 地址 状态码
//	app.locals.pretty = true;
//	mongoose.set('debug',true);//数据库变化输出
//}
require('./config/routes')(app);
app.use(express.static(path.join(__dirname, 'public')));//使用路径模块设置静态资源默认路径
app.locals.moment = require('moment');//日期格式化模块
app.listen(80,'121.42.182.127');

//console.log('Server start on port ' + port);

db.connection.on('error', function (error) { 
	console.log( error); 
}); 
db.connection.on('open', function () { 
	console.log("数据库连接成功！"); 
});
