/**
 * Created by Kenvi on 2016/4/2.
 */
const Catetory = require('../models/catetory');

//admin new page
exports.new = function(req,res){
    res.render('catetory_admin', {
        title:'电影分类录入页',
        catetory:{}
    })
}


//admin post movie
exports.save = function(req,res){
    var _catetory = req.body.catetory;
    var catetory = new Catetory(_catetory);

    catetory.save(function(err,catetory){
        if(err){
            console.log(err);
        }

        res.redirect('/admin/catetory/list' );
    })

}

//catelist page
exports.list =function(req,res){

    Catetory.fetch(function(err,catetories){
        if(err){
            console.log(err);
        }
        res.render('catetorylist', {
            title:'电影分类列表页',
            catetories:catetories
        })
    })

}