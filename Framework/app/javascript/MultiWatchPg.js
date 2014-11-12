
var productImg = ["dummy", "dummy", "#productImg0","#productImg1","#productImg2","#productImg3","#productImg4","#productImg5"];
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

MultiWatchPg.onLoad = function () {
    //로딩되기 전에 로딩중이라는 표시를 한다.
    jQuery('#mainItem').append('<div id="mainLoading">로딩중입니다</div>');

	cnt=-1;
	alert("MultiWatchPg.onLoad");
	alert("start : "+cnt);
	jQuery.ajax({
		url: SERVER_ADDRESS + '/now',
		type : 'GET',
		dataType : 'json',
		
		success: function (data) {
            //로딩중 표시를 지운다.

			alert("ajax : success");
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

				var priceBefore;
                var priceRefined = '';
				priceRefined = '';
                priceBefore = this.productPrice;
                if (priceBefore) {//가격 값이 null이 아니면
                    priceBefore = this.productPrice.toString();
                    for (var i = priceBefore.length; i > 0; i = i - 3) {
                        if (i == priceBefore.length)
                            priceRefined = priceBefore.substring(i, i - 3);
                        else
                            priceRefined =priceBefore.substring(i, i - 3) + ',' + priceRefined;
                    }
                    priceRefined += ' 원';
                }
                else//가격 값이 null 이면
                    priceRefined += '방송 중 확인';

                var tempString = '';
                tempString+='<li id="MultiWatchPgItem'+cnt+'" class="MultiWatchPgItem">';
                tempString += '	<div class="imgArea">';

                if(typeof this.id != 'number')//이수다홈쇼핑을 제외한 나머지들은 id가 문자열임
                    tempString += '		<img src="' + this.productImgURL + '" alt="" class="productImg">';
                else
                    tempString += '		<img src="' + SERVER_ADDRESS + '/pdImg/' + this.productImgURL + '" alt="" class="productImg">';

                tempString+='		<div></div>';
                tempString+='	</div>';
                tempString += '	<div class="productInfoArea">';
                if (typeof this.id != 'number')//이수다홈쇼핑을 제외한 나머지들은 id가 문자열임
                    tempString += '<img class="provider" src="img/provider/' + this.providerId + '.jpg" />';
                else//이수다홈쇼핑
                    tempString += '<img class="providerISUDA" src="img/provider/IS.png" />';

                tempString+='		<div class="price">';
                tempString+='			<p>최대 혜택가</p>';
                tempString+='			<p class="productPrice">' + priceRefined + '</p>';
                tempString+='		</div>';
                tempString += '		<div class="endTime">';
                if (typeof this.id != 'number')//이수다홈쇼핑을 제외한 나머지들은 id가 문자열임
                    tempString += '			<p id="remainedTime' + cnt + '" class="remainedTime"></p>';
                tempString+='		</div>';
                tempString+='		<div class="name">';
                tempString+='			<p>' +this.productName+ '</p>';
                tempString+='		</div>';
                tempString+='	</div>';
                tempString+='	<div>';
                tempString+='		<img src="img/moviefocus.PNG" alt="" id="productImg'+cnt+ '" class="focusImg multiWatchPgElem">';
                tempString+='	</div>';
                tempString+='</li>';

                
			    jQuery('#mainItem').find('ul').append(tempString);
			    
                var remainedTime = new Object();
                if (typeof this.id != 'number') {//이수다홈쇼핑을 제외한 나머지들은 id가 문자열임
					
					remainedTime.hour = (endTimeArr[cnt].hour-date.getHours()+9)%24;
					remainedTime.minute = endTimeArr[cnt].minute-date.getMinutes()-1;
					remainedTime.second = 59-date.getSeconds();

				    if(remainedTime.minute < 0){
						remainedTime.hour = remainedTime.hour-1;
						remainedTime.minute = 60 + remainedTime.minute;
					}
					document.getElementById('remainedTime'+cnt).innerHTML = remainedTime.hour+'시 '+remainedTime.minute+'분 '+ remainedTime.second+'초';
				}
			});
		    jQuery('#mainLoading').remove();
					
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
		//$("#MultiWatchPg").animate({"top": "-=280px"}, "fast");
	}
	//this.focus();
//	widgetAPI.sendReadyEvent();
	

};

