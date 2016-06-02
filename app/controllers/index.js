const Flower = require('../models/flower');
const Catetory = require('../models/catetory');
const Banner = require('../models/banner');


//index page
exports.index =  function(req,res){
	Flower
		.find({'recommend' : {$gt : 5}})
		.exec(function(err,flowers){
			if(err){
				console.log(err);
			}

			Banner.find({},function(err,banners){
				if(err){
					console.log(err);
				}
				res.render('index', {
					title:'广州微林园林绿化工程有限公司-首页',
					bodytype:'index',
					flowers:flowers,
					banners:banners
				})
			})

		})
	
};

exports.search =  function(req,res){
	var catId = req.query.cat;
	var q = req.query.q;
	var page = parseInt(req.query.p, 10) || 0;
	const count = 5;
	var index = page * count;

	if(catId){
		Catetory
			.find({_id:catId})
			.populate({
				path:'flowers',
				select:'title poster'})
			.exec(function(err,catetories){
				if(err){
					console.log(err);
				}

				var catetory = catetories[0] || {};
				var flowers = catetory.flowers || [];
				var results = flowers.slice(index,index + count);
				res.render('results', {
					title:'广州微林园林绿化工程有限公司-结果列表',
					keyword:catetory.name,
					currentPage:(page+1),
					totalPage:Math.ceil(flowers.length/count),
					query:'cat='+catId,
					flowers:results
				})
			})
	}else{
		Flower
			.find({title:new RegExp(q+'.*','i')})
			.exec(function(err,flowers){
				if(err){
					console.log(err);
				}

				var results = flowers.slice(index,index + count);
				res.render('results', {
					title:'广州微林园林绿化工程有限公司-结果列表',
					keyword:q,
					currentPage:(page+1),
					totalPage:Math.ceil(flowers.length/count),
					query:'q='+q,
					flowers:results
				})
			})
	}


};

