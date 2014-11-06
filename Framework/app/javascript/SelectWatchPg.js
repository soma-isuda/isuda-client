var SelectWatchPg_index = 0; // = subPageArr_index
//var channel = 0;

var indexInISUDAchannel;
var menuDisplayTimeout;
var channelDisplayTimeout;



var SelectWatchPg = {
    currentISUDAchannel: 0,//현재 나오고 있는 이수다 채널의 인덱스
    //    indexInISUDAchannel: 0,
    currentISUDAPopup: [],//어떤 이수다 채널에 진입했을때 팝업 예정인 것들의 setTimeout을 모아놓는 함수
};

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
    currentISUDAchannel = 0;
    SelectWatchPg.setData();
    if (PlayerManager.getChannel() == 5) {//처음에 이수다 채널에서 시작했으면
        SelectWatchPg.SelectWatchPgMenuElem.eq(1).html('방송 목록');
    }
    SelectWatchPg.SelectWatchPgMenu.addClass('show');

    SelectWatchPg.Channels.addClass('show');
    jQuery('#sideBar').removeClass('hide');

};

SelectWatchPg.focus = function (view) {
    alert("SelectWatchPg focus");
    //alert("view : "+view);
    if(view == 'hide'){
        SelectWatchPg.hideMenu();
        SelectWatchPg.hideChannel();
    }
    else { 
        SelectWatchPg.showMenu();
        SelectWatchPg.showChannel();
    }
    //    SelectWatchPg.DownCh.addClass('show');
    SelectWatchPg.SelectWatchPgMenuElem.eq(SelectWatchPg_index).removeClass('select');
    SelectWatchPg.SelectWatchPgMenuElem.eq(SelectWatchPg_index).addClass('focus');
    SelectWatchPg.anchor.main.focus();



    
//    if (PlayerManager.getChannel() == 5 && ISUDAFirstAccess == 1) {//처음에 이수다 채널에서 시작했으면
//        popupISUDA("오늘 기분이 어떠신가요?", ["좋아요", "별로에요"]);
//    }
    if(PlayerManager.getChannel() != 5){
//    else if(PlayerManager.getChannel() != 5){
        popupAdjust();
    }
};


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


