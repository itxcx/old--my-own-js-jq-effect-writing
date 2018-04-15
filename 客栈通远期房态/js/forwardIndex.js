//调用区域
$(function(){
    //高度自适应
    $('.main').heightAdapt();
    //头部,表格主体宽度自适应
    $('.tableTop').add('.tableBody').widthAdapt();
    //表格主体高度自适应
    $('.tableBody').heightAdapt();
    //左侧高度自适应
    $('.rooms').heightAdapt();
    //左侧房间ajax
    leftRoomsAjax();
    //头部日期ajax
    topDateAjax();
    //body主体滚动条拖动
    bodyScroll();
})
//定义区域
//高度自适应
$.fn.heightAdapt=function(){
    var that=this;
    function inner(){
        var winHeight=$(window).height();
        var top=that[0].offsetTop;
        that.height(winHeight-top);
    }
    inner();
    window.addEventListener('resize',inner);
    return this;
}
//宽度自适应
$.fn.widthAdapt=function(){
    var that=this;
    function inner(){
        var winWidth=$(window).width();
        var left=that[0].offsetLeft;
        that.width(winWidth-left);
    }
    inner();
    window.addEventListener('resize',inner);
    return this;
}
//ajax通用
function doAjax(url,type,data,dataType,beforeSend,success){
    $.ajax({
        url:url,
        type:type,
        data:data,
        dataType:dataType,
        beforeSend:beforeSend,
        success:success,
        error:function(){console.log('ajax失败')}
    })
}
//左侧房间ajax
var yLength=0;
function leftRoomsAjax(){
    doAjax('json/getRoomTypes.json','post',null,'json',null,success);
    function success(data){
        var html='',ul=$('.roomsUl');
        for(var i=0;i<data.data.roomTypeList.length;i++){
            html += '<li class="roomsLi"><div class="roomName">' + data.data.roomTypeList[i].roomTypeName + '</div><div class="roomNo"></div></li>'
        }
        ul.html(html);
        //左侧房间号
        doAjax('json/getRooms.json','post',null,'json',null,innerSuccess);
        function innerSuccess(data1){
            var roomNo=$('.roomNo');
            //循环房号
            for(var j=0;j<data1.data.roomList.length;j++) {
                //循环ajax1的房型
                for(k=0;k<data.data.roomTypeList.length;k++){
                    if(data1.data.roomList[j].roomTypeName==data.data.roomTypeList[k].roomTypeName){
                        roomNo.eq(k).append('<span class="roomSpan">'+data1.data.roomList[j].doorNo+'</span>');
                    }
                }
            }
            //调整$('.roomName')高度和行高
            var roomName=$('.roomName');
            for(g=0;g<roomName.length;g++){
                var h=roomName.eq(g).siblings('.roomNo').height();
                roomName.eq(g).css({"height":h,"lineHeight":h+'px'});
            }
            yLength=data1.data.roomList.length;
            //表格主体
            bodyTable();
        }
    }
}
//头部日期ajax
var xLength=0;
function topDateAjax(){
    doAjax('json/getHotelInventories.json','post',null,'json',null,success);
    function success(data){
        var html='',ul=$('.topUl');
        for(var i=0;i<data.data.hotelInventoriesList.length;i++){
            html+='<li class="topLi"><span class="date1">'+headDay(data.data.hotelInventoriesList[i].date)+'</span><span class="nums">剩'+data.data.hotelInventoriesList[i].count+'间</span></li>'
        }
        ul.html(html);
        ul.width($('.topLi').eq(0).outerWidth(true)*data.data.hotelInventoriesList.length);
        xLength=data.data.hotelInventoriesList.length;
        //表格主体
        bodyTable();
    }
}
//头部日期处理
function headDay(date){
    var day=['日','一','二','三','四','五','六'];
    var fir=date.substring(date.indexOf('-')+1);
    var sec=day[new Date(date).getDay()];
    var html='';
    html=fir+sec;
    return html;
}
//body主体滚动条拖动
function bodyScroll(){
    //h
    var tableBody=$('.tableBody');
    var top=$('.topUl');
    //z
    var leftP=$('.rooms');
    var left1=$('.roomsUl');
    tableBody.scroll(function(){
        //横向
        var topWidth=top.width()-$('.tableTop').width();
        var left = this.scrollLeft;
        var nega=$('.bodyInner').width()-tableBody.width();
        top.css({"left":-topWidth*(left/nega)});
        //纵向
        var leftBasic=left1.height()-leftP.height();
        var top1 = this.scrollTop;
        var nega1=$('.bodyInner').height()-tableBody.height();
        left1.css({"top":-leftBasic*(top1/nega1)});
    })
}
//表格主体
function bodyTable(){
    var bodyWrap=$('.bodyInner');
    var width=$('.topUl').width();
    var height=$('.roomsUl').height();
    var bodyUl=$('.bodyUl');
    bodyWrap.width(width);
    bodyWrap.height(height);
    bodyUl.html();
    var html='<li class="bInnerLi"><div class="greenF"><span>三人房</span><span>401</span><span>¥130</span></div><div class="selectCell cellBg" ready="no"></div></li>';
    for(var i=0;i<xLength*yLength;i++){
        bodyUl.append(html);
    }
    //表格鼠标悬停获取 行号列号
    tableRowCol();
    //表格按住拖动效果
    tableDrag();
    //房间拖动改变日期 测试
    roomChangeDate();
}
//根据序号得到行号
function getColNo(a){
    return Math.ceil((a+1)%xLength);
}
//根据序号得到列号
function getRowNo(a){
    return Math.ceil((a+1)/xLength);
}
//表格鼠标悬停获取 行号列号
function tableRowCol(){
    var bInnerLi=$('.bInnerLi');
    var rowNo=0;
    var colNo=0;
    var index=0;
    bInnerLi.mouseover(function(){
        index=$(this).index();
        colNo=getRowNo($(this).index());
        rowNo=getColNo($(this).index());
        //$('.greenF')显示
        $('.greenF').hide();
        $(this).find('.greenF').show();
        //使这单元格的所在行列改变class
        //所在行单元格
        bInnerLi.removeClass('blue');
        for(var i=xLength*(colNo-1);i<xLength*colNo;i++){
            bInnerLi.eq(i).addClass('blue');
        }
        //所在列单元格
        for(var j=0;j<bInnerLi.length;j++){
            if((xLength+j)%xLength==rowNo){
                bInnerLi.eq(j-1).addClass('blue');
            }
        }
    })
    //移出框时 消失
    $('.tableBody').mouseleave(function(){
        bInnerLi.removeClass('blue');
        $(this).find('.greenF').hide();
    })
}
//表格按住拖动效果
function tableDrag(){
    var bInnerLi=$('.bInnerLi');
    bInnerLi.mousedown(function(e){
        var e=e||window.event;
        //起始坐标
        // var startX=e.pageX;
        // var startY=e.pageY;
        var startIndex=$(this).index();
        // var liWidth=$(this).outerWidth(true);
        alter($(this));
        //greenF selectCell框交替
        function alter(a){
            if(a.find('.selectCell').css('display')=='none'){
                a.find('.selectCell').show().attr("ready","yes");
            }
            else{
                a.find('.selectCell').hide().attr("ready","no");
            }
        }
        $(document).mousemove(function(e){
            var e=e||window.event;
            //逻辑变量
            // var logic
            e.preventDefault();
            e.returnValue=false;
            //结束坐标
            // var endX=e.pageX;
            // var endY=e.pageY;
            // console.log(e.target);
            // console.log($(e.target));
            // console.log('x'+e.pageX);
            // console.log('y'+e.pageY);
            // console.log(Math.ceil((endX-startX)/liWidth));
            if($(e.target).hasClass('bInnerLi')){
                var endIndex=$(e.target).index();
                // console.log('start'+startIndex);
                // console.log('end'+endIndex);
                var startRow=getRowNo(startIndex);
                var startCol=getColNo(startIndex);
                var endRow=getRowNo(endIndex);
                var endCol=getColNo(endIndex);
                // console.log('startRow'+startRow);
                // console.log('startCol'+startCol);
                // console.log('endRow'+endRow);
                // console.log('endCol'+endCol);

                //循环单元格----------
                //startRow endRow
                var rsp=Math.abs(startRow)<Math.abs(endRow)?startRow:endRow;
                var rep=Math.abs(startRow)<Math.abs(endRow)?endRow:startRow;
                var csp=Math.abs(startCol)<Math.abs(endCol)?startCol:endCol;
                var cep=Math.abs(startCol)<Math.abs(endCol)?endCol:startCol;

                for(var i=rsp;i<=rep;i++){
                    for(var j=(i-1)*xLength+csp-1;j<=(i-1)*xLength+cep-1;j++){
                        if(bInnerLi.eq(j).find('.selectCell').attr("ready")=="no"){
                            bInnerLi.eq(j).find('.selectCell').show().attr("ready","yes");
                        }
                    }
                }
            }
        });
        $(document).mouseup(function(){
            $(document).off('mousemove mouseup');
        })
    })
}
//房间拖动改变日期 测试
function roomChangeDate(){
    var roomsPo=$('.roomsPo');
    doAjax('json/getStayInfo.json','post',null,'json',null,success);
    function success(data){
        // console.log(data);
        //到时候根据坐标单元格定位房间 看原网页
        //我这边做拖动效果
        var html='<div class="greenF" style="display: none;"><span>三人房</span><span>401</span><span>¥130</span></div>';
        roomsPo.append(html);
    }
}