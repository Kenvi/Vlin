(function(){
  var config = {
    init:function(){
      // init
      $('.news-item').eq(0).show(); 
      $('.nav.navbar-nav li').eq(0).addClass('active');
      $('.pull-right').find('a').text($('.nav.navbar-nav li').eq(1).text());
    },
    newsChange:function(index,key){
      $('.nav.navbar-nav li').removeClass('active')
      $('.nav.navbar-nav li').eq(index).addClass('active')
      $('.news-item').hide();
      $('.news-item').eq(index).show();  
      if(index <= 0){
        $('.pull-left').find('a').text('--')
      }else if(index >= $('.nav.navbar-nav li').length-1){
        $('.pull-right').find('a').text('--');
      }else{
        if(key){
          switch (key){
            case 'left': $('.pull-left').find('a').text($('.nav.navbar-nav li').eq(index-1).text());break;
            case 'right': $('.pull-left').find('a').text($('.nav.navbar-nav li').eq(index+1).text());break;
          }
        }
      }
    },
    tabClick:function(){
      $('.nav.navbar-nav li').click(function(){
          var index = $('.nav.navbar-nav li').index(this);
          config.newsChange(index);
      });
    },
    titClick:function(){
      $('.pull-left').click(function(){
        var index = $('.nav.navbar-nav li').index($('.nav.navbar-nav li.active'))-1;
        if(index <= 0){
          $(this).find('a').text('--');
        }else{
          config.newsChange(index-1);
           $(this).find('a').text($('.nav.navbar-nav li').eq(index-2).text());
        }
      });
    }
  };
  config.init();
  config.tabClick();
  config.titClick();
    
     


})();
