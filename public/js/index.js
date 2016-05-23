/**
 * Created by Kenvi on 2016/5/18.
 */

//轮播图
$('.carousel').carousel();

//产品图片悬停效果
$('.pro-show').hover(function(){
    $(this).addClass('is-inverse');
},function(){
    $(this).removeClass('is-inverse');
});

