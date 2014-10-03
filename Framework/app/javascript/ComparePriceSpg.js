
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