var SelectWatchPg_index = 0; // = subPageArr_index
//var channel = 0;
//var playerInit = false;

var SelectWatchPg = {

};

SelectWatchPg.onLoad = function (ch) {
    alert("SelectWatchPg onLoad");
    jQuery.extend(SelectWatchPg, {
        SelectWatchPgMenu: jQuery('#SelectWatchPgMenu').find('ul > li'),
        anchor: {
            main: jQuery('#anchor_SelectWatchPg')
        }
        //focus: 0
    });
    jQuery('#SelectWatchPgMenu').hide();

    Player.init(ch);
    SelectWatchPg_index = 0;
};

SelectWatchPg.focus = function () {

    alert("SelectWatchPg focus");

    jQuery('#SelectWatchPgMenu').show(0, function () {
        SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('select');
        SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('focus');
        SelectWatchPg.anchor.main.focus();
    });
};

SelectWatchPg.keyDown = function () {
    alert("SelectWatchPg keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode);
    alert(SelectWatchPg_index);

    switch (keyCode) {
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", SelectWatchPg);
            break;
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
            //			SelectWatchPg.anchor.main.removeClass('focus');
            SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
            jQuery('#SelectWatchPgMenu').hide();
            $(".sideBarMenuText").css("display", "block");
            Main.focus();
            break;
        case tvKey.KEY_UP:
            alert("SelectWatchPg_key : Up");
            SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
            SelectWatchPg_index = (SelectWatchPg_index + SelectWatchPg.SelectWatchPgMenu.size() - 1) % SelectWatchPg.SelectWatchPgMenu.size();
            SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('focus');
            break;

        case tvKey.KEY_DOWN:
            alert("SelectWatchPg_key : Down");
            SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
            SelectWatchPg_index = (SelectWatchPg_index + SelectWatchPg.SelectWatchPgMenu.size() + 1) % SelectWatchPg.SelectWatchPgMenu.size();
            SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('focus');
            break;

        case tvKey.KEY_RIGHT:
            alert("SelectWatchPg_key : Right");
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:

            alert("SelectWatchPg_index : " + SelectWatchPg_index);
            SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('select');
            Main.layout.subPage.load(subPageArr[SelectWatchPg_index].html);
            // setTimeout(function(){
            // 	document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1920px";
            // 	$("#"+subPageArr[SelectWatchPg_index].name).animate({left:'-460px'}, 1000);
            //  },1);
            setTimeout(function () {
                subPageArr[SelectWatchPg_index].object.onLoad();
            }, 10);
			break;
		case tvKey.KEY_VOL_UP:
        case tvKey.KEY_PANEL_VOL_UP:
            alert("VOL_UP");
            if(this.mute == 0)
            	Audio.setRelativeVolume(0);
              
            break;
        case tvKey.KEY_VOL_DOWN:
        case tvKey.KEY_PANEL_VOL_DOWN:
            alert("VOL_DOWN");
            if(this.mute == 0)
            	 Audio.setRelativeVolume(1);

            break;     
        case tvKey.KEY_MUTE:
            alert("MUTE");
            this.muteMode();
            break;
		default:
			alert("Unhandled key");
			break;
	}
};