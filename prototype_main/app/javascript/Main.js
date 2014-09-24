var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var	sideBar = {
	elem : jQuery('#sideBar'),
	li 	 : jQuery('#sideBar').find('ul>li'),
	anchor : jQuery('#sideBar_anchor')
};
var multiWatchPg = {
		elem : jQuery('#multiWatchPg'),
		multiWatchPgElem : jQuery('.multiWatchPgElem'),
		anchor : jQuery('#multiWatchPg_anchor')
};

var sideBar_index = 0;
var multiWatchPg_index =0;
var fucused_comp = 'sideBar';

var Main = {};
Main.onLoad = function()
{
	//// Enable key event processing
	this.focus();
	widgetAPI.sendReadyEvent();
};

Main.focus = function(){ 
	alert("main.focus");
	sideBar.focus();
};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};
sideBar.focus = function(){
	alert("sideBar.focus");
	sideBar.anchor.focus();
	sideBar.elem.addClass('focus');
	sideBar.li.eq(sideBar_index).addClass('focus');
};

sideBar.keyDown = function()
{
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			document.getElementById("multiWatchPg").style.marginLeft="360px";
			break;
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
		case tvKey.KEY_RIGHT:
			alert("select");
			sideBar.elem.removeClass('focus');
			multiWatchPg.focus();
			document.getElementById("multiWatchPg").style.marginLeft="120px";
			break;
		case tvKey.KEY_UP:
			if(sideBar_index > 0) {
				sideBar.li.eq(sideBar_index).removeClass('focus');	
				sideBar.li.eq(--sideBar_index).addClass('focus');
			}
			else {
				sideBar.li.eq(sideBar_index).removeClass('focus');	
				sideBar_index = sideBar.li.size();
				sideBar.li.eq(--sideBar_index).addClass('focus');	
			}
			alert("UP : " + sideBar_index);
			break;
		case tvKey.KEY_DOWN:
			
			if(sideBar_index <sideBar.li.size()-1){
				sideBar.li.eq(sideBar_index).removeClass('focus');	
				sideBar.li.eq(++sideBar_index).addClass('focus');	
			}
			else{
				sideBar.li.eq(sideBar_index).removeClass('focus');	
				sideBar_index =0;	
				sideBar.li.eq(sideBar_index).addClass('focus');	
			}
			alert("DOWN : "+ sideBar_index);
			break;
		default:
			alert("Unhandled key");
			break;
	}
};

multiWatchPg.onLoad = function()
{
	//// Enable key event processing
	this.focus();
	widgetAPI.sendReadyEvent();
};

multiWatchPg.focus = function(){ 
	alert("multiWatchPg.focus");
	multiWatchPg.anchor.focus();
	multiWatchPg.elem.addClass('focus');
	multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).addClass('focus');
};

multiWatchPg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

multiWatchPg.keyDown = function()
{
	alert("multiWatchPg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			if(multiWatchPg_index>0){
				multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).removeClass('focus');
				multiWatchPg.multiWatchPgElem.eq(--multiWatchPg_index).addClass('focus');
			}
			else{
				multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).removeClass('focus');
				multiWatchPg_index=multiWatchPg.multiWatchPgElem.size();
				multiWatchPg.multiWatchPgElem.eq(--multiWatchPg_index).addClass('focus');
			}
			alert("LEFT");
			break;
		case tvKey.KEY_RIGHT:
			if(multiWatchPg_index==5){
				multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).removeClass('focus');
				multiWatchPg_index=0;
				multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).addClass('focus');
			}
			else{
				multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).removeClass('focus');
				multiWatchPg.multiWatchPgElem.eq(++multiWatchPg_index).addClass('focus');
			}
			alert("RIGHT");
			break;
		case tvKey.KEY_UP:
			if(multiWatchPg_index<3){
				multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).removeClass('focus');
				multiWatchPg_index += 3;
				multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).addClass('focus');
			}
			else{
				multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).removeClass('focus');
				multiWatchPg_index -= 3;
				multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).addClass('focus');
			}
			alert("UP");
			break;
		case tvKey.KEY_DOWN:
			if(multiWatchPg_index<3){
				multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).removeClass('focus');
				multiWatchPg_index += 3;
				multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).addClass('focus');
			}
			else{
				multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).removeClass('focus');
				multiWatchPg_index -= 3;
				multiWatchPg.multiWatchPgElem.eq(multiWatchPg_index).addClass('focus');
			}
			alert("DOWN");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			selectWatchPg.load();
			selectWatchPg.show();
			selectWatchPg.focus();
			// Main.selectWatchPg.anchor.focus();
			// Main.multiWatchPg.elem.removeClass('focus');
			// Main.selectWatchPg.elem.addClass('focus');
			// focused_comp = 'selectWatchPg';
			widgetAPI.blockNavigation();
			multiWatchPg.unload();
			alert("ENTER");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};