
var SelectWatchPg_index =0; // = subPageArr_index
//var channel = 0;
//var playerInit = false;

var SelectWatchPg= {
	
};

SelectWatchPg.onLoad = function(ch)
{
	alert("SelectWatchPg onLoad");
	jQuery.extend(SelectWatchPg,{
		SelectWatchPgMenu : jQuery('#SelectWatchPgMenu').find('ul > li'),
		anchor:{
			main	: jQuery('#anchor_SelectWatchPg')
		}
		//focus: 0
	});
		
	Player.init(ch);
	
};

SelectWatchPg.focus = function(){ 
	
	alert("SelectWatchPg focus");
	SelectWatchPg.anchor.main.focus();
	// focus initialize
	//alert(SelectWatchPgMenu.size);
	SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('select');
	SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('focus');
};

SelectWatchPg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

SelectWatchPg.keyDown = function()
{
	alert("SelectWatchPg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
//		 채널 퀵변경 
		case tvKey.KEY_CH_UP:
			Player.channelUp();
			break;
		case tvKey.KEY_CH_DOWN:
			Player.channelDown();
			break;
		
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("SelectWatchPg_key : RETURN");
			widgetAPI.blockNavigation(event);	
		case tvKey.KEY_LEFT:
			alert("SelectWatchPg_key : Left");
			SelectWatchPg.anchor.main.removeClass('focus');
			SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
			Main.focus();
			break;
		case tvKey.KEY_RIGHT:
			alert("SelectWatchPg_key : Right");
			break;
		case tvKey.KEY_UP:
			alert("SelectWatchPg_key : Up");
			SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');			
			SelectWatchPg_index = (SelectWatchPg_index-1)%SelectWatchPg.SelectWatchPgMenu.size();
			SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('focus');			
			break;

		case tvKey.KEY_DOWN:
			alert("SelectWatchPg_key : Down");
			SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');			
			SelectWatchPg_index = (SelectWatchPg_index+1)%SelectWatchPg.SelectWatchPgMenu.size();
			SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('focus');			
			break;

		case tvKey.KEY_ENTER: 
		case tvKey.KEY_PANEL_ENTER:

			alert("SelectWatchPg_index : "+ SelectWatchPg_index);
			SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('select');
			Main.layout.subPage.load(subPageArr[SelectWatchPg_index].html);
			// setTimeout(function(){
			// 	document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1920px";
			// 	$("#"+subPageArr[SelectWatchPg_index].name).animate({left:'-460px'}, 1000);
			//  },1);
			setTimeout(function(){
				subPageArr[SelectWatchPg_index].object.onLoad();
			},10);

			break;

		default:
			alert("Unhandled key");
			break;
	}
};