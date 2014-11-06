popupMessage = function (message) {
    alert("PopUp m!!");
    jQuery('#popup').empty();//기존의 메세지들을 일단 지운다.
    jQuery('#popup').append('<div id="popupMessage">' + message + '</div>');
    $('#popupMessage').css("display", "block");
    setTimeout(function () {
        jQuery('#popup').empty();
    }, 2000);
};


var adjustState = false;
var adjustTimeout; // clearTimeout
popupAdjust = function () {
    alert("PopUp a!!");
    jQuery('#popup').empty();//기존의 메세지들을 일단 지운다.
    var tempString = '';
    tempString += '<div id="popupAdjust">';
    tempString += '	<div id="adjustImg">';
    tempString += '		<img src="img/adjust.png" style="max-width: 100%; max-heigh: 100%;">';
    tempString += '	</div>';
    tempString += '	<div id="adjustFooter">';
    tempString += '		<div id="adjustFooterButton">&nbsp&nbspA&nbsp&nbsp </div>';
    tempString += '		<div>상세페이지</div>';
    tempString += '	</div>';
    tempString += '</div>';
    jQuery('#popup').append(tempString);
    adjustState = true;
    $('#popupAdjust').css("display", "inline");
    adjustTimeout = setTimeout(function () {
        jQuery('#popup').empty();
        adjustState = false;
    }, 60000);
};
popupAdjustFull = function () {
    alert("PopUp a!!");
    jQuery('#popup').empty();//기존의 메세지들을 일단 지운다.
    clearTimeout(adjustTimeout);
    var tempString = '';
    tempString += '<div id="popupAdjustFull">';
    tempString += '		<img src="img/adjustFull.png" width="100%" height="100%">';
    tempString += '</div>';
    jQuery('#popup').append(tempString);
    $('#popupAdjustFull').css("display", "inline");
    focusBack = SelectWatchPg;

    jQuery('#anchor_popup').focus();
    // $('#popupAdjust').animate({height: "-=288px"},slow);
};
var popup_index; //팝업 내 버튼 포커스 처리를 위한 인덱
var focusBack; //되돌가기위한 포커스를 저장하놓는 곳 
popupMessageButton = function (message, returnFocus) {
    alert("PopUp b!!");
    focusBack = returnFocus;
    jQuery('#popup').empty();
    var tempString = '';
    tempString += '<div id="popupMessageButton">		';
    tempString += '		<div>' + message + '</div>';
    tempString += '		<div id="popupBtn1" class ="popupBtn">확인</div>	';
    tempString += '		<div id="popupBtn2" class ="popupBtn">취소</div>   ';
    tempString += '</div>								';
    jQuery('#popup').append(tempString);
    $('#popupMessageButton').css("display", "block");

    popup_index = 0;
    jQuery('#anchor_popup').focus();
    jQuery('.popupBtn').eq(1).removeClass('focus');
    jQuery('.popupBtn').eq(popup_index).addClass('focus');
};

popupkeyDown = function () {
    var keyCode = event.keyCode;
    alert("popup keyDown");
    //jQuery('.popupBtn').addClass('focus');
    switch (keyCode) {
        case tvKey.KEY_LEFT:
        case tvKey.KEY_RIGHT:
            jQuery('.popupBtn').eq(popup_index).removeClass('focus');
            if (popup_index == 0)
                jQuery('.popupBtn').eq(++popup_index).addClass('focus');
            else
                jQuery('.popupBtn').eq(--popup_index).addClass('focus');
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            if (popup_index == 0)
                widgetAPI.sendExitEvent();
            else
                focusBack.focus();
            jQuery('#popup').empty();
            break;
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            if (adjustState == true) {
                adjustState = false;
                popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", SelectWatchPg);
            }
            else widgetAPI.sendExitEvent();
            break;
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            adjustState = false;
            widgetAPI.blockNavigation(event);
            focusBack.focus();
            jQuery('#popup').empty();
            break;
        default:
            alert("Unhandled key");
            break;
    }

};


