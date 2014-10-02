
var SMSSharingSpg= {
	
};

SMSSharingSpg.onLoad = function()
{
	alert("SMSSharingSpg onLoad");
	//document.getElementById("SMSSharingSpg").style.marginLeft="1460px";
	jQuery.extend(SMSSharingSpg,{
		anchor: {
			main : jQuery('#anchor_SMSSharingSpg')
		}
	});
	this.focus();	
};

var SMSSharingSpg_index =0;

SMSSharingSpg.focus = function(){ 
	alert("SMSSharingSpg.focus");
	SMSSharingSpg.anchor.main.focus();
	// focus initialize
	SMSSharingSpg_index =0;
	
};

SMSSharingSpg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

SMSSharingSpg.keyDown = function()
{
	alert("SMSSharingSpg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + SMSSharingSpg_index);
	
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			//앱이 종료되는것을 방지해준다.
			widgetAPI.blockNavigation(event);
			alert("SMSSharingSpg_key : RETURN");
		case tvKey.KEY_LEFT:
			alert("SMSSharingSpg_key : Left");
			jQuery('#SMSSharingSpg').hide();//페이지를 닫는다.			
			SelectWatchPg.focus();
			break;
		case tvKey.KEY_RIGHT:
			alert("SMSSharingSpg_key : Right");
			break;
		case tvKey.KEY_UP:
			alert("SMSSharingSpg_key : Up");
			break;
		case tvKey.KEY_DOWN:
			alert("SMSSharingSpg_key : Down");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
			alert("SMSSharingSpg_key : Enter");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};