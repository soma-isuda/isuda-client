var productImg = ["dummy","dummy","#productImg0","#productImg1","#productImg2","#productImg3","#productImg4","#productImg5"];
var MultiWatchPgItem = ["#MultiWatchPgItem0","#MultiWatchPgItem1","#MultiWatchPgItem2","#MultiWatchPgItem3","#MultiWatchPgItem4","#MultiWatchPgItem5"];
var color = ["#00a9e0","#cadb2a","#f4614d","#e4010d","#e51937","#f4811f"];
var cnt=-1;
var date = new Date();
var refresh =0;
var adjust_index =0;
var MultiWatchPg= {
	
};
var endTimeArr = ["1","1","1","1","1","1"];
//var endTime = {
//	hour : 0,
//	minute : 0
//};

MultiWatchPg.onLoad = function(){
	cnt=-1;
	alert("MultiWatchPg.onLoad");
	alert("start : "+cnt);
	jQuery.ajax({
		url: SERVER_ADDRESS + '/now',
		type : 'GET',
		dataType : 'json',
		success : function (data) {
			jQuery('#mainItem').find('ul').empty();
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
				
				remainedTime.hour = endTimeArr[cnt].hour-date.getHours()-1+7;
			 	// alert("-----------------");
			 	// alert(endTimeArr[cnt].hour);
			 	// alert(date.getHours());
			 	// alert(remainedTime.hour);
			 	// alert("-----------------");
				if(remainedTime.hour <0)
					remainedTime.hour = remainedTime.hour +24;
				else if(remainedTime.hour >=24)
					remainedTime.hour = remainedTime.hour -24;
				
				remainedTime.minute = endTimeArr[cnt].minute-date.getMinutes()-1;
				if(remainedTime.minute < 0)
					remainedTime.minute = 60 + remainedTime.minute;
				
				remainedTime.second = 59-date.getSeconds();
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
	if(refresh==1){
		alert("load refresh");
		setTimeout(function(){
			MultiWatchPg.focus();
		},100);	
		refresh=0;
	}
	else if((MultiWatchPg_index>1)){
		$("#MultiWatchPg").animate({"top": "-=250px"}, "fast");
	}
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
		adjustChange = setInterval(function(){MultiWatchPg.adjustChange();},10000);
	},10);	

};

MultiWatchPg.remainedTime = function(){
	date = new Date();
	var i=0;
	//alert(date.getHours());
	for(i=0; i<6; i++){
	//alert(endTimeArr[0].hour+"c");
		var remainedTime = new Object();
		remainedTime.hour = endTimeArr[i].hour-date.getHours()-1+7;
		remainedTime.minute = endTimeArr[i].minute-date.getMinutes()-1;
		remainedTime.second = 59-date.getSeconds();

		alert(remainedTime.hour+" : "+ remainedTime.minute+ " : "+remainedTime.second);
		if((remainedTime.hour == 0)&&(remainedTime.minute == 0 )&&(remainedTime.second == 0 )) {
			alert("refresh Item");
			refresh=1;
			MultiWatchPg.onLoad();

			break;
		}
		if(remainedTime.hour <0)
			remainedTime.hour = remainedTime.hour +24;
		else if(remainedTime.hour >=24)
			remainedTime.hour = remainedTime.hour -24;
		if(remainedTime.minute < 0)
			remainedTime.minute = 60 + remainedTime.minute;
		document.getElementById('remainedTime'+i).innerHTML = remainedTime.hour+' : '+remainedTime.minute+' : '+ remainedTime.second;
	
	}
};
MultiWatchPg.adjustChange = function(){
	$('#adjust').css('background-image','url("'+adjustArr[++adjust_index]+'")');
	//document.getElementById("adjust").style.background.image=adjustArr[++adjust_index];
	if(adjust_index == adjustArr.length-1){
		adjust_index=-1;
	}
}
MultiWatchPg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

MultiWatchPg.keyDown = function()
{
	alert("MultiWatchPg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + MultiWatchPg_index);
	$('#adfocusImg').css("display","none");
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("MultiWatchPg_key : RETURN");
			//앱이 종료되는것을 방지해준다.
			widgetAPI.blockNavigation(event);
			MultiWatchPg.anchor.main.removeClass('focus');
			MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
			$(productImg[MultiWatchPg_index]).css("display","none");
			clearInterval(refresh);
			clearInterval(adjustChange);
			Main.focus();
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
				$('#adfocusImg').css("display","block");
			}
			else if(MultiWatchPg_index==1){
				alert("adjust.length : "+adjustArr.length+" index :"+adjust_index);
				$('#adfocusImg').css("display","block");
				$('#adjust').css('background-image','url("'+adjustArr[++adjust_index]+'")');
				//document.getElementById("adjust").style.background.image=adjustArr[++adjust_index];
				if(adjust_index == adjustArr.length-1){
					adjust_index=-1;
				}
			}
			else {
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
					if(MultiWatchPg_index ==1)
						$('#adfocusImg').css("display","block");
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
			if (MultiWatchPg_index>=2) {
				MultiWatchPg.anchor.main.removeClass('focus');
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				Main.sideBarMenu.btn.eq(page_index).removeClass('focus');
				$("#sideBarMenuImg"+page_index).attr('src',sideBarMenuImgArr[page_index]);
				Main.sideBarMenu.btn.eq(++page_index).addClass('focus');
				$("#sideBarMenuImg"+page_index).attr('src',sideBarMenuImgArr[(page_index+5)]);
				Main.layout.page.load(pagearr[page_index].html);
				clearInterval(refresh);
				focusCurrent = "SelectWatchPg";
				setTimeout(function(){
					pagearr[page_index].object.onLoad(MultiWatchPg_index-2);
					SelectWatchPg.focus();
				},10);
			};
			alert("MultiWatchPg_key : Enter");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};