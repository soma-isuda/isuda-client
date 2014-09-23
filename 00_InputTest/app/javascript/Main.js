var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var pagearr = ['app/html/MultiWatchPG.html'];

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

var focus_comp = 0;

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
	focus_comp= "sidebar";
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
			Main.layout.page.load(pagearr[0], function(){
				//Main.anchor.input = jQuery('#login_form');
				jQuery('#login_form').addClass('focus');
			});
			Main.layout.sidebar.removeClass('focus');
//			Main.anchor.input.addClass('focus');			
//			MultiWatchPg.initFocus();	
			break;
			
/*		case tvKey.KEY_LEFT:
			alert("LEFT");
			if(focus_comp == "loginButton"){
				Main.login.input.focus();
				Main.login.button.removeClass('focus');
				Main.login.input.addClass('focus');
				focus_comp="loginInput";
			}			
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			Main.layout.page.load(pagearr[0]);
			break;
		case tvKey.KEY_UP:
			alert("UP");
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			if(focus_comp == "loginButton"){
				alert("asdmlas");
				jQuery.ajax('http://127.0.0.1:9090/data.json', {
					type : 'GET',
					dataType : 'json',
					success : function(data){				
						Main.output.elem.html(data);
						alert("haha");
					}
				});	
			}
			break;
		case tvKey.KEY_INFO:
			$('#article').load('html/infoview.html');			
//			Main.info.elem.show();
			Main.info.anchor.focus();
//			Main.main.elem.hide();
			break;					*/	
		default:
			alert("Unhandled key");
			break;
	}
};
