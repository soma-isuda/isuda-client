
var ComparePriceSpg= {

};

ComparePriceSpg.onLoad = function()
{
	alert("ComparePriceSpg onLoad");
	//document.getElementById("ComparePriceSpg").style.marginLeft="1460px";
	jQuery.extend(ComparePriceSpg,{
		anchor: {
			main : jQuery('#anchor_ComparePriceSpg')
		}
	});
	this.focus();

	$.ajax({
	    url: SERVER_ADDRESS + '/now',
	    type: 'GET',
	    dataType: 'json',
	    success: function (data) {
	        var tempIndex = 0;
	        var currentChannel = Player.getChannel();
	        alert('현재 채널 : ' + currentChannel);
	        $.each(data, function (key, value) {
	            if (tempIndex == currentChannel) {
	                var detailImgPath = SERVER_ADDRESS + '/pageShots/' + value.id + '.jpeg';
	                var tempString = "<img src='" + detailImgPath + "' alt ='이미지가 없습니다' id='detailImg' onerror='this.src=";
	                tempString += '"img/error.png"';//상품 상세 정보 이미지가 없을 때 나오는 메세지
	                tempString += "'/>";
	                jQuery('#detailImage').append(tempString);
	                jQuery.extend(DetailInfoSpg, {
	                    reserve: jQuery('#reserveButton').find('div'),
	                    image: jQuery('#detailImage')
	                });
	                //상품 이미지로 바로 포커스를 맞춘다.
	                DetailInfoSpg.image.addClass('focus');
	                DetailInfoSpg_index = 1;
	            }
	            tempIndex++;
	        });
	    }
	});

	$.ajax({
	    url: SERVER_ADDRESS + "/recommendedProducts",
	    type: 'GET',
        dataType:'json',
	    data: {
            id=
	    }
	})
};

var ComparePriceSpg_index =0;

ComparePriceSpg.focus = function(){ 
	alert("ComparePriceSpg.focus");
	ComparePriceSpg.anchor.main.focus();
	// focus initialize
	ComparePriceSpg_index =0;
	
};

ComparePriceSpg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

ComparePriceSpg.keyDown = function()
{
	alert("ComparePriceSpg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + ComparePriceSpg_index);
	
	switch(keyCode)
	{
	    case tvKey.KEY_EXIT:
	        widgetAPI.blockNavigation(event);
	        popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", ComparePriceSpg);
	        break;
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			//앱이 종료되는것을 방지해준다.
			widgetAPI.blockNavigation(event);
			alert("ComparePriceSpg_key : RETURN");
		case tvKey.KEY_LEFT:
			alert("ComparePriceSpg_key : Left");
			jQuery('#ComparePriceSpg').hide();//페이지를 닫는다.			
			SelectWatchPg.focus();

			break;
		case tvKey.KEY_RIGHT:
			alert("ComparePriceSpg_key : Right");
			break;
		case tvKey.KEY_UP:
			alert("ComparePriceSpg_key : Up");
			break;
		case tvKey.KEY_DOWN:
			alert("ComparePriceSpg_key : Down");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
			alert("ComparePriceSpg_key : Enter");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};