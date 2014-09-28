
var TVSchedulePg= {

	
};

TVSchedulePg.onLoad = function()
{
	alert("TVSchedulePg onLoad");
	//document.getElementById("TVSchedulePg").style.marginLeft="1460px";
	jQuery.extend(TVSchedulePg,{
		big : jQuery('#big').find('ul'),
		mid : jQuery('#mid').find('ul'),
		anchor: {
			big : jQuery('#anchor_TVSchedulePg_bigCategory'),
			mid : jQuery('#anchor_TVSchedulePg_midCategory'),
			main : jQuery('#anchor_TVSchedulePg')
		}
	});
	
    // Load first category
	for (var i = 0; i < firstCategory.length ; i++) { 
	    TVSchedulePg.big.append('<li>' + firstCategory[i] + '</li>');
	}
	this.focus();
	jQuery.extend(TVSchedulePg,{
	    bigElem : jQuery('#big').find('ul > li')
	});
};

var TVSchedulePg_index =0;
var big_index=0;
var mid_index=0;
TVSchedulePg.focus = function(){ 
	alert("");
	alert("TVSchedulePg.focus");
	TVSchedulePg.anchor.big.focus();
	TVSchedulePg.big.eq(big_index).addClass('focus');
	tabMenu();
	// focus initialize
	//TVSchedulePg_index =0;
	
};

TVSchedulePg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};


tabMenu = function(){

	alert("tabMenu");
    //clear mid tag
	jQuery('.mid').empty();
    // Load second category
	for (var i = 1; i < secondCategory[big_index].length ; i++) 
	    TVSchedulePg.mid.append('<li>' + secondCategory[big_index][i] + '</li>');
	    
	
};

TVSchedulePg.bigKeyDown = function()
{
	alert("TVSchedulePg big Category keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + TVSchedulePg_index);
	
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			//앱이 종료되는것을 방지해준다.
			widgetAPI.blockNavigation(event);
			alert("TVSchedulePg_key : RETURN");
			SelectWatchPg.onLoad();
			break;
		case tvKey.KEY_LEFT:
			alert("TVSchedulePg_key : Left");
			break;
		case tvKey.KEY_RIGHT:
			alert("TVSchedulePg_key : Right");
			break;
		case tvKey.KEY_UP:
		    alert("TVSchedulePg_key : Up");
            //중분류 카테고리의 맨위에 도달했을때 위의 키를 누르면 , 맨아래로 간다.
		    if (big_index == 0)
		        big_index = firstCategory.length - 1;

			TVSchedulePg.bigElem.eq(big_index).removeClass('focus');
			TVSchedulePg.bigElem.eq(--big_index).addClass('focus');
			tabMenu();
			
			break;
		case tvKey.KEY_DOWN:
		    alert("TVSchedulePg_key : Down");
            //중분류 카테고리의 맨 아래에 도달했을때 아래 키를 누르면, 맨위로 간다.
		    if (big_index == firstCategory.length - 1) {
		        big_index = 0;
		    }
			TVSchedulePg.bigElem.eq(big_index).removeClass('focus');
			TVSchedulePg.bigElem.eq(++big_index).addClass('focus');
			tabMenu();
			
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("TVSchedulePg_key : Enter");
			TVSchedulePg.big.eq(big_index).removeClass('focus');
			tabMenu();
			TVSchedulePg.anchor.mid.focus();
			TVSchedulePg.mid.eq(mid_index).find('li').focus();
			break;
		default:
			alert("Unhandled key");
			break;
	}
};

TVSchedulePg.midKeyDown = function()
{
	alert("TVSchedulePg mid Category keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + TVSchedulePg_index);
	
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			//앱이 종료되는것을 방지해준다.
			widgetAPI.blockNavigation(event);
			alert("TVSchedulePg_key : RETURN");
			SelectWatchPg.onLoad();
			break;
		case tvKey.KEY_LEFT:
			alert("TVSchedulePg_key : Left");
			break;
		case tvKey.KEY_RIGHT:
			alert("TVSchedulePg_key : Right");
			break;
		case tvKey.KEY_UP:
			alert("TVSchedulePg_key : Up");
			break;
		case tvKey.KEY_DOWN:
			alert("TVSchedulePg_key : Down");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
			alert("TVSchedulePg_key : Enter");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
TVSchedulePg.KeyDown = function()
{
	alert("TVSchedulePg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + TVSchedulePg_index);
	
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			//앱이 종료되는것을 방지해준다.
			widgetAPI.blockNavigation(event);
			alert("TVSchedulePg_key : RETURN");
			SelectWatchPg.onLoad();
			break;
		case tvKey.KEY_LEFT:
			alert("TVSchedulePg_key : Left");
			break;
		case tvKey.KEY_RIGHT:
			alert("TVSchedulePg_key : Right");
			break;
		case tvKey.KEY_UP:
			alert("TVSchedulePg_key : Up");
			break;
		case tvKey.KEY_DOWN:
			alert("TVSchedulePg_key : Down");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
			alert("TVSchedulePg_key : Enter");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};