var MultiWatchPg_index =2;

MultiWatchPg.focus = function(){ 
	alert("MultiWatchPg.focus");
	
	MultiWatchPg.anchor.main.focus();
	// focus initialize
	MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');
	$(productImg[MultiWatchPg_index]).css("display","block");
	setTimeout(function(){
		refresh = setInterval(function(){MultiWatchPg.remainedTime();},1000);
		//adjustChange = setInterval(function(){MultiWatchPg.adjustChange();},10000);
	},10);	

};

MultiWatchPg.remainedTime = function(){
	date = new Date();
	var i=0;
	//alert(date.getHours());
	for(i=0; i<5; i++){
	//alert(endTimeArr[0].hour+"c");
		var remainedTime = new Object();
		remainedTime.hour = (endTimeArr[i].hour-date.getHours()+9)%24;
		remainedTime.minute = endTimeArr[i].minute-date.getMinutes()-1;
		remainedTime.second = 59-date.getSeconds();

//		alert(remainedTime.hour+"시 "+ remainedTime.minute+ "분+ "+remainedTime.second)+"초";
		if((remainedTime.hour == 0)&&(remainedTime.minute == 0 )&&(remainedTime.second == 0 )) {
			alert("refresh Item");
			refresh=1;
			MultiWatchPg.onLoad();

			break;
		}
		
		if(remainedTime.minute < 0){
			remainedTime.hour = remainedTime.hour-1;
			remainedTime.minute = 60 + remainedTime.minute;
		}
		document.getElementById('remainedTime'+i).innerHTML = remainedTime.hour+'시 '+remainedTime.minute+'분 '+ remainedTime.second+'초';
	
	}
};
MultiWatchPg.adjustChange = function(){
	$('#adjust').css('background-image','url("'+adjustArr[++adjust_index]+'")');
	//document.getElementById("adjust").style.background.image=adjustArr[++adjust_index];
	if(adjust_index == adjustArr.length-1){
		adjust_index=-1;
	}
};


