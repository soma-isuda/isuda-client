var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var pluginAPI = new Common.API.Plugin();

// ///////*SERVER*//////// 전역변수 //
var SERVER_ADDRESS_IN = 'http://172.16.100.171:3000';
var SERVER_ADDRESS_OUT = 'http://61.43.139.145:3000';
var SERVER_ADDRESS = SERVER_ADDRESS_IN;
var PHP_SERVER_ADDRESS_IN = 'http://172.16.100.171';
var PHP_SERVER_ADDRESS_OUT = 'http://61.43.139.145';
var PHP_SERVER_ADDRESS = PHP_SERVER_ADDRESS_IN;

// ///////*SOUND*//////// 전역변수 //
var vol = null;
var userMute = null;
var ObjectAudio = null;
var ObjectTVMW = null;
var NNaviPlugin = null;

// ///////*PAGE*//////// 전역변수 //
var page_index = 0;
var subPage_index = 0;//현재 열려있는 서브 페이지의 넘버
//0:상세보기 서브페이지
//1:가격비교 서브페이지
//2:SMS공유 서브페이지
//3:번호선택 서브페이지

var pageload;
// 메뉴 이동시 일정시간 있어야 페이지 로드


var Main =
{
	layout:{
		page	: jQuery('#article'),
		subPage : jQuery('#subPage')
		//popUp   : jQuery('#popup')
	},
	menu:{
		btn : jQuery('#sideBar').find('ul > li')
	},
	anchor:{
		main	: jQuery('#anchor_main'),
		subPage : jQuery('#anchor_subPage'),
		popUp 	: jQuery('#anchor_popup')
	},
	pageloaded 	: false
};


Main.onLoad = function()
{
	alert("Main.onLoad");
	Main.layout.page.load(pagearr[page_index].html, function (response, status, xhr) {
	    if (status == "success") {
			pagearr[page_index].object.onLoad();
			Main.pageloaded = true;
	    }
	});
	Main.focus();

	// ///////*SOUND*//////// initialize //
    pluginAPI.registIMEKey();
    //volume OSD and audio plugin
    ObjectTVMW = document.getElementById('pluginObjectTVMW');
    ObjectAudio = document.getElementById('pluginAudio');
    NNaviPlugin = document.getElementById('pluginObjectNNavi');
    window.onShow = function () {
	    alert('[APPS] : setBannerstate ');
	    setTimeout(function(){
		        pluginAPI.unregistKey(tvKey.KEY_VOL_UP);
		        pluginAPI.unregistKey(tvKey.KEY_VOL_DOWN);
		        pluginAPI.unregistKey(tvKey.KEY_MUTE);
		        pluginAPI.unregistKey(tvKey.KEY_PANEL_VOL_UP);
		        pluginAPI.unregistKey(tvKey.KEY_PANEL_VOL_DOWN);
		        pluginAPI.unregistKey(7); //unregister volume up button
		        pluginAPI.unregistKey(11); //unregister volume down button
		        pluginAPI.unregistKey(27); //unregister mute button
		     
		},100);
	    NNaviPlugin.SetBannerState(1); //this is to see the banner Volume
    };
    userMute = ObjectAudio.GetUserMute();
    vol = ObjectAudio.GetVolume();
    alert('-----volume::'+ObjectAudio.GetVolume()+'------mute::'+ObjectAudio.GetUserMute()); //show in console Volume State

	widgetAPI.sendReadyEvent();
	alert('Main_onLoad completed');
};

Main.onUnload = function()
{

};

Main.focus = function()
{
	Main.anchor.main.focus();
	Main.menu.btn.eq(page_index).removeClass('select');
	Main.menu.btn.eq(page_index).addClass('focus');
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
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("main_key : Return or Exit");
			widgetAPI.blockNavigation(event);
			popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?",Main);
			break;
			
		case tvKey.KEY_UP:
			alert("main_key : Up");
			clearTimeout(pageload);
			Main.menu.btn.eq(page_index).removeClass('focus');
			if(page_index == 0)
				page_index = Main.menu.btn.length;
			Main.menu.btn.eq(--page_index).addClass('focus');
			Main.pageloaded = false;
			pageload = setTimeout(function(){
				Main.layout.page.load(pagearr[page_index].html, function (response, status, xhr) {
				    if (status == "success") {
						pagearr[page_index].object.onLoad();
						Main.pageloaded = true;
				    }
				});
			}, 200);
			PlayerManager.destroy();
			break;
		case tvKey.KEY_DOWN:
			alert("main_key : Down");
			clearTimeout(pageload);
			Main.menu.btn.eq(page_index).removeClass('focus');
			if(page_index == Main.menu.btn.length-1)
				page_index = -1;
			Main.menu.btn.eq(++page_index).addClass('focus');
			Main.pageloaded = false;
			pageload = setTimeout(function(){
			 	Main.layout.page.load(pagearr[page_index].html, function (response, status, xhr) {
				    if (status == "success") {
						pagearr[page_index].object.onLoad();
						Main.pageloaded = true;
				    }
				});
			}, 200);
			PlayerManager.destroy();
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
		case tvKey.KEY_RIGHT:
			alert("main_key : Right or Enter");
			if(Main.pageloaded){
			    pagearr[page_index].object.focus();
				Main.menu.btn.eq(page_index).removeClass('focus');
				Main.menu.btn.eq(page_index).addClass('select');
			    alert("포커스 넘기기 성공");				
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};




