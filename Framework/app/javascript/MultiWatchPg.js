var productImg = ["dummy","dummy","#productImg0","#productImg1","#productImg2","#productImg3","#productImg4","#productImg5"];
var MultiWatchPgItem = ["#MultiWatchPgItem0","#MultiWatchPgItem1","#MultiWatchPgItem2","#MultiWatchPgItem3","#MultiWatchPgItem4","#MultiWatchPgItem5"];
var color = ["#00a9e0","#f4811f","#e51937","#cadb2a","#e4010d","#f4614d"];
var cnt=-1;
var date = new Date();
var refresh =0;
var MultiWatchPg= {
	
};
var endTimeArr = ["1","1","1","1","1","1"];
//var endTime = {
//	hour : 0,
//	minute : 0
//};

MultiWatchPg.onLoad = function(){	
	alert("MultiWatchPg.onLoad");
	alert("start : "+cnt);
	jQuery.ajax({
		url: SERVER_ADDRESS + '/productInfo',
		type : 'GET',
		dataType : 'json',
		success : function (data) {
			$.each(data, function() {
				if (++cnt >5) {
					alert("end : "+cnt);
					return false;
				};
				var productEndTime = this.productEndTime;
				var exitTime = productEndTime.split(/[-T:\.Z]/);
				var endTime = new Object();
				endTime.hour = exitTime[3];//-date.getHours();
				endTime.minute = exitTime[4];//-date.getMinutes();
				endTimeArr[cnt] = endTime;
				alert("ing : "+cnt);
			    jQuery('#mainItem').find('ul').append('<li id="MultiWatchPgItem'+cnt+'" class="MultiWatchPgItem"><div class="imgArea"><img src="' +this.productImgURL+ '" alt="" class="productImg"></div><div class="productInfoArea"><div class="endTime"><p>방송 혜택 종료까지</p><p id="remainedTime' + cnt + '" class="remainedTime"><p></p></div><div class="name"><p>' +this.productName+ '</p></div><div class="price"><p>최대 혜택가 :</p><p class="productPrice">' + this.productPrice + '원 </p></div></div><div><img src="img/moviefocus.PNG" alt="" id="productImg'+cnt+ '" class="focusImg multiWatchPgElem"></div></li>');
			    var remainedTime = new Object();
				
				remainedTime.hour = endTimeArr[cnt].hour-date.getHours()-1;
				if(remainedTime.hour <0)
					remainedTime.hour = 24 + remainedTime.hour;
				
				remainedTime.minute = endTimeArr[cnt].minute-date.getMinutes()-1;
				if(remainedTime.minute < 0)
					remainedTime.minute = 60 + remainedTime.minute;
				
				remainedTime.second = 60-date.getSeconds();
			   document.getElementById('remainedTime'+cnt).innerHTML = remainedTime.hour+' : '+remainedTime.minute+' : '+ remainedTime.second;
			    $(MultiWatchPgItem[cnt]).css('background-color',color[cnt]);
			});					
		} 	
	});		
	//alert(endTimeArr[0].hour+"b");
	jQuery.extend(MultiWatchPg,{
		MultiWatchPgElem : jQuery('.MultiWatchPgElem'),
		anchor:{
			main	: jQuery('#anchor_MultiWatchPg'),
		}
		//focus: 0
	});

	//this.focus();
	
	
};

var MultiWatchPg_index =0;

MultiWatchPg.focus = function(){ 
	alert("MultiWatchPg.focus");
	
	MultiWatchPg.anchor.main.focus();
	// focus initialize
	MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');
	$(productImg[MultiWatchPg_index]).css("display","block");
	setTimeout(function(){
		refresh = setInterval(function(){MultiWatchPg.remainedTime();},1000);
	},100);	
};

