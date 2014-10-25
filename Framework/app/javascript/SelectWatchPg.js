var SelectWatchPg_index = 0; // = subPageArr_index
//var channel = 0;
//var playerInit = false;

var SelectWatchPg = {

};

SelectWatchPg.onLoad = function (ch) {
    alert("SelectWatchPg onLoad");
    jQuery.extend(SelectWatchPg, {
        ChannelHelper : jQuery("#ChannelHelper"),
//        UpCh: jQuery("#ChannelUp"),
//        DownCh : jQuery("#ChannelDown"),
        SelectWatchPgMenu: jQuery('#SelectWatchPgMenu').find('ul > li'),
        anchor: {
            main: jQuery('#anchor_SelectWatchPg')
        }
    });

    Player.init(ch);
    SelectWatchPg_index = 0;
    SelectWatchPg.setData();
};

SelectWatchPg.focus = function () {
    alert("SelectWatchPg focus");
    jQuery('#SelectWatchPgMenu').addClass('show');
    SelectWatchPg.ChannelHelper.addClass('show');
//    SelectWatchPg.DownCh.addClass('show');
    SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('select');
    SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('focus');
    SelectWatchPg.anchor.main.focus();

    clearTimeout(menuDisplayTimeout);
    menuDisplayTimeout = setTimeout(function () {
        jQuery('#SelectWatchPgMenu').removeClass('show');
        SelectWatchPg.ChannelHelper.removeClass('show');
//        SelectWatchPg.DownCh.removeClass('show');
    }, 10000);
    //       alert("asdads");
    //   });
    popupAdjust();
};

SelectWatchPg.setData = function(){
    var upch = Player.getUpChannel();
    var nowch = Player.getChannel();
    var downch = Player.getDownChannel();

    console.log(upch);
    console.log(downch);

    var tempstring = '';
    tempstring += '<div class="Channel">' + channels[upch].getName()+'</div>';
    tempstring += '<div id="NowChannel">' + channels[nowch].getName()+'</div>';
    tempstring += '<div class="Channel">' + channels[downch].getName()+'</div>';
    SelectWatchPg.ChannelHelper.html(tempstring);
    SelectWatchPg.ChannelHelper.css('color', color[nowch]);


/*    jQuery.ajax({
        url: SERVER_ADDRESS + '/now',
        type : 'GET',
        data: ({ providerNum: upch }),    
        dataType : 'json',
        success : function (data) {
            var priceBefore = date.productPrice;
            var priceRefined = '';
            if (priceBefore) {//가격 값이 null이 아니면
                priceBefore = data.productPrice.toString();
                for (var i = priceBefore.length; i > 0; i = i - 3) {
                    if (i == priceBefore.length)
                        priceRefined = priceBefore.substring(i, i - 3);
                    else
                        priceRefined =priceBefore.substring(i, i - 3) + ',' + priceRefined;
                }
                priceRefined += ' 원';
            }
            else//가격 값이 null 이면
                priceRefined += '방송 중 확인';

            var tempstring = '';
            tempstring += '<div class="SimgArea">';
            tempstring +=   '<img src="' +data.productImgURL+ '" alt="" class="SproductImg">';
            tempstring += '</div>';
            tempstring += '<div class="SproductInfoArea">';
            tempstring +=   '<div class="Sprovider">';
            tempstring +=       channels[upch].getName() + '∧';
            tempstring +=   '</div>';
            tempstring +=   '<div class="Sname">';
            tempstring +=       data.productName;
            tempstring +=   '</div>';
//            tempstring +=   '<div class="Sprice">';
//            tempstring +=       '<p>최대 혜택가 :</p>';
//            tempstring +=       '<p class="SproductPrice">' + priceRefined + '</p>';
//            tempstring +=   '</div>';
            tempstring += '</div>';

            SelectWatchPg.UpCh.html(tempstring);
            SelectWatchPg.UpCh.css('background-color', color[upch]);
        }
    });  

    jQuery.ajax({
        url: SERVER_ADDRESS + '/now',
        type : 'GET',
        data: ({ providerNum: downch }),    
        dataType : 'json',
        success : function (data) {
            var priceBefore = date.productPrice;
            var priceRefined = '';
            if (priceBefore) {//가격 값이 null이 아니면
                priceBefore = data.productPrice.toString();
                for (var i = priceBefore.length; i > 0; i = i - 3) {
                    if (i == priceBefore.length)
                        priceRefined = priceBefore.substring(i, i - 3);
                    else
                        priceRefined =priceBefore.substring(i, i - 3) + ',' + priceRefined;
                }
                priceRefined += ' 원';
            }
            else//가격 값이 null 이면
                priceRefined += '방송 중 확인';

            var tempstring = '';
            tempstring += '<div class="SimgArea">';
            tempstring +=   '<img src="' +data.productImgURL+ '" alt="" class="SproductImg">';
            tempstring += '</div>';
            tempstring += '<div class="SproductInfoArea">';
            tempstring +=   '<div class="Sprovider">';
            tempstring +=       channels[downch].getName() + '∨';
            tempstring +=   '</div>';
            tempstring +=   '<div class="Sname">';
            tempstring +=       data.productName;
            tempstring +=   '</div>';
//            tempstring +=   '<div class="Sprice">';
//            tempstring +=       '<p>최대 혜택가 :</p>';
//            tempstring +=       '<p class="SproductPrice">' + priceRefined + '</p>';
//            tempstring +=   '</div>';
            tempstring += '</div>';
            SelectWatchPg.DownCh.html(tempstring);
            SelectWatchPg.DownCh.css('background-color', color[downch]);
        }
    });  */
};