var ISUDAButtonNum;
var ISUDAFirstAccess = 1;//이수다 채널에 처음 접근하면 1, 아니면 0
//이수다 홈쇼핑에서 방송 중간중간에 뜨는 팝업
popupISUDA = function (message, buttons) {
    if(subPageSatae == false){
        alert("PopUp ISUDA!!");
        ISUDAButtonNum = buttons.length;
        alert('ISUDAButtonNum:' + ISUDAButtonNum);
        if (ISUDAButtonNum != 0) {//버튼이 있을때만 팝업으로 포커스를 넘긴다
            jQuery('#anchor_popupISUDA').focus();
        }
        jQuery('#popup').empty();//기존의 메세지들을 일단 지운다.
        var tempString = '';
        tempString += '<div id="popupISUDA">';
        tempString += '     <div>' + message + '</div>';
        tempString += '     <div>';
        for (var i = 0; i < ISUDAButtonNum; i++) {
            tempString += '     <div class="ISUDAButton">' + buttons[i] + '</div>';
        }
        tempString += '     </div>';
        tempString += '</div>';
        jQuery('#popup').append(tempString);
        if (ISUDAButtonNum == 0) {//메세지만 있는 팝업일 경우
            jQuery('#popupISUDA > div:nth-child(1)').css("height", "207px");
        }
        else
        jQuery('#popupISUDA > div:nth-child(1)').css("height", "130px");

        $('#popupISUDA').css("display", "block");
        var width = ((720 - (40 * ISUDAButtonNum)) / ISUDAButtonNum) + "px";
        $('#popupISUDA .ISUDAButton').css("width", width);
        $('#popupISUDA .ISUDAButton').css("margin-left", "20px");
        $('#popupISUDA .ISUDAButton').css("margin-right", "20px");

        popup_index = 0;
        jQuery('.ISUDAButton').eq(popup_index).addClass('focus');

        focusBack = SelectWatchPg;
    }
};

