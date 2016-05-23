/**
 * Created by Kenvi on 2016/5/23.
 */

exports.about = function(req,res){
    res.render('about', {
        title:'广州微林园林绿化工程有限公司-关于我们',
        bodytype:'about'
    })
};