$(function(){
  //ul
  var ul = $(".list_wrap ul");
  var html = '';
  var a = $.ajax({
   url:"jsons/index_list.json",
   type:"get",
   dataType:"json",
   error:function(){alert("失败了")},
   success:function(res){
                        $.each(res,function(i,d){
//console.log(d);
//console.log(d.title);
    html +='<li><h3>'+d.title+'</h3><img src="'+d.src+'"/><p>'+d.des+'</p><div><span class="fl">价格</span><span class="fr">'+d.price+'</span></div></li>'
});
ul.html(html);
                         }
                 });  

})