MultiWatchPg.keyDown = function()
{
	console.log("page : " + page_index);
	//popupMessage("hi");
	alert("MultiWatchPg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + MultiWatchPg_index);
	$('#adfocusImg').css("display","none");
	switch(keyCode)
	{	
		case tvKey.KEY_EXIT:
			widgetAPI.blockNavigation(event);
			popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?",MultiWatchPg);
			break;
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("MultiWatchPg_key : RETURN");
			//앱이 종료되는것을 방지해준다.
			widgetAPI.blockNavigation(event);
			MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
			$(productImg[MultiWatchPg_index]).css("display","none");
			clearInterval(refresh);
			clearInterval(adjustChange);
			Main.focus();
			break;
		case tvKey.KEY_LEFT:
			alert("MultiWatchPg_key : Left");
			//기존에 활성화된 속성 지우기
			$(productImg[MultiWatchPg_index]).css("display","none");
			MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
			// 가장 왼쪽 것들이면 사이드바로
			if(MultiWatchPg_index == 0 || MultiWatchPg_index == 2 || MultiWatchPg_index == 5){
				//focus move to sideBar
				clearInterval(refresh);
				Main.focus();
			}
			//그게 아니면 이전 것들 활성화 속성 추가
			else
			{
				$(productImg[--MultiWatchPg_index]).css("display","block");
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("MultiWatchPg_key : Right");
			//기존에 활성화된 속성 지우기
			$(productImg[MultiWatchPg_index]).css("display","none");
			MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
			//4 7 1 일 경우, 7일 경우 -1로 초기화
			if(MultiWatchPg_index == 7){
				MultiWatchPg_index = -1;
			}
			$(productImg[++MultiWatchPg_index]).css("display","block");
			MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');			
			break;
		case tvKey.KEY_UP:
			alert("MultiWatchPg_key : Up");
			$(productImg[MultiWatchPg_index]).css("display","none");
			MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
			//2는 0으로 3 4는 1로
			//5 6 7 은 -3씩
			//0 1 은 +5씩 		
			if(MultiWatchPg_index<2){
				MultiWatchPg_index += 5;	
			}
			else{
				if (MultiWatchPg_index == 2){
					MultiWatchPg_index = 0;
				}
				else if (MultiWatchPg_index  < 5){
					MultiWatchPg_index = 1;
				}
				else
					MultiWatchPg_index -= 3;
			}
			$(productImg[MultiWatchPg_index]).css("display","block");
			MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');						
			break;
		case tvKey.KEY_DOWN:
			//$("#sideBar").animate({"top": "-=250px"}, "fast");
			alert("MultiWatchPg_key : Down");
			$(productImg[MultiWatchPg_index]).css("display","none");
			MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
			//2 3 4 는 +3씩
			//5는 0으로 6 7은 1로
			//0 1은 +2씩
			if(MultiWatchPg_index < 2){
				MultiWatchPg_index += 2;
			}		
			else{
				if(MultiWatchPg_index == 5){
					MultiWatchPg_index = 0;
				}
				else if(MultiWatchPg_index > 5){
					MultiWatchPg_index = 1;
				}
				else{
					MultiWatchPg_index+=3;
				}
			}
			$(productImg[MultiWatchPg_index]).css("display","block");
			MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');						

			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPgㄴ
			if ( MultiWatchPg_index==0){ 
				popupMessage("쿠폰이 발급<br>되었습니다.");
			}	
			else if ( MultiWatchPg_index==1){
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				// 사이드바의 셀렉트를 선택보기로 바꾼다.
				Main.menu.btn.eq(page_index).removeClass('select');
//				$("#sideBarMenuImg"+page_index).attr('src',sideBarMenuImgArr[page_index]);
				Main.menu.btn.eq(++page_index).addClass('select');
//				$("#sideBarMenuImg"+page_index).attr('src',sideBarMenuImgArr[(page_index+8)]);
				
				Main.layout.page.load(pagearr[page_index].html, function (response, status, xhr) {
				    //html로드가 성공하면 SelectWatchPg.onLoad함수를 홈출하다. 인자로 해당 방송을 볼수 있게
				    if (status == "success") { 
				        pagearr[page_index].object.onLoad(5);
	                    SelectWatchPg.focus();
		                if(Math.random()<0.1)
		                    popupMessage("축<br> 이벤트에 당첨!");
		                else
		                    popupMessage("꽝<br> 너무 안타까워");
			            
				    }
				});
				clearInterval(refresh);
				focusCurrent = "SelectWatchPg";
			}		
			else if (MultiWatchPg_index>=2) {
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				// 사이드바의 셀렉트를 선택보기로 바꾼다.
				Main.menu.btn.eq(page_index).removeClass('select');
//				$("#sideBarMenuImg"+page_index).attr('src',sideBarMenuImgArr[page_index]);
				Main.menu.btn.eq(++page_index).addClass('select');
//				$("#sideBarMenuImg"+page_index).attr('src',sideBarMenuImgArr[(page_index+8)]);
				
				Main.layout.page.load(pagearr[page_index].html, function (response, status, xhr) {
				    //html로드가 성공하면 SelectWatchPg.onLoad함수를 홈출하다. 인자로 해당 방송을 볼수 있게
				    if (status == "success") { 
				        pagearr[page_index].object.onLoad(MultiWatchPg_index - 2);
	                    SelectWatchPg.focus();
				    }
				});
				clearInterval(refresh);
				focusCurrent = "SelectWatchPg";
			};
			alert("MultiWatchPg_key : Enter");
			break;
		default:
			alert("Unhandled key");
			break;
	}

};