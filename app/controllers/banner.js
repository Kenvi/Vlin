/**
 * Created by Kenvi on 2016/5/16.
 */

const Banner = require('../models/banner');
const _ = require('underscore');
const fs = require('fs');
const path = require('path');

//admin new page
exports.new = function(req,res){
    res.render('banner_admin', {
        title:'广州微林园林绿化工程有限公司-banner录入',
        banner:{}
    })
};

//admin save banner
exports.saveBanner = function(req,res,next){
    var bannerData = req.files.uploadBanner;
    var filePath = bannerData.path;
    var originalFilename = bannerData.originalFilename;

    if(originalFilename){
        fs.readFile(filePath,function(err,data){
            var timestamp = 'banner' + Date.now();
            var type = bannerData.type.split('/')[1];
            var banner = timestamp+'.'+type;
            var newPath = path.join(__dirname,'../../','public/upload/'+ banner);

            fs.writeFile(newPath,data,function(err){
                req.banner = banner;
                next();
            })
        })
    }else{
        next();
    }
};

//admin post banner
exports.save = function(req,res){
    var _banner = req.body.banner;
    if(req.banner){
        _banner.banner = req.banner;
    }
    var banner = new Banner(_banner);

    banner.save(function(err,banner){
        if(err){
            console.log(err);
        }

        res.redirect('/admin/banner/list' );
    })

};

//bannerlist page
exports.list = function(req,res){
    Banner.fetch(function(err,banners){
        if(err){
            console.log(err);
        }
        res.render('bannerlist', {
            title:'广州微林园林绿化工程有限公司-banner列表页',
            banners:banners
        })
    })

};

//list.delete banner
exports.del = function(req,res){
    var id = req.query.id;
    if(id){
        Banner.remove({_id:id},function(err,banner){
            if(err){
                console.log(err);
            }else{
                res.json({success:1})
            }
        })
    }
};