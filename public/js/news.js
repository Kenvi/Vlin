(function(){
  var config = {
    //liIndex:$('.nav.navbar-nav li').index($('.nav.navbar-nav li.active')),
    liLen:$('.nav.navbar-nav li').length,
    init:function(){
      // init
      $('.news-item').eq(0).show(); 
      $('.nav.navbar-nav li').eq(0).addClass('active');
      $('.pull-right').find('a').text($('.nav.navbar-nav li').eq(1).text());
    },
    newsChange:function(index){

      if(index < 0){
        $('.pull-left').find('a').text('当前为第一篇');
        return;
      }else if(index >= $('.nav.navbar-nav li').length){
        $('.pull-right').find('a').text('当前为最后一篇');
        return;
      }else{
        $('.nav.navbar-nav li').removeClass('active');
        $('.nav.navbar-nav li').eq(index).addClass('active');
        $('.news-item').hide();
        $('.news-item').eq(index).show();

        var titPre = $('.nav.navbar-nav li').eq(index-1).text();
        if(index-1 < 0){titPre = '当前为第一篇'}
        var titNext = $('.nav.navbar-nav li').eq(index+1).text();

        $('.pull-left').find('a').text(titPre);
        $('.pull-right').find('a').text(titNext || '当前为最后一篇');
      }
    },
    tabClick:function(){
      $('.nav.navbar-nav li').click(function(){
          var index = $('.nav.navbar-nav li').index(this);
          config.newsChange(index);
      });
    },
    titClick:function(){
      $('.tit-click a').click(function(){
        var index = $('.nav.navbar-nav li').index($('.nav.navbar-nav li.active'));
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
    
     


})();
