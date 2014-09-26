
var MultiWatchPg= {
	
};

MultiWatchPg.onLoad = function()
{
	document.getElementById("MultiWatchPg").style.marginLeft="120px";
	jQuery.extend(MultiWatchPg,{
		MultiWatchPgElem : jQuery('.MultiWatchPgElem'),
		anchor:{
			main	: jQuery('#anchor_MultiWatchPg'),
		}
		//focus: 0
	});
	this.focus();	
};

var MultiWatchPg_index =0;

MultiWatchPg.focus = function(){ 
	alert("MultiWatchPg.focus");
	MultiWatchPg.anchor.main.focus();
	// focus initialize
	MultiWatchPg_index =0;
	MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');
};

MultiWatchPg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

MultiWatchPg.keyDown = function()
{
	alert("MultiWatchPg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("MultiWatchPg_key : RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("MultiWatchPg_key : Left");
			if((MultiWatchPg_index=0)||(MultiWatchPg_index=3)||(MultiWatchPg_index=6)){ //이게 빠른지 3으로 나눈 나머지가 0인경우가 빠른지 모르겠다.
				//focus move to sideBar
				MultiWatchPg.anchor.main.removeClass('focus');
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				Main.onLoad();
			}
			else{
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				MultiWatchPg.MultiWatchPgElem.eq(--MultiWatchPg_index).addClass('focus');
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("MultiWatchPg_key : Right");
			if(MultiWatchPg_index==8){
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				MultiWatchPg_index=0;
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');
			}
			else{
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				MultiWatchPg.MultiWatchPgElem.eq(++MultiWatchPg_index).addClass('focus');
			}
			break;
		case tvKey.KEY_UP:
			alert("MultiWatchPg_key : Up");
			if(MultiWatchPg_index<3){
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				MultiWatchPg_index += 6;
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');
			}
			else{
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				MultiWatchPg_index -= 3;
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');
			}
			break;
		case tvKey.KEY_DOWN:
			alert("MultiWatchPg_key : Down");
			if(MultiWatchPg_index<6){
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				MultiWatchPg_index += 3;
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');
			}
			else{
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				MultiWatchPg_index -= 3;
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');
			}

			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
			widgetAPI.blockNavigation();
			MultiWatchPg.unload();
			alert("MultiWatchPg_key : RETURN");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};