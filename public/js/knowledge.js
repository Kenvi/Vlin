/**
 * Created by Kenvi on 2016/9/19.
 */
(function(li,item){
    var config = {
        liLen:li.length,
        init:function(){
            // 初始化
            var index;
            li.each(function(i,item){
                if($(item).attr('data-id') === config.getQueryString('newsId')){
                    index = i;
                    return;
                }
                index = 0;
                return;
            });
            config.newsChange(index);
        },
        getQueryString:function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        newsChange:function(index){

            if(index < 0){
                $('.pull-left').find('a').text('当前为第一篇');
                return;
            }else if(index >= li.length){
                $('.pull-right').find('a').text('当前为最后一篇');
                return;
            }else{
                li.removeClass('active');
                li.eq(index).addClass('active');
                item.hide();
                item.eq(index).show();

                var titPre = li.eq(index-1).text();
                if(index-1 < 0){titPre = '当前为第一篇'}
                var titNext = li.eq(index+1).text();

                $('.pull-left').find('a').text(titPre);
                $('.pull-right').find('a').text(titNext || '当前为最后一篇');
            }
        },
        tabClick:function(){
            li.click(function(){
                var index = li.index(this);
                config.newsChange(index);
            });
        },
        titClick:function(){
            $('.tit-click a').click(function(){
                var index = li.index($('.nav.navbar-nav li.active'));
                var eq = $('.tit-click a').index($(this));

                switch(eq){
                    case 0 : config.newsChange(index-1);break;
                    case 1 : config.newsChange(index+1);break;
                }
            });
        }
    };
    config.init();
    config.tabClick();
    config.titClick();

})($('.nav.navbar-nav li .dropdown-menu li'),$('.knowledge-item'));
