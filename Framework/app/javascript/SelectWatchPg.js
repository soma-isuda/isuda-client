var SelectWatchPg_index = 0; // = subPageArr_index
//var channel = 0;

var menuDisplayTimeout; //서브메뉴가 자동사라지는것을 없애기 위한 변수
var indexInISUDAchannel;

var SelectWatchPg = {
    currentISUDAPopup: [],//어떤 이수다 채널에 진입했을때 팝업 예정인 것들의 setTimeout을 모아놓는 함수
};

var subPageState = false; //서브페이지가 켜져있으면 true 안켜져있으면 false

SelectWatchPg.onLoad = function (ch) {
    alert("SelectWatchPg onLoad");
    jQuery.extend(SelectWatchPg, {

        Channels: jQuery("#Channels"),
        ChannelHelper: jQuery("#ChannelHelper"),
        ChannelDetail: jQuery("#ChannelDetail"),
        SelectWatchPgMenu: jQuery('#SelectWatchPgMenu'),
        SelectWatchPgMenuElem: jQuery('#SelectWatchPgMenu').find('ul > li'),
        anchor: {
            main: jQuery('#anchor_SelectWatchPg')
        }
    });

    PlayerManager.init(ch);
    SelectWatchPg_index = 0;
    SelectWatchPg.setData();
    if (PlayerManager.getChannel() == 5) {//이수다 채널에 들어오면 
        SelectWatchPg.SelectWatchPgMenuElem.eq(1).html('방송 목록');
    }

    SelectWatchPg.showMenu();
    SelectWatchPg.showChannel();
    clearTimeout(menuDisplayTimeout);

};

SelectWatchPg.focus = function (view) {
    alert("SelectWatchPg focus");

    switch(view){
        case 0://hide
            SelectWatchPg.Channels.removeClass('show');
            SelectWatchPg.SelectWatchPgMenu.removeClass('show');
            if (page_index == 1)
                jQuery('#sideBar').addClass('hide');
        break;
        case 1://channel
            SelectWatchPg.showChannel();        
            SelectWatchPg.SelectWatchPgMenu.removeClass('show');
            if (page_index == 1)
                jQuery('#sideBar').addClass('hide');
        break;
        case 2://menu
            SelectWatchPg.Channels.removeClass('show');
            SelectWatchPg.showMenu();
        break;
        default://all
            SelectWatchPg.showChannel();        
            SelectWatchPg.showMenu();
        break;
    }
    //alert("view : "+view);
    /*
    if (view == 'hide') {
        SelectWatchPg.Channels.removeClass('show');
        SelectWatchPg.SelectWatchPgMenu.removeClass('show');
        if (page_index == 1)
            jQuery('#sideBar').addClass('hide');
    }
    if (view == 'hide') {
        SelectWatchPg.Channels.removeClass('show');
        SelectWatchPg.SelectWatchPgMenu.removeClass('show');
        if (page_index == 1)
            jQuery('#sideBar').addClass('hide');
    }    
    else {
        SelectWatchPg.showMenu();
        SelectWatchPg.showChannel();
    }*/
    //    SelectWatchPg.DownCh.addClass('show');
    
    
    SelectWatchPg.SelectWatchPgMenuElem.eq(SelectWatchPg_index).removeClass('select');
    SelectWatchPg.SelectWatchPgMenuElem.eq(SelectWatchPg_index).addClass('focus');
    SelectWatchPg.anchor.main.focus();
    //alert('subPageState : '+ subPageState);

    if (PlayerManager.getChannel() != 5) {
        //    else if(PlayerManager.getChannel() != 5){
        popupAdjust();
    }
    else if(subPageState==true){
        subPageState = false;
        if(popupIgnoreflg == true){
            popupIgnoreflg = false; // 여기에 포커스가 왔다는것은 서브페이지가 안열려있는 상태이다.
            popupISUDAinit();
        }
    }


    //    if (PlayerManager.getChannel() == 5 && ISUDAFirstAccess == 1) {//처음에 이수다 채널에서 시작했으면
    //        popupISUDA("오늘 기분이 어떠신가요?", ["좋아요", "별로에요"]);
    //    }
    
};
//채널 헬퍼
SelectWatchPg.setData = function () {
    var upch = PlayerManager.getUpChannel();
    var nowch = PlayerManager.getChannel();
    var downch = PlayerManager.getDownChannel();

    console.log(upch);
    console.log(downch);

    var tempstring = '';

    tempstring += '<div class="Channel">' + providers[channels[upch]].getName() + '</div>';
    tempstring += '<div id="NowChannel">' + providers[channels[nowch]].getName() + '</div>';
    tempstring += '<div class="Channel">' + providers[channels[downch]].getName() + '</div>';

    SelectWatchPg.ChannelHelper.html(tempstring);
    //    SelectWatchPg.ChannelHelper.css('color', color[nowch]);

    jQuery.ajax({
        url: SERVER_ADDRESS + '/now',
        type: 'GET',
        data: ({ providerNum: nowch }),
        dataType: 'json',
        success: function (data) {
            SelectWatchPg.ChannelDetail.html(data.productName);
        }
    });
};


