
var SelectWatchPg_index =0; // = subPageArr_index

var SelectWatchPg= {
	
};

SelectWatchPg.onLoad = function()
{
	alert("SelectWatchPg onLoad");
	alert(subPageArr.length);
	jQuery.extend(SelectWatchPg,{
		SelectWatchPgMenu : jQuery('#SelectWatchPgMenu').find('td'),
		layout:{
			player : jQuery('#player')
		},
		anchor:{
			main	: jQuery('#anchor_SelectWatchPg')
		}
		//focus: 0
	});
	
	//document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1920px";
	
	this.focus();

	Player.init();	
	Player.play();

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
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("SelectWatchPg_key : RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("SelectWatchPg_key : Left");
			if(SelectWatchPg_index==0){ //이게 빠른지 3으로 나눈 나머지가 0인경우가 빠른지 모르겠다.
				//focus move to sideBar
				Player.stop();
				SelectWatchPg.anchor.main.removeClass('focus');
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
				Main.onLoad();
			}
			else{
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
				SelectWatchPg.SelectWatchPgMenu.eq(--SelectWatchPg_index).addClass('focus');
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("SelectWatchPg_key : Right");
			if(SelectWatchPg_index==3){
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
				SelectWatchPg_index=0;
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('focus');
			}
			else{
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
				SelectWatchPg.SelectWatchPgMenu.eq(++SelectWatchPg_index).addClass('focus');
			}
			break;
		case tvKey.KEY_UP:
			alert("SelectWatchPg_key : Up");
			break;
		case tvKey.KEY_DOWN:
			alert("SelectWatchPg_key : Down");
			break;
		case tvKey.KEY_ENTER: 
			alert("SelectWatchPg_index : "+ SelectWatchPg_index);
			SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('select');
			Main.layout.subPage.load(subPageArr[SelectWatchPg_index].html);
			// setTimeout(function(){
			// 	document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1920px";
			// 	$("#"+subPageArr[SelectWatchPg_index].name).animate({left:'-460px'}, 1000);
			//  },1);
			
			Main.anchor.subPage.focus();
			break;
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
			widgetAPI.blockNavigation();
			SelectWatchPg.unload();
			alert("SelectWatchPg_key : RETURN");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};