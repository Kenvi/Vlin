$(function () {
   $('.nav.navbar-nav li').click(function(){
       $(this).addClass('active').siblings().removeClass('active');
       var index = $('.nav.navbar-nav li').index(this);
       var title = $('.col-md-9.pl25').find('h2');
       if(index == 0){
            title.html('广州微林园林绿化工程有限公司企业网站正式上线啦')
       }
       if(index == 1){
           title.html('广州微林园林绿化工程有限公司企业网站又上线啦')
       }
       if(index == 2){
           title.html('广州微林园林绿化工程有限公司企业网站再次上线啦')
       }
       if(index == 3){
           title.html('广州微林园林绿化工程有限公司企业网站还会上线吗')
       }
       if(index == 4){
           title.html('广州微林园林绿化工程有限公司企业网站掉线了')
       }
   });


});
