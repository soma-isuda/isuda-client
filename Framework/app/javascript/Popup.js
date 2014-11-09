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
    if(subPageState == false){//선택보기에서 서브페이지가 안켜져 있을 때
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
            
            jQuery('#popup').empty();
            
            if (ISUDAFirstAccess == 1) {//이수다 채널에 처음 접근했을 때
                ISUDAFirstAccess = 0;
                popupISUDA("반갑습니다! <br/>이수다홈쇼핑 입니다", []);

                setTimeout(function () {
                    jQuery('#popup').empty();
                    SelectWatchPg.clearPopupList();//팝업리스트에서 현재 질문을 지운다.
                    //현재 채널에서의 첫번째 팝업을 등록한다.
                    indexInISUDAchannel = -1;//변수 초기화
                    SelectWatchPg.isudaPopup(currentMovieIdx, startQuestion[currentMovieIdx]);
                }, 3000);//3초후에 팝업을 닫는다.

                focusBack.focus('hide');//포커스를 되돌린다
            }
            else {
                if (popup_index == 0) {//"예"를 선택했을 경우
                    if (popupQuestion[currentQuestionIdx].moreInfoIndex == -1) {//해당 질문이 추가정보를 로드하지 않을때
                        alert("yes");
                        SelectWatchPg.clearPopupList();//팝업리스트에서 현재 질문을 지운다.
                        if (popupQuestion[currentQuestionIdx].ifYes == -1)//더이상의 질문이 없을때
                            alert('질문이 종료되었습니다.');
                        else 
                            SelectWatchPg.isudaPopup(currentMovieIdx, popupQuestion[currentQuestionIdx].ifYes);//다음질문등록
                        
                        focusBack.focus('hide');//포커스를 되돌린다
                    }
                    else {//해당 질문이 추가정보를 로드할 때
                        
                        Main.layout.subPage.load("app/html/InteractiveSpg.html", function (response, status, xhr) {//상세 정보 페이지를 로드한다.
                            if (status == "success") {
                                alert("call InteractiveSpg onload");
                                InteractiveSpg.onLoad();

                                if (popupQuestion[popupQuestion[currentQuestionIdx].ifYes].waitingTime == 0) {//추가 정보를 로드하는데, 위에 정보 팝업이 띄워져 있는 경우
                                    SelectWatchPg.isudaPopup(currentMovieIdx, popupQuestion[currentQuestionIdx].ifYes);//다음질문등록
                                    //ex)듣고 계신 음악은 <br/> Gustav Mahler Symphony No.5, <br/>4악장입니다.
                                }
                            }
                        });
                        
                    }
                }
                else {//"아니요"를 선택했을 경우
                    SelectWatchPg.clearPopupList();//팝업리스트에서 현재 질문을 지운다.
                    if (popupQuestion[currentQuestionIdx].ifNo == -1) //더이상의 질문이 없을 때
                        alert('질문이 종료되었습니다.');
                    else 
                        SelectWatchPg.isudaPopup(currentMovieIdx, popupQuestion[currentQuestionIdx].ifNo);//다음질문등록
                    
                    focusBack.focus('hide');//포커스를 되돌린다
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

var popupQuestion = new Array();//팝업에 뜨는 질문들의 리스트(객체 배열)
var startQuestion = new Array();//어떤 방송에 대한 시작 질문의 인덱스
var currentQuestionIdx;//현재 띄워져 있는 팝업의 인덱스
var currentMovieIdx;//현재 이수다 채널에서 방송중인 동영상의 인덱스
//사용법, -------------------------------필독-------------------------------
/*
    질문 하나당 객체의 형태는 다음과 같아
       {
            question:'지금 쓰고 있는 폰이 갤럭시 노트니?',
            buttonNum:2,//현재 질문의 버튼 개수
            moreInfoIndex: -1,//해당 질문에 대해 추가 정보가 없을 때
            ifYes:3,//값이 -1이면 yes시 종료(buttonNum이 1이상일떄 의미가 있음)
            ifNo:2,//값이 -1이면 no시 종료(buttonNum이 2일때 의미가 있음)
            waitingTime:3000//이전 질문이 완료되고 현재 질문이 뜨기 까지 기다리는 시간(ms단위)
        }

    방송이 시작할 때 Player.js에서 
    SelectWatchPg.isudaPopup(idx,startIdx)함수를 호출하게 되는데,
    startIdx에 들어가는 값이 
    시작질문의 인덱스!

    시작질문의 인덱스는 어떻게 얻어오냐면,
    startQuestion['현재 방송의 인덱스'] !
    즉, SelectWatchPg.isudaPopup(idx,startQuestion[idx]) 형태로 호출하게 되.

    따라서, 질문들을 popupQuestion 배열에 쭉 넣으면 되고
    popupQuestion.push({
        question:'지금 쓰고 있는 폰이 갤럭시 노트니?',
            buttonNum:2,//현재 질문의 버튼 개수
            moreInfoIndex: -1,//해당 질문에 대해 추가 정보가 없을 때
            ifYes:3,//값이 -1이면 yes시 종료(buttonNum이 1이상일떄 의미가 있음)
            ifNo:2,//값이 -1이면 no시 종료(buttonNum이 2일때 의미가 있음)
            waitingTime:3000//이전 질문이 완료되고 현재 질문이 뜨기 까지 기다리는 시간(ms단위)
    }); 처럼..
    다 넣은 다음에는 
    어떤 방송의 시작질문을 startQuestion에 넣으면 된다는거!

    예를 들어, 갤럭시 노트엣지 방송의 플레이 순서가 3번째 이고, 
    첫번째 질문의 popupQuestion에서의 인덱스가 30이면
    startQuestion[2]=30;으로 해주면 되~

    **제약사항**
    1. 어떤 질문의 버튼 개수는 최대 2개로 제한
    2. ifYes는 첫번째 버튼을 눌렀을떄, ifNo는 두번째 버튼을 눌렀을때
     이동하는 다음 질문의 인덱스
    3. 추가정보를 띄우는 팝업(hasMoreInfo!=-1)은 그 팝업이 사용자에 의해 닫혔을 때
    waitingtime만큼 기다리고 다음 질문(ifYes)로 이동한다.
    4. 메세지만 띄우는 팝업은 buttonNum값이 무조건 0이다. 
    메세지만 띄우고 그 다음 질문으로 연결시키고 싶으면 ifYes에 값을 부여한다.

*/

//이수다 채널에 처음 접근했을 때의 질문----------------------------------------------------
popupQuestion.push({//인덱스0
    question: '오늘 기분이 어떠신가요?',
    anwer:["좋아","별로"],
    buttonNum: 2,//현재 질문의 버튼 개수
    moreInfoIndex: -1,//현재 질문에서 yes를 눌렀을 때, 하단에 뜨는 추가정보의 인덱스
    ifYes: -1,//값이 없으면 yes시 종료
    ifNo: -1,//값이 없으면 no시 종료
    waitingTime: 1000//ms단위(해당 질문이 뜨기까지 걸리는 시간)
});

//코오롱 시나리오----------------------------------------------------
startQuestion[0] = 1;//코오롱의 플레이 순서가 1번째 이고, 시작질문의 인덱스가 1이라는 의미
popupQuestion.push({//인덱스1
    question: '듣고 계신 음악이 궁금하신가요?',
    anwer: ["응", "아니"],
    buttonNum: 2,//현재 질문의 버튼 개수
    moreInfoIndex: 1,//현재 질문에서 yes를 눌렀을 때, 하단에 뜨는 추가정보의 인덱스
    ifYes: 2,//값이 없으면 yes시 종료
    ifNo: 3,//값이 없으면 no시 종료
    waitingTime: 6000//ms단위
});

popupQuestion.push({//인덱스2
    question: '듣고 계신 음악은 <br/> Gustav Mahler Symphony No.5, <br/>4악장입니다.',
    anwer: [],
    buttonNum: 0,//현재 질문의 버튼 개수
    moreInfoIndex: -1,//현재 질문에서 yes를 눌렀을 때, 하단에 뜨는 추가정보의 인덱스
    ifYes: 3,//값이 없으면 yes시 종료
    ifNo: 3,//값이 없으면 no시 종료
    waitingTime: 0//ms단위(바로뜸)
});

popupQuestion.push({//인덱스3
    question: '이곳이 어디인지 궁금하신가요?',
    anwer: ["응", "아니"],
    buttonNum: 2,//현재 질문의 버튼 개수
    moreInfoIndex: 2,//현재 질문에서 yes를 눌렀을 때, 하단에 뜨는 추가정보의 인덱스
    ifYes: 4,//값이 -1이면 yes시 종료
    ifNo: -1,//값이 -1이면 no시 종료
    waitingTime: 6000//ms단위
});

popupQuestion.push({//인덱스4
    question: '호주 BOMBO QUARRY의 Stockton Beach와 Long Jetty입니다.',
    anwer: [],
    buttonNum: 0,//현재 질문의 버튼 개수
    moreInfoIndex: -1,//현재 질문에서 yes를 눌렀을 때, 하단에 뜨는 추가정보의 인덱스
    ifYes: -1,//값이 없으면 yes시 종료
    ifNo: -1,//값이 없으면 no시 종료
    waitingTime: 0//ms단위(바로뜸)
});


//갤럭시 노트 시나리오----------------------------------------------------
startQuestion[3] = 5;//갤럭시 노트의 플레이 순서가 4번째 이고, 시작질문의 인덱스가0이라 가정
popupQuestion.push({//인덱스5
    question: '지금 쓰고 있는 폰이 갤럭시 노트니?',
    anwer: ["응", "아니"],
    buttonNum:2,//현재 질문의 버튼 개수
    moreInfoIndex: -1,
    ifYes: 6,//값이 없으면 yes시 종료
    ifNo: 7,//값이 없으면 no시 종료
    waitingTime: 12000//ms단위, 즉 방송이 시작하고 6초 후에 첫번째 팝업이 뜬다는 의미
});

popupQuestion.push({//인덱스6
    question: '갤럭시 노트가 참 괜찮은거 같아. 그치?',
    anwer: ["응", "아니"],
    buttonNum: 2,//현재 질문의 버튼 개수
    moreInfoIndex: -1,
    ifYes: 8,//값이 없으면 yes시 종료
    ifNo: 9,//값이 없으면 no시 종료
    waitingTime: 6000//ms단위
});

popupQuestion.push({//인덱스7
    question: '하긴, 요새 좋은 핸드폰이 참 많은거 같아',
    anwer: ["응", "아니"],
    buttonNum: 2,//현재 질문의 버튼 개수
    moreInfoIndex: -1,
    ifYes: 10,//값이 없으면 yes시 종료
    ifNo: 11,//값이 없으면 no시 종료
    waitingTime: 6000//ms단위
});

popupQuestion.push({//인덱스8
    question: '혹시 핸드폰 바꿀 생각이 있니?',
    anwer: ["응", "아니"],
    buttonNum: 2,//현재 질문의 버튼 개수
    moreInfoIndex: 1,//현재 질문에서 yes를 눌렀을 때, 하단에 뜨는 추가정보의 인덱스
    ifYes: -1,//값이 없으면 yes시 종료
    ifNo: -1,//값이 없으면 no시 종료
    waitingTime: 6000//ms단위
});

popupQuestion.push({//인덱스9
    question: '하긴, 요새 갤럭시 노트 말고도 좋은게 정말 많아',
    anwer: [],
    buttonNum: 0,//현재 질문의 버튼 개수
    moreInfoIndex: -1,//현재 질문에서 yes를 눌렀을 때, 하단에 뜨는 추가정보의 인덱스
    ifYes: -1,//값이 없으면 yes시 종료
    ifNo: -1,//값이 없으면 no시 종료
    waitingTime: 3000//ms단위
});

popupQuestion.push({//인덱스10
    question: '그래도 갤럭시 노트 한번 써보지 않을래?',
    anwer: ["응", "아니"],
    buttonNum: 2,//현재 질문의 버튼 개수
    moreInfoIndex: 1,//현재 질문에서 yes를 눌렀을 때, 하단에 뜨는 추가정보의 인덱스
    ifYes: -1,//값이 없으면 yes시 종료
    ifNo: -1,//값이 없으면 no시 종료
    waitingTime: 6000//ms단위
});

popupQuestion.push({//인덱스11
    question: '맞아 핸드폰은 오래 쓰는게 최고야!',
    anwer: [],
    buttonNum: 0,//현재 질문의 버튼 개수
    moreInfoIndex: -1,//현재 질문에서 yes를 눌렀을 때, 하단에 뜨는 추가정보의 인덱스
    ifYes: -1,//값이 없으면 yes시 종료
    ifNo: -1,//값이 없으면 no시 종료
    waitingTime: 3000//ms단위
});