MultiWatchPg.remainedTime = function(){
	date = new Date();
	var i=0;
	
	for(i=0; i<6; i++){
	//alert(endTimeArr[0].hour+"c");
		var remainedTime = new Object();
		remainedTime.hour = endTimeArr[i].hour-date.getHours()-1;
		if(remainedTime.hour <0)
			remainedTime.hour = 24 + remainedTime.hour;
		
		remainedTime.minute = endTimeArr[i].minute-date.getMinutes()-1;
		if(remainedTime.minute < 0)
			remainedTime.minute = 60 + remainedTime.minute;
		
		remainedTime.second = 60-date.getSeconds();
		if((remainedTime.hour <= 0)&&(remainedTime.minute <=0 )&&(remainedTime.second <=0)) MultiWatchPg.onLoad();
		document.getElementById('remainedTime'+i).innerHTML = remainedTime.hour+' : '+remainedTime.minute+' : '+ remainedTime.second;
	
	}
};

MultiWatchPg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

MultiWatchPg.keyDown = function()
{
	alert("MultiWatchPg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + MultiWatchPg_index);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("MultiWatchPg_key : RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("MultiWatchPg_key : Left");
			if((MultiWatchPg_index==0)||(MultiWatchPg_index==2)||(MultiWatchPg_index==5)){ //이게 빠른지 3으로 나눈 나머지가 0인경우가 빠른지 모르겠다.
				//focus move to sideBar
				MultiWatchPg.anchor.main.removeClass('focus');
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				$(productImg[MultiWatchPg_index]).css("display","none");
				clearInterval(refresh);
				Main.focus();
			}
			else if(MultiWatchPg_index==1){
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				MultiWatchPg.MultiWatchPgElem.eq(--MultiWatchPg_index).addClass('focus');
			}
			else{
				$(productImg[MultiWatchPg_index]).css("display","none");
				$(productImg[--MultiWatchPg_index]).css("display","block");
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("MultiWatchPg_key : Right");
			if(MultiWatchPg_index<1){
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				MultiWatchPg.MultiWatchPgElem.eq(++MultiWatchPg_index).addClass('focus');
			}
			else if(MultiWatchPg_index>1){
				$(productImg[MultiWatchPg_index]).css("display","none");
				if(MultiWatchPg_index == 7){
					MultiWatchPg_index = 1;
				}
				$(productImg[++MultiWatchPg_index]).css("display","block");
			}
			break;
		case tvKey.KEY_UP:
			alert("MultiWatchPg_key : Up");
			if(MultiWatchPg_index<2){
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				$("#MultiWatchPg").animate({"top": "-=250px"}, "fast");
				MultiWatchPg_index += 6;
				$(productImg[MultiWatchPg_index]).css("display","block");
			}
			else{
				$(productImg[MultiWatchPg_index]).css("display","none");
				MultiWatchPg_index -= 3;
				if (MultiWatchPg_index<2) {
					if (MultiWatchPg_index <0) 
						MultiWatchPg_index=0;
					$("#MultiWatchPg").animate({"top": "+=250px"}, "fast");
					MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');
				}
				else{
					$(productImg[MultiWatchPg_index]).css("display","block");
				}
			}
			break;
		case tvKey.KEY_DOWN:
			//$("#sideBar").animate({"top": "-=250px"}, "fast");
			alert("MultiWatchPg_key : Down");
			if(MultiWatchPg_index<=1){
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				MultiWatchPg_index = MultiWatchPg_index+3;
				$(productImg[MultiWatchPg_index]).css("display","block");
				$("#MultiWatchPg").animate({"top": "-=250px"}, "fast");
			}
			else if(MultiWatchPg_index>1){
				$(productImg[MultiWatchPg_index]).css("display","none");
				if(MultiWatchPg_index >4)
					MultiWatchPg_index -= 6;
				MultiWatchPg_index += 3;
				$(productImg[MultiWatchPg_index]).css("display","block");
			}
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
			if (MultiWatchPg_index>=3) {
				MultiWatchPg.anchor.main.removeClass('focus');
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				Main.sideBarMenu.btn.eq(page_index).removeClass('focus');
				Main.sideBarMenu.btn.eq(++page_index).addClass('focus');
				Main.layout.page.load(pagearr[page_index].html);
				setTimeout(function(){
					pagearr[page_index].object.onLoad(MultiWatchPg_index-2);
				},10);

			};
			alert("MultiWatchPg_key : Enter");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};