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

//操作推荐产品dom结构
$(function(){
    var pro = $('#bestPro .carousel-inner .col-md-3');
    var maxnum = 4;

    var pagecount ;//页数
    if(pro.length % maxnum != 0){
        pagecount = Math.floor(pro.length/maxnum) + 1;//总数除以每页显示数不为零再添加一页
    }else{
        pagecount = Math.floor(pro.length/maxnum);
    }

    for(var i =0;i<pagecount;i++){//添加页码
        $('#bestPro .carousel-indicators').append('<li data-target="#bestPro" data-slide-to="'+i+'"></li>');
    }
    $('#bestPro .carousel-indicators li:eq(0)').addClass('active');//默认选择第一页

    $('#bestPro .carousel-inner').find('.item').eq(0).addClass('active');
});