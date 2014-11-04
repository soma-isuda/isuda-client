var SelectWatchPg_index = 0; // = subPageArr_index
//var channel = 0;
//var PlayerManagerInit = false;

var SelectWatchPg = {

};

SelectWatchPg.onLoad = function (ch) {
    alert("SelectWatchPg onLoad");
    jQuery.extend(SelectWatchPg, {
        Channels:jQuery("#Channels"),
        ChannelHelper : jQuery("#ChannelHelper"),
        ChannelDetail : jQuery("#ChannelDetail"),        
//        UpCh: jQuery("#ChannelUp"),
//        DownCh : jQuery("#ChannelDown"),
        SelectWatchPgMenu: jQuery('#SelectWatchPgMenu').find('ul > li'),
        anchor: {
            main: jQuery('#anchor_SelectWatchPg')
        }
    });

    PlayerManager.init(ch);
    SelectWatchPg_index = 0;
    SelectWatchPg.setData();
    if (PlayerManager.getChannel() == 5) {//처음에 이수다 채널에서 시작했으면
        SelectWatchPg.SelectWatchPgMenu.eq(1).html('방송<br>목록');
    }
};

SelectWatchPg.focus = function () {
    alert("SelectWatchPg focus");
    jQuery('#SelectWatchPgMenu').addClass('show');
    SelectWatchPg.Channels.addClass('show');
    jQuery('#sideBar').removeClass('hide');        

//    SelectWatchPg.DownCh.addClass('show');
    SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('select');
    SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('focus');
    SelectWatchPg.anchor.main.focus();

    clearTimeout(menuDisplayTimeout);
    menuDisplayTimeout = setTimeout(function () {
        jQuery('#SelectWatchPgMenu').removeClass('show');
        SelectWatchPg.Channels.removeClass('show');
        if(page_index == 1)
            jQuery('#sideBar').addClass('hide');        
//        SelectWatchPg.DownCh.removeClass('show');
    }, 7000);
    //       alert("asdads");
    //   });
    popupAdjust();
};

SelectWatchPg.setData = function(){
    var upch = PlayerManager.getUpChannel();
    var nowch = PlayerManager.getChannel();
    var downch = PlayerManager.getDownChannel();

    console.log(upch);
    console.log(downch);

    var tempstring = '';
    tempstring += '<div class="Channel">' + providers[channels[upch]].getName()+'</div>';
    tempstring += '<div id="NowChannel">' + providers[channels[nowch]].getName()+'</div>';
    tempstring += '<div class="Channel">' + providers[channels[downch]].getName() +'</div>';
    SelectWatchPg.ChannelHelper.html(tempstring);
//    SelectWatchPg.ChannelHelper.css('color', color[nowch]);

    jQuery.ajax({
        url: SERVER_ADDRESS + '/now',
        type : 'GET',
        data: ({ providerNum: nowch }),    
        dataType : 'json',
        success : function (data) {
            SelectWatchPg.ChannelDetail.html(data.productName);
        }
    });

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

    if(!SelectWatchPg.Channels.hasClass('show')){
        jQuery('#SelectWatchPgMenu').addClass('show');
        SelectWatchPg.Channels.addClass('show');
        jQuery('#sideBar').removeClass('hide');        

        show = true;
    }
//    SelectWatchPg.DownCh.addClass('show');

    clearTimeout(menuDisplayTimeout);
    menuDisplayTimeout = setTimeout(function () {
        jQuery('#SelectWatchPgMenu').removeClass('show');
        SelectWatchPg.Channels.removeClass('show');
        if(page_index == 1)
            jQuery('#sideBar').addClass('hide');
    }, 7000);

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
            alert("현재 채널의 인덱스" + PlayerManager.getChannel());
            if (PlayerManager.getUpChannel() == 5) {//다음 채널이 이수다 홈쇼핑이면
                SelectWatchPg.SelectWatchPgMenu.eq(1).html('방송 목록');
            }
            else if(PlayerManager.getChannel()==5)
                SelectWatchPg.SelectWatchPgMenu.eq(1).html('추천 정보');

            PlayerManager.channelUp();
            SelectWatchPg.setData();

            break;
        case tvKey.KEY_CH_DOWN:
            alert("현재 채널의 인덱스" + PlayerManager.getChannel());
            if (PlayerManager.getDownChannel() == 5) {//다음 채널이 이수다 홈쇼핑이면
                SelectWatchPg.SelectWatchPgMenu.eq(1).html('방송 목록');
            }
            else if (PlayerManager.getChannel() == 5)
                SelectWatchPg.SelectWatchPgMenu.eq(1).html('추천 정보');

            PlayerManager.channelDown();
            SelectWatchPg.setData();

            break;

        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            alert("SelectWatchPg_key : RETURN");
            widgetAPI.blockNavigation(event);
        case tvKey.KEY_LEFT:
            alert("SelectWatchPg_key : Left");
                        if(show)   return;

            jQuery('#popup').empty(); // 광고가 있을경우 광고를 지운다.
            //          SelectWatchPg.anchor.main.removeClass('focus');
            SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
            jQuery('#SelectWatchPgMenu').removeClass('show');
            SelectWatchPg.Channels.removeClass('show');
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

            //이수다 채널을 보고 있을때의 예외 처리
            if (SelectWatchPg_index == 1 && PlayerManager.getChannel() == 5) {
                //추천상품 대신에 이수다 편성표를 보여준다.
                SelectWatchPg_index = 4;
            }

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

