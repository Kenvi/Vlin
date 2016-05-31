const Comment = require('../models/comment');


//comment
exports.save = function(req,res){
	var _comment = req.body.comment;
	var flowerId = _comment.flower;

	if(_comment.cid){
		Comment.findById(_comment.cid,function(err,comment){
			if(err){
				console.log(err);
			}
			var reply = {
				from:_comment.from,
				to:_comment.tid,
				content:_comment.content
			};
			comment.reply.push(reply);
			comment.save(function(err,comment){
				if(err){
					console.log(err);
				}

				res.redirect('/flower/' + flowerId);
			})
		})
	}else{
		var comment = new Comment(_comment);
		comment.save(function(err,comment){
			if(err){
				console.log(err);
			}

			res.redirect('/flower/' + flowerId);
		})
	}

	

};

