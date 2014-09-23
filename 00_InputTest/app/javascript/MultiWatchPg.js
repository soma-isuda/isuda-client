/**
 * 
 */


var MultiWatchPg =
{
};

//var focus_comp = 0;

MultiWatchPg.onLoad = function()
{
/*	jQuery.extend(MultiWatchPg,{
		login:{
			input	: jQuery('#login_form'),
			submit	: jQuery('#login_button')
		},	
		anchor:{
			main	: jQuery('#anchor_MultiWatchPG'),
			input	: jQuery('#login_form')
		}		
	});*/
};



MultiWatchPg.onUnload = function()
{

};

MultiWatchPg.initFocus = function()
{
	alert("asda");
	MultiWatchPg.anchor.main.focus();
	MultiWatchPg.login.submit.addClass('focus');
	focus_comp= "loginInput";
};

MultiWatchPg.keyDown = function()
{
	var keyCode = event.keyCode;
//	alert("Key pressed: " + keyCode);

	alert("MultiWatchPg");	
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
			
		case tvKey.KEY_LEFT:
			alert("LEFT");
			if(focus_comp == "loginButton"){
				MultiWatchPg.login.input.focus();
				MultiWatchPg.login.submit.removeClass('focus');
				MultiWatchPg.login.input.addClass('focus');
				focus_comp="loginInput";
			}			
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			if(focus_comp == "loginButton"){
				alert("loginButton Clicked");
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};

MultiWatchPg.numkeyDown = function()
{
	var keyCode = event.keyCode;
	alert("login Key pressed: " + keyCode);

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
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
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
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
