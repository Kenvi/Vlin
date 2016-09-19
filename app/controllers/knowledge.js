/**
 * Created by Kenvi on 2016/5/30.
 */
const Catetory = require('../models/catetory');
const Flower = require('../models/flower');

exports.knowledge = function (req,res) {
    Catetory.find({'knowledge':true},function(err,knowledge){
        var knowledges = knowledge;
        var flowers = [];

        Flower
            .find({flowers:knowledges.flowers})
            .populate('flowers','title')
            .exec(function(err,_flowers){
                knowledges.forEach(function(item){
                    item.flowersName = [];
                    _flowers.forEach(function(flo){
                        if(flo.catetory.toString() === item._id.toString()){
                            item.flowersName.push({id:flo._id,title:flo.title});
                            flowers.push(flo);
                        }
                    });
                });
                res.render('knowledge',{
                    title:'广州微林园林绿化工程有限公司-养护知识',
                    bodytype:'knowledge',
                    knowledges:knowledges,
                    flowers:flowers
                })
            });

    });
};