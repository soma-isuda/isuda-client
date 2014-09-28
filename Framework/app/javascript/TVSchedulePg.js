
var TVSchedulePg= {

	
};
//midArr = ["mid1", "mid2"]; 
TVSchedulePg.onLoad = function()
{
	alert("TVSchedulePg onLoad");
	//document.getElementById("TVSchedulePg").style.marginLeft="1460px";
	jQuery.extend(TVSchedulePg,{
		big : jQuery('#big').find('ul'),
		mid : jQuery('.mid'),
		anchor: {
			big : jQuery('#anchor_TVSchedulePg_bigCategory'),
			mid : jQuery('#anchor_TVSchedulePg_midCategory'),
			main : jQuery('#anchor_TVSchedulePg')
		}
	});
			jQuery.ajax({
				url : 'http://172.16.100.171:3000/getFristCategory',
				type : 'GET',
				dataType : 'json',
				success : function (data) {
					$.each(data, function() {
					    TVSchedulePg.big.append('<li>'+this.name+'"</li>');
					});					
//					jQuery('#input').val(data);
				}
			});			



	this.focus();	
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
	var i;
	alert("tabMenu");
	alert(TVSchedulePg.mid.length);
	for(i=0; i<TVSchedulePg.mid.length;i++){
		if (i==big_index) {
			//document.getElementById(midArr[i]).style.display="block";
			TVSchedulePg.mid.eq(i).css("display","block");
		}
		else {
			TVSchedulePg.mid.eq(i).css("display","none");

		}
	}	
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
			TVSchedulePg.big.eq(big_index).removeClass('focus');
			TVSchedulePg.big.eq(--big_index).addClass('focus');
			tabMenu();
			break;
		case tvKey.KEY_DOWN:
			alert("TVSchedulePg_key : Down");
			TVSchedulePg.big.eq(big_index).removeClass('focus');
			TVSchedulePg.big.eq(++big_index).addClass('focus');
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