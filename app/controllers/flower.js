const Flower = require('../models/flower');
const Comment = require('../models/comment');
const Catetory = require('../models/catetory');
const _ = require('underscore');//主要调用其extend方法替换更新过的产品信息
const fs = require('fs');
const path = require('path');


//detail page
exports.detail = function(req,res){
	var id  = req.params.id;

	Flower.update({_id:id},{$inc:{pv:1}},function(err){
		if(err){
			console.log(err);
		}
	});

	Flower.findById(id,function(err,flower){
		if(err){
			res.redirect('/');
		}else{
			Comment
				.find({flower:id})
				.populate('from','name')
				.populate('reply.from reply.to','name')
				.exec(function(err,comments){
					if(err){
						console.log(err);
					}
					res.render('detail', {
						title:'广州微林园林绿化工程有限公司-产品详情_'+flower.title,
						bodytype:'pro-list',
						flower:flower,
						comments:comments
					})
				})
		}

	})

};

//admin new page
exports.new = function(req,res){
	Catetory.find({},function(err,catetories){
		res.render('admin', {

			title:'广州微林园林绿化工程有限公司-后台录入页',
			catetories:catetories,
			flower:{}
		})
	})

}

//admin update flower
exports.update = function(req,res){
	var id = req.params.id;

	if(id){
		Flower.findById(id,function(err,flower){
			Catetory.find({},function(err,catetories){
				res.render('admin',{
					title:'广州微林园林绿化工程有限公司-后台更新页',
					flower:flower,
					catetories:catetories
				})
			})
		})
	}
};

//admin	poster
exports.savePoster = function(req,res,next){
	var posterData = req.files.uploadPoster;

	if(posterData.length > 1){//上传一张以上图片
		var j=0,J=0;
		req.poster = [];

		for(var i=0;i<posterData.length;i++){
			var FilePath = posterData[i].path;
			var OriginalFilename = posterData[i].originalFilename;

			if(OriginalFilename){
				fs.readFile(FilePath,function(err,data){//读取文件
					var timestamp = Date.now();
					var type = OriginalFilename.split('.')[1];
					var poster = timestamp+j+'.'+type;
					var newPath = path.join(__dirname,'../../','public/upload/'+ poster);
					j++;

					fs.writeFile(newPath,data,function(err){//文件写入upload
						J++;
						req.poster.push(poster);
						if(J == posterData.length){
							next();
						}

					})
				})
			}else{
				next();
			}
		}

	}else{
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



};

//admin thumbnail
exports.saveThumbnail = function(req,res,next){
	var thumbnailData = req.files.thumbnail;
	var filePath = thumbnailData.path;
	var originalFilename = thumbnailData.originalFilename;

	if(originalFilename){
		fs.readFile(filePath,function(err,data){
			var timestamp = Date.now();
			var type = thumbnailData.type.split('/')[1];
			var thumbnail = timestamp+'thumbnail'+'.'+type;
			var newPath = path.join(__dirname,'../../','public/upload/'+ thumbnail);

			fs.writeFile(newPath,data,function(err){
				req.thumbnail = thumbnail;
				next();
			})
		})
	}else{
		next();
	}
};


//admin post flower
exports.save = function(req,res){
	var id = req.body.flower._id;
	var flowerObj = req.body.flower;
	var _flower;

	if(req.poster){
		flowerObj.poster = req.poster;
	}

	if(req.thumbnail){
		flowerObj.thumbnail = req.thumbnail;
	}

	if(id){//该产品存在，变为修改更新

		//清除原来的类别
		//Catetory
		//	.find({flowers:id})
		//	.exec(function(err,cat){
		//		console.log(cat[0].flowers);
		//		cat[0].flowers.remove(id);
		//		console.log(id);
		//		cat[0].save(function(err,cat){
		//			if(err){console.log(err);}
		//		})
		//	});

		//保存新数据
		Flower.findById(id,function(err,flower){
			if(err){
				console.log(err);
			}
			_flower = _.extend(flower,flowerObj);//更新的数据替换原来的数据
			_flower.save(function(err,flower){
				if(err){
					console.log(err);
				}

				res.redirect('/flower/' + flower._id);

			})

		})


	}else{//产品不存在，新建产品//
		_flower = new Flower(flowerObj);


		var catetoryId = flowerObj.catetory;//类别id
		var catetoryName =  flowerObj.catetoryName;//类别名

		_flower.save(function(err,flower){
			if(err){
				console.log(err);
			}
			if(catetoryId){//类别存在，添加产品进入该类
				_flower.catetory = catetoryId;
				Catetory.findById(catetoryId,function(err,catetory){
					if(err){
						console.log(err);
					}

					catetory.flowers.push(flower._id);
					catetory.save(function(err,catetory){
						res.redirect('/flower/' + flower._id);
					})
				})
			}else if(catetoryName){//类别不存在，新建类别，并保存产品进该类别
				var catetory = new Catetory({
					name:catetoryName,
					flowers:[flower._id]
				});
				catetory.save(function(err,catetory){
					flower.catetory = catetory._id;
					flower.save(function(err,flower){
						res.redirect('/flower/' + flower._id);
					})

				})
			}


		})
	}
};

//list page
exports.list = function(req,res){
	Flower.fetch(function(err,flowers){
		if(err){
			console.log(err);
		}
		res.render('flowerlist', {
			title:'广州微林园林绿化工程有限公司-产品列表',
			flowers:flowers
		})
	})

};

//list delete flower
exports.del = function(req,res){
	var id = req.query.id;
	if(id){
		Flower.remove({_id:id},function(err,flower){
			if(err){
				console.log(err);
			}else{
				res.json({success:1})
			}
		})
	}
};