SelectWatchPg.showMenu = function () {
    alert("showMenu");
    var show = false;

    if (!SelectWatchPg.SelectWatchPgMenu.hasClass('show')) {
        SelectWatchPg.SelectWatchPgMenu.addClass('show');
        jQuery('#sideBar').removeClass('hide');
        SelectWatchPg.SelectWatchPgMenu.animate({ left: '0px' }, "1000");
        //SelectWatchPg.SelectWatchPgMenu.removeClass('hide');
        show = true;
    }
    clearTimeout(menuDisplayTimeout);
    menuDisplayTimeout = setTimeout(function () {
        SelectWatchPg.Channels.removeClass('show');
        SelectWatchPg.SelectWatchPgMenu.animate({ left: '-300px' }, "1000");

        // SelectWatchPg.SelectWatchPgMenu.addClass('hide');
        setTimeout(function () {
            SelectWatchPg.SelectWatchPgMenu.removeClass('show');
            if (page_index == 1)
                jQuery('#sideBar').addClass('hide');
        }, 800);

    }, 7000);
    return show;
};
SelectWatchPg.hideMenu = function () {
  //  SelectWatchPg.Channels.removeClass('show');
    SelectWatchPg.SelectWatchPgMenu.removeClass('show');
    if (page_index == 1)
        jQuery('#sideBar').addClass('hide');
}
SelectWatchPg.showChannel = function () {
    alert("showChannel");
    var show = false;

    if (!SelectWatchPg.Channels.hasClass('show')) {
        SelectWatchPg.Channels.addClass('show');
        show = true;
    }
    clearTimeout(menuDisplayTimeout);
    menuDisplayTimeout = setTimeout(function () {
        SelectWatchPg.Channels.removeClass('show');
        SelectWatchPg.SelectWatchPgMenu.animate({ left: '-300px' }, "1000");

        // SelectWatchPg.SelectWatchPgMenu.addClass('hide');
        setTimeout(function () {
            SelectWatchPg.SelectWatchPgMenu.removeClass('show');
            if (page_index == 1)
                jQuery('#sideBar').addClass('hide');
        }, 800);
    }, 7000);

    return show;

};
SelectWatchPg.hideChannel = function () {
    SelectWatchPg.Channels.removeClass('show');
 //   SelectWatchPg.SelectWatchPgMenu.removeClass('show');
    if (page_index == 1)
        jQuery('#sideBar').addClass('hide');
}

