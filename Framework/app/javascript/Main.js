var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

// pagearr : information about pages in pageinfo
var page_index = 0;
var Main =
{
	layout:{
		sideBar : jQuery('#sideBar'),
		page	: jQuery('#article'),
		subPage : jQuery('#subPage')
	},
	sideBarMenu:{
		btn : jQuery('#sideBar').find('ul > li')
	},
	anchor:{
//		menu	: jQuery('#menu'),
		main	: jQuery('#anchor_main')
	},
	focus: 0	
};

Main.onLoad = function()
{
	alert("Main.onLoad");
	alert(pagearr.length);
	Main.layout.page.load(pagearr[page_index].html);	
	// Enable key event processing
	this.focus();
	widgetAPI.sendReadyEvent();
};

Main.focus = function()
{
	Main.anchor.main.focus();
	Main.layout.sideBar.addClass('focus');
	Main.sideBarMenu.btn.eq(page_index).addClass('focus');
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
//	alert("Key pressed: " + keyCode);

	alert("Main");	
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("main_key : Return");
			widgetAPI.sendReturnEvent();
			break;
			
		case tvKey.KEY_UP:
			alert("main_key : Up");
			if(page_index > 0){
				Main.sideBarMenu.btn.eq(page_index).removeClass('focus');
				Main.sideBarMenu.btn.eq(--page_index).addClass('focus');
				Main.layout.page.load(pagearr[page_index].html);
			}
			break;
		case tvKey.KEY_DOWN:
			alert("main_key : Down");
			alert(page_index);
			alert(pagearr[page_index]);
			if(page_index < (pagearr.length-1)){
				Main.sideBarMenu.btn.eq(page_index).removeClass('focus');
				Main.sideBarMenu.btn.eq(++page_index).addClass('focus');				
				Main.layout.page.load(pagearr[page_index].html);
			}
			break;
		case tvKey.KEY_ENTER:
			alert("main_key : Enter");
		case tvKey.KEY_PANEL_ENTER:
			alert("main_key : Panel Enter");		
		case tvKey.KEY_RIGHT:
			alert("main_key : Right");
			//focus move to Page
			setTimeout(function(){
				pagearr[page_index].object.onLoad();
			},10);			
			Main.layout.sideBar.removeClass('focus');
			Main.sideBarMenu.btn.removeClass('focus');
			document.getElementById(pagearr[page_index].name).style.marginLeft="120px";
			//document.getElementById("MultiWatchPg").style.marginLeft="120px";
			//pagearr[page_index].onLoad();
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
			pagearr[page_index].object.returnFocusFromInput();			
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