var menuDisplayTimeout;

SelectWatchPg.keyDown = function () {
    alert("SelectWatchPg keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode);
    alert(SelectWatchPg_index);
    var show = false;

    if(!SelectWatchPg.ChannelHelper.hasClass('show')){
        jQuery('#SelectWatchPgMenu').addClass('show');
        SelectWatchPg.ChannelHelper.addClass('show');
        show = true;
    }
//    SelectWatchPg.DownCh.addClass('show');

    clearTimeout(menuDisplayTimeout);
    menuDisplayTimeout = setTimeout(function () {
        jQuery('#SelectWatchPgMenu').removeClass('show');
        SelectWatchPg.ChannelHelper.removeClass('show');
//        SelectWatchPg.DownCh.removeClass('show');
    }, 10000);

    switch (keyCode) {
        case tvKey.KEY_RED:
            if(adjustState == true)
                popupAdjustFull();
            break;
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", SelectWatchPg);
            break;
            //       채널 퀵변경 
        case tvKey.KEY_CH_UP:
            Player.channelUp();
            SelectWatchPg.setData();

            break;
        case tvKey.KEY_CH_DOWN:
            Player.channelDown();
            SelectWatchPg.setData();

            break;

        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            alert("SelectWatchPg_key : RETURN");
            widgetAPI.blockNavigation(event);
        case tvKey.KEY_LEFT:
            alert("SelectWatchPg_key : Left");
            jQuery('#popup').empty(); // 광고가 있을경우 광고를 지운다.
            //          SelectWatchPg.anchor.main.removeClass('focus');
            SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
        jQuery('#SelectWatchPgMenu').removeClass('show');
        SelectWatchPg.ChannelHelper.removeClass('show');
//        SelectWatchPg.DownCh.removeClass('show');
            Main.focus();
            break;
        case tvKey.KEY_UP:
            alert("SelectWatchPg_key : Up");
            if(show)   return;
            SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
            SelectWatchPg_index = (SelectWatchPg_index + SelectWatchPg.SelectWatchPgMenu.size() - 1) % SelectWatchPg.SelectWatchPgMenu.size();
            SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('focus');
            break;

        case tvKey.KEY_DOWN:
            alert("SelectWatchPg_key : Down");
            if(show)   return;            
            SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
            SelectWatchPg_index = (SelectWatchPg_index + SelectWatchPg.SelectWatchPgMenu.size() + 1) % SelectWatchPg.SelectWatchPgMenu.size();
            SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('focus');
            break;

        case tvKey.KEY_RIGHT:
            alert("SelectWatchPg_key : Right");
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            alert("SelectWatchPg_index : " + SelectWatchPg_index);
            if(show)   return;
            SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('select');
            jQuery('#popup').empty();
            Main.layout.subPage.load(subPageArr[SelectWatchPg_index].html, function (response, status, xhr) {
                if (status == "success") {
                    subPageArr[SelectWatchPg_index].object.onLoad();
                }
            });
            break;
        // case tvKey.KEY_VOL_UP:
        // case tvKey.KEY_PANEL_VOL_UP:
        //     alert("VOL_UP");
        //     if(webapis.audiocontrol.getMute() ==false)
        //         webapis.audiocontrol.setVolumeUp();
        //     break;
        // case tvKey.KEY_VOL_DOWN:
        // case tvKey.KEY_PANEL_VOL_DOWN:
        //     alert("VOL_DOWN");
        //     if(webapis.audiocontrol.getMute() ==false)
        //         webapis.audiocontrol.setVolumeDown();
        //     break;     
        // case tvKey.KEY_MUTE:
        //     alert("MUTE");
        //     if(webapis.audiocontrol.getMute() ==false)
        //         webapis.audiocontrol.setMute(true);
        //     else
        //         webapis.audiocontrol.setMute(false);
        //     break;
        default:
            alert("Unhandled key");
            break;
    }
};