//이수다 팝업에서의 키처리를 담당하는 부분
popupISUDAkeyDown = function () {
    var keyCode = event.keyCode;
    alert("popup keyDown");
    //jQuery('.popupBtn').addClass('focus');
    switch (keyCode) {
        case tvKey.KEY_LEFT:
            if (popup_index > 0) {
                jQuery('.ISUDAButton').eq(popup_index).removeClass('focus');
                jQuery('.ISUDAButton').eq(--popup_index).addClass('focus');
            }
            break;
        case tvKey.KEY_RIGHT:
            if (popup_index < (ISUDAButtonNum - 1)) {
                jQuery('.ISUDAButton').eq(popup_index).removeClass('focus');
                jQuery('.ISUDAButton').eq(++popup_index).addClass('focus');
            }
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            if (ISUDAButtonNum != 0) {
                alert('호출!');
                focusBack.focus();
            }
            
            jQuery('#popup').empty();

            if (ISUDAFirstAccess == 1) {//채널에 처음 접근했을 때
                popupISUDA("반갑습니다! <br/>이수다홈쇼핑 입니다", []);
                
                ISUDAFirstAccess = 0;
                setTimeout(function () {
                    jQuery('#popup').empty();
                    SelectWatchPg.isudaPopup();
                    focusBack.focus('hide');/*포커스를 되돌리는 순간 팝업이 닫힌다*/
                }, 3000);//3초후에 팝업을 닫는다.
            }
            else {
                switch (SelectWatchPg.currentISUDAchannel) {
                    case 0://'MOMENT' 성준 & 탕웨이 출연 영화 | 코오롱스포츠 필름
                        if (indexInISUDAchannel == 0) {
                            if (popup_index == 0) {//"예"를 선택했을 경우
                                popupISUDA("듣고 계신 음악은 <br/> Gustav Mahler Symphony No.5, <br/>4악장입니다.", []);
                                Main.layout.subPage.load("app/html/InteractiveSpg.html", function (response, status, xhr) {
                                    if (status == "success") {
                                        alert("call InteractiveSpg onload");
                                        InteractiveSpg.onLoad();
                                    }
                                });
                                // setTimeout(function () {
                                //     jQuery('#popup').empty();
                                // }, 5000);//5초후에 팝업을 닫는다.
                                
                            }
                            else {//"아니요"를 선택했을 경우
                                focusBack.focus('hide');
                            }
                        }
                        else if (indexInISUDAchannel == 1) {
                            if (popup_index == 0) {//"예"를 선택했을 경우
                                popupISUDA("호주 BOMBO QUARRY의 Stockton Beach와 Long Jetty입니다.", []);
                                setTimeout(function () {
                                    jQuery('#popup').empty();
                                }, 5000);//5초후에 팝업을 닫는다.
                            }
                            else {//"아니요"를 선택했을 경우
                                focusBack.focus('hide');
                            }
                        }
                        
                        break;
                    case 1://배달의민족 소개영상
                        if (indexInISUDAchannel == 0) {
                            popupISUDA("구글플레이에서 <br/> '배달의 민족'앱을 이용해보세요!", []);
                            setTimeout(function () {
                                jQuery('#popup').empty();
                            }, 3000);//3초후에 팝업을 닫는다.
                        }
                        break;
                    case 2://[영현대] 서울의 랜드마크, 세계 최고의 자동차 테마파크를 꿈꾼다.
                        if (indexInISUDAchannel == 0) {
                            popupISUDA("young.hyundai.com/ <br/> 에 접속해보세요", []);
                            setTimeout(function () {
                                jQuery('#popup').empty();
                            }, 5000);//5초후에 팝업을 닫는다.
                        }
                        break;
                    case 3://[brilliant memories] 싼타페 그리고 프로포즈
                        if (indexInISUDAchannel == 0) { 
                            popupISUDA("http://brilliant.hyundai.com/kr/index.aspx <br/> 에 접속해보세요", []);
                            setTimeout(function () {
                                jQuery('#popup').empty();
                            }, 5000);//5초후에 팝업을 닫는다.
                        }
                        break;
                    case 4://[화제포착] 얼짱 각도 옛말…‘셀카봉’이 대세
                        if (indexInISUDAchannel == 0) {
                            popupISUDA("네이버에 셀카봉을 <br/>검색해보세요", []);
                            setTimeout(function () {
                                jQuery('#popup').empty();
                            }, 5000);//5초후에 팝업을 닫는다.
                        }
                        break;
                    case 5://[KR] Apple iPhone 6 (아이폰 6) 개봉기 [4K]
                        if (indexInISUDAchannel == 0) {
                            popupISUDA("아이폰이 구매되었습니다.", []);
                            setTimeout(function () {
                                jQuery('#popup').empty();
                            }, 5000);//5초후에 팝업을 닫는다.
                        }
                        break;
                    case 6://편강한의원
                        if (indexInISUDAchannel == 0) {
                            popupISUDA("아이폰이 구매되었습니다.", []);
                            setTimeout(function () {
                                jQuery('#popup').empty();
                            }, 5000);//5초후에 팝업을 닫는다.
                        }
                        break;
                    case 7://Takeout Your Garden Campaign
                        break;
                    case 8://2014년 10월 25일 신작 모바일 게임 피자에 팡!
                        break;
                    case 9://영화 역린, 백배 즐기기! 설민석의 정조이야기1부
                        break;
                }
            }
            break;
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            if (adjustState == true) {
                adjustState = false;
                popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", SelectWatchPg);
            }
            else widgetAPI.sendExitEvent();
            break;
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            adjustState = false;
            widgetAPI.blockNavigation(event);
            focusBack.focus();
            jQuery('#popup').empty();
            break;
        default:
            alert("Unhandled key");
            break;
    }

};