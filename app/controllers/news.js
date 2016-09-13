/**
 * Created by Kenvi on 2016/5/30.
 */

 const News = require('../models/news');
 const _ = require('underscore');
 const fs = require('fs');
 const path = require('path');


exports.news = function (req,res) {
    News.fetch(function (err,news) {
        res.render('news',{
            title:'广州微林园林绿化工程有限公司-新闻公告',
            bodytype:'news',
            news:news
        })
    })
};

exports.new = function (req,res) {
    res.render('news_admin', {
        title:'广州微林园林绿化工程有限公司-news录入',
        news:{}
    })
};

//admin update news
exports.update = function(req,res){
    var id = req.params.id;

    if(id){
        News.findById(id,function(err,news){
            res.render('news_admin',{
                title:'广州微林园林绿化工程有限公司-news后台更新页',
                news:news
            })
        })
    }
};


exports.save = function (req,res) {
    var _news = req.body.news;
    var id = _news._id;
    var news;

    if(id){
        News.findById(id,function (err,oldNews) {
            if(err){
                console.log(err);
            }
            news = _.extend(oldNews , _news);
            news.save(function(err,news){
                if(err){
                    console.log(err);
                }
                res.redirect('/admin/news/list' );
            })
        })
    }else{
        news = new News(_news);
        news.save(function(err,news){
            if(err){
                console.log(err);
            }
            res.redirect('/admin/news/list' );
        })
    }
};

exports.list = function(req,res){
    News.fetch(function(err,news){
        if(err){
            console.log(err);
        }
        res.render('newslist', {
            title:'广州微林园林绿化工程有限公司-news列表页',
            news:news
        })
    })
};

//list.delete news
exports.del = function(req,res){
    var id = req.query.id;
    if(id){
        News.remove({_id:id},function(err,news){
            if(err){
                console.log(err);
            }else{
                res.json({success:1})
            }
        })
    }
};