const Flower = require('../models/flower');
const Comment = require('../models/comment');
const Catetory = require('../models/catetory');
const _ = require('underscore');
const fs = require('fs');
const path = require('path');


//detail page
exports.detail = function(req,res){
	var id  = req.params.id;

	if(id){

	}

	Flower.update({_id:id},{$inc:{pv:1}},function(err){
		if(err){
			console.log(err);
		}
	})

	Flower.findById(id,function(err,flower){
		if(err){
			res.redirect('/');
		}else{
			Comment
				.find({movie:id})
				.populate('from','name')
				.populate('reply.from reply.to','name')
				.exec(function(err,comments){
					if(err){
						console.log(err);
					}
					res.render('detail', {
						title:flower.title + '详情页',
						movie:flower,
						comments:comments
					})
				})
		}

	})

}

//admin new page
exports.new = function(req,res){
	Catetory.find({},function(err,catetories){
		res.render('admin', {

			title:'后台录入页',
			catetories:catetories,
			movie:{}
		})
	})

}

//admin update movie
exports.update = function(req,res){
	var id = req.params.id;

	if(id){
		Flower.findById(id,function(err,flower){
			Catetory.find({},function(err,catetories){
				res.render('admin',{
					title:'后台更新页',
					movie:flower,
					catetories:catetories
				})
			})
		})
	}
}

//admin	poster
exports.savePoster = function(req,res,next){
	var posterData = req.files.uploadPoster;
	var filePath = posterData.path;
	var originalFilename = posterData.originalFilename;

	if(originalFilename){
		fs.readFile(filePath,function(err,data){
			var timestamp = Date.now();
			var type = posterData.type.split('/')[1];
			var poster = timestamp+'.'+type;
			var newPath = path.join(__dirname,'../../','public/upload/'+ poster);

			fs.writeFile(newPath,data,function(err){
				req.poster = poster;
				next();
			})
		})
	}else{
		next();
	}
}

//admin post movie
exports.save = function(req,res){
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;

	if(req.poster){
		movieObj.poster = req.poster;
	}

	if(id){
		Flower.findById(id,function(err,flower){
			if(err){
				console.log(err);
			}
			_movie = _.extend(flower,movieObj);
			_movie.save(function(err,flower){
				if(err){
					console.log(err);
				}

				res.redirect('/flower/' + flower._id);
			})
		})
	}else{
		_movie = new Flower(movieObj);

		var catetoryId = movieObj.catetory;
		var catetoryName =  movieObj.catetoryName;
		//console.log(movieObj);

		_movie.save(function(err,flower){
			if(err){
				console.log(err);
			}
			if(catetoryId){
				Catetory.findById(catetoryId,function(err,catetory){
					catetory.movies.push(flower._id);
					catetory.save(function(err,catetory){
						res.redirect('/flower/' + flower._id);
					})
				})
			}else if(catetoryName){
				var catetory = new Catetory({
					name:catetoryName,
					movies:[flower._id]
				})
				catetory.save(function(err,catetory){
					flower.catetory = catetory._id;
					flower.save(function(err,movie){
						res.redirect('/flower/' + movie._id);
					})

				})
			}


		})
	}
}

//list page
exports.list = function(req,res){
	Flower.fetch(function(err,flowers){
		if(err){
			console.log(err);
		}
		res.render('list', {
			title:'列表页',
			movies:flowers
		})
	})

}

//list delete movie
exports.del = function(req,res){
	var id = req.query.id;
	if(id){
		Flower.remove({_id:id},function(err,movie){
			if(err){
				console.log(err);
			}else{
				res.json({success:1})
			}
		})
	}
}