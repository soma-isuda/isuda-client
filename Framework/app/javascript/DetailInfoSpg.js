
var DetailInfoSpg= {
	
};

DetailInfoSpg.onLoad = function()
{
	alert("DetailInfoSpg onLoad");
	document.getElementById("DetailInfoSpg").style.marginLeft="1460px";
	jQuery.extend(DetailInfoSpg,{
		anchor: {
			main : jQuery('#anchor_DetailInfoSpg')
		}
	});
	this.focus();	
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
			widgetAPI.blockNavigation(event);
			//event.preventDefault();
			//widgetAPI.blockNavigation(); // prodect App exit
			//widgetAPI.sendReturnEvent();

			alert("DetailInfoSpg_key : RETURN");
			document.getElementById("DetailInfoSpg").style.marginLeft="1920px";
			SelectWatchPg.onLoad();
			break;
		case tvKey.KEY_LEFT:
			alert("DetailInfoSpg_key : Left");
			if(SelectWatchPg_index==0){ //이게 빠른지 3으로 나눈 나머지가 0인경우가 빠른지 모르겠다.
				//focus move to sideBar
				SelectWatchPg.anchor.main.removeClass('select');
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('select');
				Main.onLoad();
			}
			else{
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('select');
				SelectWatchPg.SelectWatchPgMenu.eq(--SelectWatchPg_index).addClass('select');
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("DetailInfoSpg_key : Right");
			if(SelectWatchPg_index==3){
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('select');
				SelectWatchPg_index=0;
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('select');
			}
			else{
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('select');
				SelectWatchPg.SelectWatchPgMenu.eq(++SelectWatchPg_index).addClass('select');
			}
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