SelectWatchPg.keyDown = function () {
    alert("SelectWatchPg keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode);
    alert(SelectWatchPg_index);
    var menushow = false;
    var channelshow = false;

    switch (keyCode) {
        case tvKey.KEY_RED:
            if (adjustState == true)
                popupAdjustFull();
            break;
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", SelectWatchPg);
            break;
            //       채널 퀵변경 
        case tvKey.KEY_CH_UP:
            SelectWatchPg.showChannel();
            alert("현재 채널의 인덱스" + PlayerManager.getChannel());
            if (PlayerManager.getUpChannel() == 5) {//다음 채널이 이수다 홈쇼핑이면

                SelectWatchPg.SelectWatchPgMenuElem.eq(1).html('방송 목록');
                //SelectWatchPg.isudaPopup();

            }

            else if (PlayerManager.getChannel() == 5)
                SelectWatchPg.SelectWatchPgMenuElem.eq(1).html('추천 정보');

            PlayerManager.channelUp();
            SelectWatchPg.setData();
            SelectWatchPg.clearPopupList();
            break;
        case tvKey.KEY_CH_DOWN:
            SelectWatchPg.showChannel();
            alert("현재 채널의 인덱스" + PlayerManager.getChannel());
            if (PlayerManager.getDownChannel() == 5) {//다음 채널이 이수다 홈쇼핑이면
                SelectWatchPg.SelectWatchPgMenuElem.eq(1).html('방송 목록');
                //SelectWatchPg.isudaPopup();
            }
            else if (PlayerManager.getChannel() == 5)
                SelectWatchPg.SelectWatchPgMenuElem.eq(1).html('추천 정보');

            PlayerManager.channelDown();
            SelectWatchPg.setData();
            SelectWatchPg.clearPopupList();
            break;

        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            alert("SelectWatchPg_key : RETURN");
            widgetAPI.blockNavigation(event);
        case tvKey.KEY_LEFT:
            alert("SelectWatchPg_key : Left");
            if (SelectWatchPg.showMenu()) return;

            jQuery('#popup').empty(); // 광고가 있을경우 광고를 지운다.
            //          SelectWatchPg.anchor.main.removeClass('focus');
            SelectWatchPg.SelectWatchPgMenuElem.eq(SelectWatchPg_index).removeClass('focus');
            //            SelectWatchPg.SelectWatchPgMenu.removeClass('show');

            //            SelectWatchPg.Channels.removeClass('show');
            SelectWatchPg.clearPopupList();

            Main.focus();
            break;
        case tvKey.KEY_UP:
            alert("SelectWatchPg_key : Up");
            if (SelectWatchPg.showMenu()) return;
            SelectWatchPg.SelectWatchPgMenuElem.eq(SelectWatchPg_index).removeClass('focus');
            SelectWatchPg_index = (SelectWatchPg_index + SelectWatchPg.SelectWatchPgMenuElem.size() - 1) % SelectWatchPg.SelectWatchPgMenuElem.size();
            SelectWatchPg.SelectWatchPgMenuElem.eq(SelectWatchPg_index).addClass('focus');
            break;

        case tvKey.KEY_DOWN:
            alert("SelectWatchPg_key : Down");
            if (SelectWatchPg.showMenu()) return;
            SelectWatchPg.SelectWatchPgMenuElem.eq(SelectWatchPg_index).removeClass('focus');
            SelectWatchPg_index = (SelectWatchPg_index + SelectWatchPg.SelectWatchPgMenuElem.size() + 1) % SelectWatchPg.SelectWatchPgMenuElem.size();
            SelectWatchPg.SelectWatchPgMenuElem.eq(SelectWatchPg_index).addClass('focus');
            break;

        case tvKey.KEY_RIGHT:
            alert("SelectWatchPg_key : Right");
            SelectWatchPg.Channels.removeClass('show');
            SelectWatchPg.SelectWatchPgMenu.animate({ left: '-300px' }, "1000");

            // SelectWatchPg.SelectWatchPgMenu.addClass('hide');
            setTimeout(function () {
                SelectWatchPg.SelectWatchPgMenu.removeClass('show');
                if (page_index == 1)
                    jQuery('#sideBar').addClass('hide');
            }, 800);
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            alert("SelectWatchPg_index : " + SelectWatchPg_index);
            if (SelectWatchPg.showMenu()) return;
            SelectWatchPg.SelectWatchPgMenuElem.eq(SelectWatchPg_index).addClass('select');
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
                //else if (statue == "fail") {

                //}
            });
            break;
        default:
            alert("Unhandled key");
            break;
    }
};
//settmeout을 하기위해 거쳐가는 
SelectWatchPg.isudaPopup = function (idx, questionIdx) {
    //어떤 이수다 채널에 접근했을 때 팝업을 시작하는 함수
    alert('SelectWatchPg.isudaPopup called');
    indexInISUDAchannel++;//하나의 영상 안에서 몇번째 팝업인지 

    var tempFunction;
    currentQuestionIdx = questionIdx;//현재 띄워질 예정인 팝업의 인덱스

    alert('다음 질문 : ' + popupQuestion[idx][currentQuestionIdx].question);
    alert('다음 질문까지 대기 시간 : ' + popupQuestion[idx][currentQuestionIdx].waitingTime + 'ms');
    alert('다음 질문의 인덱스 : ' + popupQuestion[idx][currentQuestionIdx].ifYes);

    tempFunction = setTimeout(function () {
            popupISUDA(popupQuestion[idx][currentQuestionIdx].question, popupQuestion[idx][currentQuestionIdx].answer);
    }, popupQuestion[idx][currentQuestionIdx].waitingTime);//영상이 시작하고 popupQuestion[questionIdx].waitingTime 후에 띄우는 팝업
    SelectWatchPg.currentISUDAPopup.push(tempFunction);//함수 목록에 넣어놓는다.(나중에 채널 이동시 clearTimeout을 하기 위해)
}

//어떤 이수다 채널에 진입했을 때, 띄워질 예정들인 팝업들을 지우는 함수
SelectWatchPg.clearPopupList = function () {
    for (var i = 0; i < SelectWatchPg.currentISUDAPopup.length; i++) {
        clearTimeout(SelectWatchPg.currentISUDAPopup[i]);
    }
    SelectWatchPg.currentISUDAPopup = [];//배열 초기화
    jQuery('#popup').empty();//팝업을 없앤다
}
