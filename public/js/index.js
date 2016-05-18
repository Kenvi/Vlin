/**
 * Created by Kenvi on 2016/5/18.
 */

//轮播图
$('.carousel').carousel();

//百度地图

var map = new BMap.Map("baiduMap");		//在container容器中创建一个地图,参数container为div的id属性;
var point = new BMap.Point(113.394481,23.137036);	//创建点坐标
map.centerAndZoom(point, 22);				//初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom();				//激活滚轮调整大小功能
map.addControl(new BMap.NavigationControl());	//添加控件：缩放地图的控件，默认在左上角；
map.addControl(new BMap.MapTypeControl());		//添加控件：地图类型控件，默认在右上方；
map.addControl(new BMap.ScaleControl());		//添加控件：地图显示比例的控件，默认在左下方；
map.addControl(new BMap.OverviewMapControl());  //添加控件：地图的缩略图的控件，默认在右下方；


var marker = new BMap.Marker(point);		//创建标志物
marker.addEventListener("click",function(){	//为标注添加事件
    //点击标注后的事件
    if(confirm("删除覆盖物？"))
        map.removeOverlay(marker);			//删除覆盖物
});
map.addOverlay(marker);					//添加覆盖物

var opts = {							//创建信息窗口
    width :180,     // 信息窗口宽度
    height: 10,     // 信息窗口高度
    title : "天河区棠东毓桂大街1号1，2楼"  // 信息窗口标题
}
var infoWindow = new BMap.InfoWindow("广州微林园林绿化工程有限公司", opts);			// 创建信息窗口对象 在某个特定的位置创建一个信息窗口
map.openInfoWindow(infoWindow,new BMap.Point(113.394481,23.137036));    //在地图中央打开信息窗口

var polyline = new BMap.Polyline([								//折线
        new BMap.Point(113.394481,23.137036),
        new BMap.Point(113.394481,23.137036),
        new BMap.Point(113.394481,23.137036)],
    {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5}		//蓝色、宽度为6
);
map.addOverlay(polyline);

var icon = new BMap.Icon('pin.png',new BMap.Size(16,20),{anchor: new BMap.Size(10, 30)});