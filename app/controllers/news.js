/**
 * Created by Kenvi on 2016/5/30.
 */

 const News = require('../models/news');
 const _ = require('underscore');
 const fs = require('fs');
 const path = require('path');


exports.news = function (req,res) {
    res.render('news',{
        title:'广州微林园林绿化工程有限公司-新闻公告',
        bodytype:'news',
        newsContent1:' “寻找最美导游”活动，既是对优秀导游的表彰，同时也是对其他导游的鞭策;既是导游队伍的形象展示，也能让社会更细致、深'
        +'入地了解导游员那不为人所知的努力和付出。',
        newsContent2:'据报道，由国家XX局、XX联合主办的“寻找最美导游”活动，目前正在各地如火如荼地开展。不经意间人们发现，一直以来默默'
        +'付出、先人后己、备受好评的最美导游其实就在自己的身边，且他们似乎还有一共同的特点——皮肤黝黑，这是多年一线带团久历'
        +'风吹日晒的印记，而这些“黑珍珠”正是美丽产业的重要财富，弥足珍贵。',
        newsContent3:'美丽产业需要展示“黑珍珠”的形象与价值。长久以来，由于在零负团费等扭曲的业态环境下，旅游经营和运营当中产生的一系'
        +'列问题，都在导游的工作过程中爆发，一定程度上让导游这个群体承担了部分行业弊病，所以导游常常处在“风口浪尖”上。',
        newsContent4:'客观地说，导游确实有自身的不足，但同时还有他们的无奈、委屈与痛苦，希望社会能够正确对待与理解，在导游方面，不能'
        +'总是“好事不出门，坏事传千里”，这对导游来说既不公平也不负责。',
        newsContent5:'从宏观上来说，当前我国有70多万名导游，这支队伍总体是好的，对旅游业的发展做出了巨大的贡献，游客对导游的评价也有'
        +'许多可圈可点之处;就微观而言，在笔者认识的导游当中，有的自从业起，就没在春节和家人吃过一次团圆饭，把快乐带给游客，让'
        +'遗憾留给自己;有的因为全心扑在带团工作上，成了称职的导游，失职的妈妈，舍小家顾大家;有的在带团期间得知亲人去世，却强忍'
        +'悲痛，仍然微笑面对游客，给客人一个快乐的旅程……',
        newsContent6:'“寻找最美导游”活动，既是对优秀导游的一份表彰，也是对其他导游的一种鞭策;既是导游队伍的形象展示，也能让社会更细致、'
        +'深入地了解导游员那不为人知的努力和付出。',
        newsContent7:'“寻找最美导游”活动不仅仅在于发现“黑珍珠”，还在于编织“黑珍珠项链”。根据活动方案，活动组委会将面向广大公众和导游员'
        +'群体组织开展“寻找最美导游•随手拍”、“最美导游是怎样炼成的”有奖征文、“导游职业声望大家谈”等活动，并将相关事迹材料、征文'
        +'获奖作品、摄影作品等集纳成册，出版发行《最美导游》一书，广泛宣传“最美导游”先进事迹。由此可见，此次活动将散落在各省'
        +'市的“黑珍珠”——最美导游集中起来，拧成一股绳，汇聚强大的正能量，串成令人惊叹的“黑珍珠项链”，从而凭借集体的力量，展示'
        +'导游群体的职业美、品德美、行为美，树立导游群体的良好形象，让全社会进一步理解、尊重和信任导游，增强导游的职业自信心'
        +'和自豪感。',
        newsContent8:'“寻找最美导游”让“黑珍珠”更升值。当前，各省市正结合自身情况，开展“寻找最美导游”活动，为了让最美导游含金量更高，不'
        +'断提升社会认可度，有的在活动中与各省市工会、人事劳动部门合作，授予最美导游“技术状元”、“技术能手”称号;有的与国家旅游'
        +'局开展的名导进堂结合，让最美导游走进大学，给院校大学生们上课，打造专家型导游;有的还推荐最美导游参评省、市级劳动模范'
        +'等等，目的就是给最美导游广阔的舞台，让“黑珍珠”们熠熠生辉，让社会感知导游的才华，不断提升导游的社会地位。',
        newsContent9:'业界权威人士曾指出，导游在今后旅游业转型升级中具有特殊性和重要性，其地位不仅不会边缘和弱化，反而会更加凸现和重'
        +'要。导游作为行业的“压舱石”，其作用将越来越重要，有为才有位，导游队伍中必须要有一批批的“黑珍珠”们，以“俯首甘为孺子牛”'
        +'、“自强不止，止于至善”的无私奉献和自我提升精神，积极践行“游客为本服务至诚”的行业核心价值观，切实做到让游客更满意，让'
        +'公众更认可。'
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