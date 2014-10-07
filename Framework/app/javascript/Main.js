var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var SERVER_ADDRESS_IN = 'http://172.16.100.171:3000';
var SERVER_ADDRESS_OUT = 'http://61.43.139.145:3000';
var SERVER_ADDRESS = SERVER_ADDRESS_IN;
var PHP_SERVER_ADDRESS_IN = 'http://172.16.100.171';
var PHP_SERVER_ADDRESS_OUT = 'http://61.43.139.145';
var PHP_SERVER_ADDRESS = PHP_SERVER_ADDRESS_IN;
// pagearr : information about pages in pageinfo
var page_index = 1;
var subPage_index = 1;//현재 열려있는 서브 페이지의 넘버
//0:상세보기 서브페이지
//1:가격비교 서브페이지
//2:SMS공유 서브페이지
//3:번호선택 서브페이지


//var sideBarMenuImg = $(".sideBarMenuImg img");

var Main =
{
	layout:{
		sideBar : jQuery('#sideBar'),
		page	: jQuery('#article'),
		subPage : jQuery('#subPage')
		//popUp   : jQuery('#popup')
	},
	sideBarMenu:{
		btn : jQuery('#sideBar').find('ul > li')
	},
	anchor:{
//		menu	: jQuery('#menu'),
		main	: jQuery('#anchor_main'),
		subPage : jQuery('#anchor_subPage'),
		popUp 	: jQuery('#anchor_popup')
	},
	focus: 0	
};

Main.onLoad = function()
{
	alert("Main.onLoad");
	//alert(sideBarMenuImg.length);
	Main.layout.page.load(pagearr[page_index].html);
	setTimeout(function(){
				pagearr[page_index].object.onLoad();
			},10);		
	// Enable key event processing
	this.focus();
	//Main.layout.popUp.load('app/html/popUp.html');
	Player.hide();
	widgetAPI.sendReadyEvent();
	alert('Main_onLoad completed');

};

Main.focus = function()
{
//	Main.layout.page.load(pagearr[page_index].html);	

	Main.anchor.main.focus();
	Main.layout.sideBar.addClass('focus');
	$("#sideBarMenuImg"+page_index).attr('src',sideBarMenuImgArr[page_index+5]);
	Main.sideBarMenu.btn.eq(page_index).removeClass('select');
	Main.sideBarMenu.btn.eq(page_index).addClass('focus');
	$("#sideBar").css("width","460px");
	$(".sideBarMenuText").css("display","block");
	document.getElementById("article").style.marginLeft="460px";
//	document.getElementById("article").style.marginLeft="430px";	
};

Main.returnFocusFromPage = function()
{
	Main.anchor.main.focus();
	Main.layout.sideBar.addClass('focus');
	Main.sideBarMenu.btn.eq(page_index).addClass('focus');
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;

	// page가 바뀌면 카운트 값을 초기화하여 모아보기 페이지로 갈 떄 다시 상품데이터 로드
	// 이 if가 없으면 한번만 로드하고 다시 모아보기 페이지로 갈 때 상품을 로드 하지 않는다.
	if(page_index != 1)
		cnt=-1;
	alert("Main");
	
	switch(keyCode)
	{
		case tvKey.KEY_EXIT:
			//widgetAPI.sendExitEvent();
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("main_key : Return");
			//widgetAPI.sendReturnEvent();
			widgetAPI.blockNavigation(event);
			popupMessage("스마트 홈쇼핑을<br>종료합니다. <br><br>행복한 하루 되세요.");
			// setTimeout(function(){
			// 	widgetAPI.sendExitEvent();
			// },2000);
			popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?",Main);
			
			break;
			
		case tvKey.KEY_UP:
			alert("main_key : Up");
			Main.sideBarMenu.btn.eq(page_index).removeClass('focus');
			$("#sideBarMenuImg"+page_index).attr('src',sideBarMenuImgArr[page_index]);
			//on.Unload();
			if(page_index == 1)
				page_index = Main.sideBarMenu.btn.length;

			Main.sideBarMenu.btn.eq(--page_index).addClass('focus');
			//alert("page_Index+5 : "+page_index+5);
			$("#sideBarMenuImg"+page_index).attr('src',sideBarMenuImgArr[(page_index+5)]);
			Main.layout.page.load(pagearr[page_index].html);
			Player.hide();
			setTimeout(function(){
				pagearr[page_index].object.onLoad();
			},10);

			break;
		case tvKey.KEY_DOWN:
			alert("main_key : Down");
			Main.sideBarMenu.btn.eq(page_index).removeClass('focus');
			$("#sideBarMenuImg"+page_index).attr('src',sideBarMenuImgArr[page_index]);
			if(page_index == Main.sideBarMenu.btn.length-1)
				page_index = 0;

			Main.sideBarMenu.btn.eq(++page_index).addClass('focus');
			$("#sideBarMenuImg"+page_index).attr('src',sideBarMenuImgArr[(page_index+5)]);
			Main.layout.page.load(pagearr[page_index].html);
			Player.hide();

			setTimeout(function(){
				pagearr[page_index].object.onLoad();
			},10);				

			break;
		case tvKey.KEY_ENTER:
			alert("main_key : Enter");
		case tvKey.KEY_PANEL_ENTER:
			alert("main_key : Panel Enter");		
		case tvKey.KEY_RIGHT:
			alert("main_key : Right");
			//focus move to Page
			setTimeout(function(){
				pagearr[page_index].object.focus();
			},10);			
			Main.layout.sideBar.removeClass('focus');
			// select 
			Main.sideBarMenu.btn.eq(page_index).addClass('select');
			$("#sideBarMenuImg"+page_index).attr('src',sideBarMenuImgArr[(page_index+10)]);
			
			//Main.sideBarMenu.btn.removeClass('focus');
			$("#sideBar").css("width","300px");
			$(".sideBarMenuText").css("display","none");
			document.getElementById("article").style.marginLeft="130px";

			//document.getElementById("MultiWatchPg").style.marginLeft="120px";
			//pagearr[page_index].onLoad();
			break;
		case tvKey.KEY_PLAY:
            alert("PLAY");
           var lAudioNote = document.getElementById("video");
            lAudioNote.play();
            break;
			
		default:
			alert("Unhandled key");
			break;
	}
};

popupMessage = function(message){
	alert("PopUp m!!");
	jQuery('#popup').append('<div id="popupMessage">'+message+'</div>');
	$('#popupMessage').css("display","block");
	setTimeout(function(){
		$('#popupMessage').css("display","none");
	},2000);
};
var popup_index;
var focusBack;
popupMessageButton = function(message, returnFocus){
	alert("PopUp b!!");
	focusBack = returnFocus;
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
				$('#popupMessageButton').css("display","none");
			break;
		case tvKey.KEY_EXIT:
			widgetAPI.sendExitEvent();
			break;
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			widgetAPI.blockNavigation(event);
			focusBack.focus();
			$('#popupMessageButton').css("display","none");
			break;
		default:
			alert("Unhandled key");
			break;
	}

};
