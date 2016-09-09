/**
 * Created by Kenvi on 2016/5/25.
 */

(function(){
    //产品图片悬停效果
    $('.pro-show').hover(function(){
        $(this).addClass('is-inverse');
    },function(){
        $(this).removeClass('is-inverse');
    });

//产品列表选项卡切换，分页

    $(function(){
        var pro = $('.pro');
        var maxnum = 8;//设置每页显示最大条数

        addBurster(pro.length);
        setBurster(pro);

        //类别选项卡切换
        $('.list-nav li').click(function(){

            $(this).addClass('active').siblings().removeClass('active');

            var tab = $('.list-nav li').index($(this));//获取当前选项卡索引
            var catId = $(this).attr('data-id');
            var proId = [];
            for(var l=0;l<pro.length;l++){
                proId.push(pro.eq(l).attr('data-cat'));
            }


            var tabObj = [];//记录该选项卡包含的产品对应的全局索引
            var proArr = [];
            if(tab===0){//点击全部
                pro.show();
                addBurster(pro.length);
                setBurster(pro);
            }else{//点击其他选项卡
                for(var m=0;m<pro.length;m++){
                    if(catId === proId[m]){
                        tabObj.push(m);//添加该选项卡包含的产品对应的全局索引
                        pro.eq(m).show();
                    }else{
                        pro.eq(m).hide();
                    }
                }
                addBurster(tabObj.length);

                //把所有属于该类的产品放在同一数组
                for(var n=0;n<tabObj.length;n++){
                    proArr.push(pro.eq(tabObj[n]));
                }
                //切换分页
                $('ul.pagination li').click(function(){//点击切换分页

                    $(this).addClass('active').siblings().removeClass('active');

                    var currectPage = $('ul.pagination li').index($(this));//获取当前页码索引
                    pro.hide();
                    for(var k=currectPage*maxnum;k<(currectPage+1)*maxnum;k++){
                        proArr[k].show();
                    }

                });
            }
        });

        function addBurster(obj){//添加分页器
            $('ul.pagination').empty();//初始化清空分页器

            var pagecount ;//页数
            if(obj % maxnum != 0){
                pagecount = Math.floor(obj/maxnum) + 1;//总数除以每页显示数不为零再添加一页
            }else{
                pagecount = Math.floor(obj/maxnum);
            }

            //初始化
            if(obj>maxnum){ //隐藏第一页显示最大条数后的产品
                for(var j = maxnum;j<obj;j++){
                    pro.eq(j).hide();
                }
            }

            for(var i =0;i<pagecount;i++){//添加页码
                var page = i+1;
                $('ul.pagination').append('<li><a href="javascript:void(0)">'+page+'</a></li>');
            }
            $('ul.pagination li:eq(0)').addClass('active');//默认选择第一页
        }

        function setBurster(obj){
            //切换分页
            $('ul.pagination li').click(function(){//点击切换分页

                $(this).addClass('active').siblings().removeClass('active');

                var currectPage = $('ul.pagination li').index($(this));//获取当前页码索引
                pro.hide();
                for(var k=currectPage*maxnum;k<(currectPage+1)*maxnum;k++){
                    obj.eq(k).show();
                }

            });
        }
    });
})();