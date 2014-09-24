var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var pagearr = ['app/html/MultiWatchPG.html', 'app/html/SelectWatchPg.html'];

var page_comp = 0;

var Main =
{
	layout:{
		sidebar : jQuery('#sidebar'),
		page	: jQuery('#article')
	},
	sidebarbtn:{
		//btn : jQuery('#sidebar' < li)
	},
	anchor:{
		main	: jQuery('#anchor_main')
	}
};

Main.onLoad = function()
{
//	Main.layout.page.load('app/html/MultiWatchPG.html', function(){		
//		console.log("Adsad");
//	});
	
	// Enable key event processing
	this.initFocus();
	widgetAPI.sendReadyEvent();
};



Main.onUnload = function()
{

};

Main.initFocus = function()
{
	Main.anchor.main.focus();
	Main.layout.sidebar.addClass('focus');
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;
//	alert("Key pressed: " + keyCode);

	alert("Main");	
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");			
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			//멀티 와치 페이지 호출 
			Main.layout.page.load(pagearr[0]);
			setTimeout(function(){
				MultiWatchPg.onLoad();
				page_comp = "MultiWatchPg";
			},10);			
			//
			Main.layout.sidebar.removeClass('focus');	
			break;
		default:
			alert("Unhandled key");
			break;
	}
};



Main.numKeyDown = function()
{
	var keyCode = event.keyCode;
	
	
	switch(keyCode)
	{
		case tvKey.KEY_0:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"0");
			break;	
		case tvKey.KEY_1:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"1");
			break;
		case tvKey.KEY_2:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"2");
			break;
		case tvKey.KEY_3:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"3");
			break;
		case tvKey.KEY_4:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"4");
			break;
		case tvKey.KEY_5:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"5");
			break;
		case tvKey.KEY_6:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"6");
			break;
		case tvKey.KEY_7:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"7");
			break;
		case tvKey.KEY_8:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"8");
			break;
		case tvKey.KEY_9:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"9");
			break;			
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			if(page_comp == "MultiWatchPg"){
				MultiWatchPg.returnFocusFromInput();
			}
			break;
/*		case tvKey.KEY_LEFT:
			alert("LEFT");
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			if(focus_comp == "loginInput"){
				MultiWatchPg.anchor.main.focus();
				MultiWatchPg.login.input.removeClass('focus');
				MultiWatchPg.login.submit.addClass('focus');
				focus_comp="loginButton";
			}			
			break;*/
		default:
			alert("Unhandled key");
			break;
	}
};
