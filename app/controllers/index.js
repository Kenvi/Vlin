const Flower = require('../models/flower');
const Catetory = require('../models/catetory')


//index page
exports.index =  function(req,res){
	Catetory
		.find({})
		.populate({path:'flowers',options:{limit:5}})
		.exec(function(err,catetories){
			if(err){
				console.log(err);
			}
			res.render('index', {
				title:'首页',
				catetories:catetories
			})
		})
	
}

exports.search =  function(req,res){
	var catId = req.query.cat;
	var q = req.query.q;
	var page = parseInt(req.query.p, 10) || 0;
	const count = 2;
	var index = page * count;

	if(catId){
		Catetory
			.find({_id:catId})
			.populate({
				path:'movies',
				select:'title poster'})
			.exec(function(err,catetories){
				if(err){
					console.log(err);
				}

				var catetory = catetories[0] || {};
				var movies = catetory.movies || [];
				var results = movies.slice(index,index + count);
				res.render('results', {
					title:'结果列表',
					keyword:catetory.name,
					currentPage:(page+1),
					totalPage:Math.ceil(movies.length/count),
					query:'cat='+catId,
					movies:results
				})
			})
	}else{
		Flower
			.find({title:new RegExp(q+'.*','i')})
			.exec(function(err,movies){
				if(err){
					console.log(err);
				}

				var results = movies.slice(index,index + count);
				res.render('results', {
					title:'结果列表',
					keyword:q,
					currentPage:(page+1),
					totalPage:Math.ceil(movies.length/count),
					query:'q='+q,
					movies:results
				})
			})
	}


}