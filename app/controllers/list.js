/**
 * Created by Kenvi on 2016/5/22.
 */

const Flower = require('../models/flower');
const Catetory = require('../models/catetory');

//product-list page

exports.proList = function (req,res) {
    Catetory
        .find({})
        .populate({path:'flowers'})
        .exec(function(err,catetories){
            if(err){
                console.log(err);
            }
            res.render('list', {
                title:'广州微林园林绿化工程有限公司-产品列表',
                bodytype:'pro-list',
                catetories:catetories
            })
        })

};