
var DetailInfoSpg= {
	
};

DetailInfoSpg.onLoad = function()
{
	alert("DetailInfoSpg onLoad");
	//document.getElementById("DetailInfoSpg").style.marginLeft="1460px";
	jQuery.extend(DetailInfoSpg,{
		anchor: {
			main : jQuery('#anchor_DetailInfoSpg')
		}
	});
	//this.focus();	
};

var DetailInfoSpg_index =0;

DetailInfoSpg.focus = function(){ 
	alert("DetailInfoSpg.focus");
	DetailInfoSpg.anchor.main.focus();
	// focus initialize
	DetailInfoSpg_index =0;
	
};

DetailInfoSpg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

DetailInfoSpg.keyDown = function()
{
	alert("DetailInfoSpg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + DetailInfoSpg_index);
	
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			//앱이 종료되는것을 방지해준다.
			widgetAPI.blockNavigation(event);
			alert("DetailInfoSpg_key : RETURN");
			SelectWatchPg.onLoad();
			break;
		case tvKey.KEY_LEFT:
			alert("DetailInfoSpg_key : Left");
			break;
		case tvKey.KEY_RIGHT:
			alert("DetailInfoSpg_key : Right");
			break;
		case tvKey.KEY_UP:
			alert("DetailInfoSpg_key : Up");
			break;
		case tvKey.KEY_DOWN:
			alert("DetailInfoSpg_key : Down");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
			alert("DetailInfoSpg_key : Enter");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};