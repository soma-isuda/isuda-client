popupMessage = function(message){
    alert("PopUp m!!");
    jQuery('#popup').empty();//기존의 메세지들을 일단 지운다.
	jQuery('#popup').append('<div id="popupMessage">'+message+'</div>');
	$('#popupMessage').css("display","block");
	setTimeout(function(){
		jQuery('#popup').empty();
	},2000);
};


var adjustState =false;
var adjustTimeout; // clearTimeout
popupAdjust = function(){
    alert("PopUp a!!");
    jQuery('#popup').empty();//기존의 메세지들을 일단 지운다.
    var tempString='';
    tempString += '<div id="popupAdjust">';
    tempString += '	<div id="adjustImg">';
    tempString += '		<img src="img/adjust.png" style="max-width: 100%; max-heigh: 100%;">';
    tempString += '	</div>';
    tempString += '	<div id="adjustFooter">';
    tempString += '		<div id="adjustFooterButton">&nbsp&nbspA&nbsp&nbsp </div>';
    tempString += '		<div>상세페이지</div>';
    tempString += '	</div>';
    tempString += '</div>';
	jQuery('#popup').append(tempString);
	adjustState = true;
	$('#popupAdjust').css("display","inline");
	adjustTimeout = setTimeout(function(){
		jQuery('#popup').empty();
		adjustState = false;
	},60000);
};
popupAdjustFull = function(){
    alert("PopUp a!!");
    jQuery('#popup').empty();//기존의 메세지들을 일단 지운다.
    clearTimeout(adjustTimeout);
    var tempString='';
    tempString += '<div id="popupAdjustFull">';
    tempString += '		<img src="img/adjustFull.png" width="100%" height="100%">';
    tempString += '</div>';
	jQuery('#popup').append(tempString);
	$('#popupAdjustFull').css("display","inline");
	focusBack = SelectWatchPg;

	jQuery('#anchor_popup').focus();
	// $('#popupAdjust').animate({height: "-=288px"},slow);
};
var popup_index;
var focusBack;
popupMessageButton = function(message, returnFocus){
	alert("PopUp b!!");
	focusBack = returnFocus;
	jQuery('#popup').empty();
	var tempString='';
	tempString += '<div id="popupMessageButton">		';
	tempString += '		<div>'+message+'</div>';
	tempString += '		<div id="popupBtn1" class ="popupBtn">확인</div>	';
	tempString += '		<div id="popupBtn2" class ="popupBtn">취소</div>   ';
	tempString += '</div>								';
	jQuery('#popup').append(tempString);
	$('#popupMessageButton').css("display","block");
	
    popup_index=0;
	jQuery('#anchor_popup').focus();
	jQuery('.popupBtn').eq(1).removeClass('focus');
	jQuery('.popupBtn').eq(popup_index).addClass('focus');	
};
popupkeyDown = function(){
	var keyCode = event.keyCode;
	alert("popup keyDown");
	//jQuery('.popupBtn').addClass('focus');
	switch(keyCode) {	
		case tvKey.KEY_LEFT:
		case tvKey.KEY_RIGHT:
			jQuery('.popupBtn').eq(popup_index).removeClass('focus');
			if(popup_index==0)
				jQuery('.popupBtn').eq(++popup_index).addClass('focus');
			else
				jQuery('.popupBtn').eq(--popup_index).addClass('focus');
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			if(popup_index==0)
				widgetAPI.sendExitEvent();
			else
				focusBack.focus();
				jQuery('#popup').empty();
			break;
		case tvKey.KEY_EXIT:
			widgetAPI.blockNavigation(event);
			if(adjustState == true){
				adjustState = false;
				popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", SelectWatchPg);
			}
			else widgetAPI.sendExitEvent();
			break;
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			adjustState = false;
			widgetAPI.blockNavigation(event);
			focusBack.focus();
			jQuery('#popup').empty();
			break;
		default:
			alert("Unhandled key");
			break;
	}

};