SelectWatchPg.showMenu = function(){
    alert("showMenu");
    var show = false;
    if (!SelectWatchPg.SelectWatchPgMenu.hasClass('show')) {
        SelectWatchPg.SelectWatchPgMenu.addClass('show');
        jQuery('#sideBar').removeClass('hide');
        show = true;
    }
    clearTimeout(menuDisplayTimeout);
    menuDisplayTimeout = setTimeout(function () {
        SelectWatchPg.Channels.removeClass('show');
        SelectWatchPg.SelectWatchPgMenu.removeClass('show');
        if (page_index == 1)
            jQuery('#sideBar').addClass('hide');
    }, 7000);
    return show;
};
SelectWatchPg.hideMenu= function(){
    SelectWatchPg.Channels.removeClass('show');
    SelectWatchPg.SelectWatchPgMenu.removeClass('show');
    if (page_index == 1)
            jQuery('#sideBar').addClass('hide');
}
SelectWatchPg.showChannel = function(){
    alert("showChannel");
    var show = false;

    if (!SelectWatchPg.Channels.hasClass('show')) {
        SelectWatchPg.Channels.addClass('show');
        show = true;
    }
    clearTimeout(channelDisplayTimeout);
    channelDisplayTimeout = setTimeout(function () {
        SelectWatchPg.Channels.removeClass('show');
        SelectWatchPg.SelectWatchPgMenu.removeClass('show');
        if (page_index == 1)
            jQuery('#sideBar').addClass('hide');

    }, 7000);

    return show;

};
SelectWatchPg.hideChannel = function() {
    SelectWatchPg.Channels.removeClass('show');
    SelectWatchPg.SelectWatchPgMenu.removeClass('show');
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
                SelectWatchPg.isudaPopup();

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
                SelectWatchPg.isudaPopup();
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
            });
            break;
        default:
            alert("Unhandled key");
            break;
    }
};
SelectWatchPg.isudaPopup = function () {
    var tempFunction;
    indexInISUDAchannel = 0;//변수 초기화
    switch (currentISUDAchannel) {
        case 0://'MOMENT' 성준 & 탕웨이 출연 영화 | 코오롱스포츠 필름

            tempFunction = setTimeout(function () {
                indexInISUDAchannel = 0;//case 0 의 첫번째 팝업임을 의미함.
                popupISUDA("듣고 계신 음악이 궁금하신가요?", ["예", "아니요"]);
                SelectWatchPg.currentISUDAPopup.push(tempFunction);//함수 목록에 넣어놓는다.(나중에 채널 이동시 clearTimeout을 하기 위해)
            }, 6000);//영상이 시작하고 1분 후에 띄우는 팝업

            tempFunction = setTimeout(function () {
                indexInISUDAchannel = 1;//case 1 의 두번째 팝업임을 의미함.
                popupISUDA("이곳이 어디인지 궁금하신가요?", ["예", "아니요"]);
            }, 120000);//영상이 시작하고 2분후에 띄우는 팝업
            SelectWatchPg.currentISUDAPopup.push(tempFunction);//함수 목록에 넣어놓는다.(나중에 채널 이동시 clearTimeout을 하기 위해)

            break;
        case 1://배달의민족 소개영상
            tempFunction = setTimeout(function () {
                indexInISUDAchannel = 0;//case 1 의 첫번째 팝업임을 의미함.
                popupISUDA("배달의 민족에 대해 더 알고 싶으신가요?", ["예", "아니요"]);
            }, 60000);//영상이 시작하고 1분 후에 띄우는 팝업
            SelectWatchPg.currentISUDAPopup.push(tempFunction);//함수 목록에 넣어놓는다.(나중에 채널 이동시 clearTimeout을 하기 위해)
            break;

        case 2://[영현대] 서울의 랜드마크, 세계 최고의 자동차 테마파크를 꿈꾼다.
            tempFunction = setTimeout(function () {
                indexInISUDAchannel = 0;//case 1 의 첫번째 팝업임을 의미함.
                popupISUDA("영현대에 대해 더 알고싶으신가요?", ["예", "아니요"]);
            }, 60000);//영상이 시작하고 1분 후에 띄우는 팝업
            SelectWatchPg.currentISUDAPopup.push(tempFunction);//함수 목록에 넣어놓는다.(나중에 채널 이동시 clearTimeout을 하기 위해)

            break;
        case 3://[brilliant memories] 싼타페 그리고 프로포즈
            tempFunction = setTimeout(function () {

                indexInISUDAchannel = 0;//case 1 의 첫번째 팝업임을 의미함.
                popupISUDA("이벤트에 참가하실래요?", ["예", "아니요"]);
            }, 60000);//영상이 시작하고 1분 후에 띄우는 팝업
            SelectWatchPg.currentISUDAPopup.push(tempFunction);//함수 목록에 넣어놓는다.(나중에 채널 이동시 clearTimeout을 하기 위해)

            break;
        case 4://[화제포착] 얼짱 각도 옛말…‘셀카봉’이 대세
            tempFunction = setTimeout(function () {
                indexInISUDAchannel = 0;//case 1 의 첫번째 팝업임을 의미함.
                popupISUDA("셀카봉 구매하시겠습니까?", ["예", "아니요"]);
            }, 60000);//영상이 시작하고 1분 후에 띄우는 팝업
            SelectWatchPg.currentISUDAPopup.push(tempFunction);//함수 목록에 넣어놓는다.(나중에 채널 이동시 clearTimeout을 하기 위해)

            break;
        case 5://[KR] Apple iPhone 6 (아이폰 6) 개봉기 [4K]
            tempFunction = setTimeout(function () {
                indexInISUDAchannel = 0;//case 1 의 첫번째 팝업임을 의미함.
                popupISUDA("아이폰을 구매하시겠습니까?", ["예", "아니요"]);
            }, 60000);//영상이 시작하고 1분 후에 띄우는 팝업
            SelectWatchPg.currentISUDAPopup.push(tempFunction);//함수 목록에 넣어놓는다.(나중에 채널 이동시 clearTimeout을 하기 위해)

            break;
        case 6://편강한의원
            tempFunction = setTimeout(function () {
                indexInISUDAchannel = 0;//case 1 의 첫번째 팝업임을 의미함.
                popupISUDA("편강한의원은 언제든지 <br/>열려있습니다.", []);
            }, 60000);//영상이 시작하고 1분 후에 띄우는 팝업
            SelectWatchPg.currentISUDAPopup.push(tempFunction);//함수 목록에 넣어놓는다.(나중에 채널 이동시 clearTimeout을 하기 위해)

            break;
        case 7://Takeout Your Garden Campaign
            tempFunction = setTimeout(function () {
                indexInISUDAchannel = 0;//case 1 의 첫번째 팝업임을 의미함.
                popupISUDA("테유가와 함께<br/>그린캠페인에 참여하세요.", []);
            }, 60000);//영상이 시작하고 1분 후에 띄우는 팝업
            SelectWatchPg.currentISUDAPopup.push(tempFunction);//함수 목록에 넣어놓는다.(나중에 채널 이동시 clearTimeout을 하기 위해)

            break;
        case 8://2014년 10월 25일 신작 모바일 게임 피자에 팡!
            tempFunction = setTimeout(function () {
                indexInISUDAchannel = 0;//case 1 의 첫번째 팝업임을 의미함.
                popupISUDA("2014년 최고의 게임!<br/>피자에 팡과 함께 하세요.", []);
            }, 60000);//영상이 시작하고 1분 후에 띄우는 팝업
            SelectWatchPg.currentISUDAPopup.push(tempFunction);//함수 목록에 넣어놓는다.(나중에 채널 이동시 clearTimeout을 하기 위해)

            break;
        case 9://영화 역린, 백배 즐기기! 설민석의 정조이야기1부
            tempFunction = setTimeout(function () {
                indexInISUDAchannel = 0;//case 1 의 첫번째 팝업임을 의미함.
                popupISUDA("역린<br/>알고 보면 더 재밌습니다!", []);
            }, 60000);//영상이 시작하고 1분 후에 띄우는 팝업
            SelectWatchPg.currentISUDAPopup.push(tempFunction);//함수 목록에 넣어놓는다.(나중에 채널 이동시 clearTimeout을 하기 위해)

            break;
    }

}

//어떤 이수다 채널에 진입했을 때, 띄워질 예정들인 팝업들을 다 지워버리는 함수(채널 이동시 사용)
SelectWatchPg.clearPopupList = function () {
    for (var i = 0; i < SelectWatchPg.currentISUDAPopup.length; i++) {
        clearTimeout(SelectWatchPg.currentISUDAPopup[i]);
    }
    SelectWatchPg.currentISUDAPopup = [];//배열 초기화
}
