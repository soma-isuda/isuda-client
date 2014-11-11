//ISUDAschedule

var ISUDAscheduleSpg = {
    index: 0,//몇번째 방송을 가리키고 있는지
    ISUDAPxMove: 0,//편성표 부분 스크롤을 위한 변수
};

ISUDAscheduleSpg.onLoad = function () {
    alert("ISUDAscheduleSpg onLoad");
    subPageState = true; // 서브페이즈를 키고 있다고 표시


    //편성표 정보들을 로드한다.
    for (var i = 0; i < ISUDAschedule.length; i++) {
        var tempString = '';

        tempString += '<div>';
        tempString += '    <img class="ISUDAproductImg" src="' + SERVER_ADDRESS + '/pdLongImg/' + ISUDAschedule[i].productLongImgURL + '"/>';
        tempString += '    <div class="ISUDAproductProvider">' + ISUDAschedule[i].manufacturerName + '</div>';
        tempString += '    <div class="ISUDAproductName">' + ISUDAschedule[i].productName + '</div>';
        tempString += '</div>';
        jQuery('#ISUDAscheduleSpg #body').append(tempString);

    }
    jQuery.extend(ISUDAscheduleSpg, {
        product: jQuery('#ISUDAscheduleSpg #body>div'),
        anchor: {
            main: jQuery('#anchor_ISUDAscheduleSpg')
        }
    });
    //변수 초기화
    ISUDAscheduleSpg.index = 0;
    ISUDAscheduleSpg.ISUDAPxMove = 0;
    this.focus();
};

ISUDAscheduleSpg.focus = function () {
    alert("ISUDAscheduleSpg.focus");
    ISUDAscheduleSpg.anchor.main.focus();

    //첫번째에 포커스
    ISUDAscheduleSpg.showFocus();
};

ISUDAscheduleSpg.enableKeys = function () {
    document.getElementById("anchor").focus();
};

ISUDAscheduleSpg.keyDown = function () {
    alert("ISUDAscheduleSpg keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode);

    switch (keyCode) {
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", ISUDAscheduleSpg);
            break;
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("ISUDAscheduleSpg_key : RETURN");
        case tvKey.KEY_LEFT:
            alert("ISUDAscheduleSpg_key : Left");
            jQuery('#ISUDAscheduleSpg').hide();//페이지를 닫는다.	

            SelectWatchPg_index = 1;//마치 추천상품에서 로드된것처럼 되돌려준다.
            SelectWatchPg.focus(2);

            break;
        case tvKey.KEY_RIGHT:
            alert("ISUDAscheduleSpg_key : Right");
            break;
        case tvKey.KEY_UP:
            alert("ISUDAscheduleSpg_key : Up");
            /*
            if (ISUDAscheduleSpg.index > 0) {//상품이 위에 있을때
                ISUDAscheduleSpg.product.eq(ISUDAscheduleSpg.index--).removeClass('focus');
                ISUDAscheduleSpg.product.eq(ISUDAscheduleSpg.index).addClass('focus');
            }
            */
            //스크롤 구현 부분
            if ((ISUDAscheduleSpg.index - 1) * 365 == ISUDAscheduleSpg.ISUDAPxMove) {
                ISUDAscheduleSpg.ISUDAPxMove = 365 * (ISUDAscheduleSpg.index - 2);
                jQuery('#ISUDAscheduleSpg #body').css("margin-top", '-' + ISUDAscheduleSpg.ISUDAPxMove + 'px');
            }
            //기존 상품 포커스 제거
            ISUDAscheduleSpg.hideFocus();

            //대분류 카테고리의 맨위에 도달했을때 위의 키를 누르면 , 맨아래로 간다.
            if (ISUDAscheduleSpg.index == 0) {
                ISUDAscheduleSpg.index = ISUDAschedule.length - 1;
                ISUDAscheduleSpg.ISUDAPxMove = 365 * (ISUDAscheduleSpg.index - 1);
                jQuery('#ISUDAscheduleSpg #body').css("margin-top", '-' + ISUDAscheduleSpg.ISUDAPxMove + 'px');
            }
            else
                ISUDAscheduleSpg.index--;
            ISUDAscheduleSpg.showFocus();

            break;
        case tvKey.KEY_DOWN:
            alert("ISUDAscheduleSpg_key : Down");

            //스크롤 구현 부분
            if ((ISUDAscheduleSpg.index - 1) * 365 == ISUDAscheduleSpg.ISUDAPxMove) {
                ISUDAscheduleSpg.ISUDAPxMove = 365 * (ISUDAscheduleSpg.index);
                jQuery('#ISUDAscheduleSpg #body').css("margin-top", '-' + ISUDAscheduleSpg.ISUDAPxMove + 'px');
            }
            //기존 상품 포커스 제거
            ISUDAscheduleSpg.hideFocus();

            //대분류 카테고리의 맨 아래에 도달했을때 아래 키를 누르면, 맨위로 간다.
            if (ISUDAscheduleSpg.index == ISUDAschedule.length - 1) {
                ISUDAscheduleSpg.index = 0;
                jQuery('#ISUDAscheduleSpg #body').css("margin-top", "0px");
                ISUDAscheduleSpg.ISUDAPxMove = 0;
            }
            else
                ISUDAscheduleSpg.index++;
            ISUDAscheduleSpg.showFocus();

            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("ISUDAscheduleSpg_key : Enter");
            jQuery('#ISUDAscheduleSpg').hide();//페이지를 닫는다.  

            SelectWatchPg_index = 1;//마치 추천상품에서 로드된것처럼 되돌려준다.
            SelectWatchPg.focus(2);

            /*
            ISUDAPlayOrder[0] = [0, 1, 2, 3, 4];
ISUDAPlayOrder[1] = [0, 1, 2, 3, 4];
ISUDAPlayOrder[2] = [0, 1, 4, 2, 3];
ISUDAPlayOrder[3] = [0, 1, 4, 2, 3];
ISUDAPlayOrder[4] = [0, 2, 1, 3, 4];
ISUDAPlayOrder[5] = [0, 2, 1, 3, 4];
ISUDAPlayOrder[6] = [0, 2, 4, 3, 1];
ISUDAPlayOrder[6] = [0, 2, 4, 3, 1];
            */
            //이수다 편성표를 통해 방송을 건너뛸 경우
            //ISUDAPlayOrder에서 ISUDAPlayRotation을 변경해준다.
            var nextPlayIdx = T1QuestionAnswer[2] * 4 + T1QuestionAnswer[1] * 2 + T1QuestionAnswer[0];
            for (var i = 0; i < ISUDAPlayOrder[nextPlayIdx].length; i++) {
                if (ISUDAPlayOrder[nextPlayIdx][i] == ISUDAscheduleSpg.index)
                    ISUDAPlayRotation = i;
            }
            isNowPlaying = 1;//영상이 시간이 다되어서 종료되는게 아닐때의 예외 처리

            PlayerManager.play(ISUDAscheduleSpg.index);
            break;
        default:
            alert("Unhandled key");
            break;
    }
};

ISUDAscheduleSpg.showFocus = function () {
    var tempString = '<img src="img/ISUDAscheduleFocus.PNG" class="ISUDAscheduleFocus" />';
    jQuery('#ISUDAscheduleSpg #body>div').eq(ISUDAscheduleSpg.index).append(tempString);
}
ISUDAscheduleSpg.hideFocus = function () {
    jQuery('#ISUDAscheduleSpg #body>div').eq(ISUDAscheduleSpg.index).find('.ISUDAscheduleFocus').hide();
}

