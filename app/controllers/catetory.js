/**
 * Created by Kenvi on 2016/4/2.
 */
const Catetory = require('../models/catetory');
const Flower = require('../models/flower');
const _ = require('underscore');


//admin new page
exports.new = function(req,res){
    res.render('catetory_admin', {
        title:'广州微林园林绿化工程有限公司-产品分类录入',
        catetory:{}
    })
};

//admin update page
exports.update = function(req,res){
    var id = req.params.id;
    if(id){
        Catetory.findById(id,function(err,catetory){
            res.render('catetory_admin', {
                title:'广州微林园林绿化工程有限公司-产品分类录入change',
                catetory:catetory
            })
        });
    }    
}

//admin post catetory
exports.save = function(req,res){
    var _catetory = req.body.catetory;
    switch(_catetory.knowledge){
        case 'true' : _catetory.knowledge = true;break;
        case 'false' : _catetory.knowledge = false;break;
    }
    var id = _catetory._id;
    var catetory ;
    if(id){
        Catetory.findById(id,function(err,oldCatetory){
            catetory = _.extend(oldCatetory,_catetory);
            catetory.save(function(err,catetory){
                if(err){
                    console.log(err);
                }

                res.redirect('/admin/catetory/list' );
            })
        });
    }else{
        catetory = new Catetory(_catetory);
        catetory.save(function(err,catetory){
            if(err){
                console.log(err);
            }

            res.redirect('/admin/catetory/list' );
        })
    }

    

};

//catelist page
exports.list =function(req,res){

    Catetory.fetch(function(err,catetories){
        if(err){
            console.log(err);
        }
        var categories = catetories;

        Flower
            .find({flowers:categories.flowers})
            .populate('flowers','title')
            .exec(function(err,flowers){
                categories.forEach(function(item){
                    item.flowersName = [];
                    flowers.forEach(function(flo){
                        if(flo.catetory.toString() === item._id.toString()){
                            item.flowersName.push(flo.title);
                        }
                    });
                });
                res.render('catetorylist', {
                    title:'广州微林园林绿化工程有限公司-产品分类列表',
                    catetories:categories
                })
            })

    })

};

//list.delete catetory
exports.del = function(req,res){
    var id = req.query.id;
    if(id){
        Catetory.remove({_id:id},function(err,catetory){
            if(err){
                console.log(err);
            }else{
                res.json({success:1})
            }
        })
    }
};