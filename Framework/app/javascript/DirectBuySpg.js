
var DirectBuySpg= {
	
};

DirectBuySpg.onLoad = function()
{
	alert("DirectBuySpg onLoad");
	//document.getElementById("DirectBuySpg").style.marginLeft="1460px";
	jQuery.extend(DirectBuySpg,{
		anchor: {
			main : jQuery('#anchor_DirectBuySpg')
		}
	});
	this.focus();	
};

var DirectBuySpg_index =0;

DirectBuySpg.focus = function(){ 
	alert("DirectBuySpg.focus");
	DirectBuySpg.anchor.main.focus();
	// focus initialize
	DirectBuySpg_index =0;
	
};

DirectBuySpg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

DirectBuySpg.keyDown = function()
{
	alert("DirectBuySpg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + DirectBuySpg_index);
	
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			//앱이 종료되는것을 방지해준다.
			widgetAPI.blockNavigation(event);
			alert("DirectBuySpg_key : RETURN");
			SelectWatchPg.onLoad();
			break;
		case tvKey.KEY_LEFT:
			alert("DirectBuySpg_key : Left");
			break;
		case tvKey.KEY_RIGHT:
			alert("DirectBuySpg_key : Right");
			break;
		case tvKey.KEY_UP:
			alert("DirectBuySpg_key : Up");
			break;
		case tvKey.KEY_DOWN:
			alert("DirectBuySpg_key : Down");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
			alert("DirectBuySpg_key : Enter");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};