
var MultiWatchPg =
{
};

MultiWatchPg.onLoad = function()
{
	jQuery.extend(MultiWatchPg,{
		login:{
			input	: jQuery('#login_form'),
			submit	: jQuery('#login_button')
		},	
		anchor:{
			main	: jQuery('#anchor_MultiWatchPG'),
			input	: jQuery('#login_form')
		},
		focus: 0
	});
	this.initFocus();	
};



MultiWatchPg.onUnload = function()
{

};

MultiWatchPg.initFocus = function()
{
	MultiWatchPg.anchor.main.focus();
	MultiWatchPg.login.input.addClass('focus');
	MultiWatchPg.focus = "loginInput";
//	focus_comp= "loginInput";
};

MultiWatchPg.returnFocusFromInput = function()
{
	if(MultiWatchPg.focus == "loginInput"){
		MultiWatchPg.anchor.main.focus();
		MultiWatchPg.login.input.addClass('focus');
	}	
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
//			event.preventDefault();
			widgetAPI.sendReturnEvent();
			break;
			
		case tvKey.KEY_LEFT:
			alert("LEFT");
			if(MultiWatchPg.focus == "loginButton"){
				MultiWatchPg.login.submit.removeClass('focus');
				MultiWatchPg.login.input.addClass('focus');
				MultiWatchPg.focus ="loginInput";
			}
			else{
				Main.initFocus();
				MultiWatchPg.login.input.removeClass('focus');
				
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			if(MultiWatchPg.focus == "loginInput"){
				MultiWatchPg.login.input.removeClass('focus');
				MultiWatchPg.login.submit.addClass('focus');
				MultiWatchPg.focus="loginButton";
			}			
			break;			
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			if(MultiWatchPg.focus == "loginButton"){
				alert("loginButton Clicked");
			}
			else if (MultiWatchPg.focus =="loginInput"){
				MultiWatchPg.login.input.focus();
				MultiWatchPg.login.input.removeClass('focus');
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
