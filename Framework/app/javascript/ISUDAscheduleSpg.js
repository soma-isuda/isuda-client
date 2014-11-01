﻿//ISUDAschedule

var ISUDAscheduleSpg = {
    index: 0,//몇번째 방송을 가리키고 있는지
    ISUDAPxMove:0,//편성표 부분 스크롤을 위한 변수
};

ISUDAscheduleSpg.onLoad = function () {
    alert("ISUDAscheduleSpg onLoad");
    
    //편성표 정보들을 로드한다.
    for (var i = 0; i < ISUDAschedule.length; i++) {
        var tempString = '';
        tempString += '<div>';
        tempString += '    <img class="ISUDAproductImg" src="'+SERVER_ADDRESS + '/pdLongImg/' + ISUDAschedule[i].productLongImgURL+ '"/>';
        tempString += '    <div class="ISUDAproductInfo">';
        alert(ISUDAschedule[i].productName);
        tempString += '        <div class="productName">' + ISUDAschedule[i].productName + '</div>';
        tempString += '        <div class="productDetail">';
        tempString += '            <div>' + ISUDAschedule[i].manufacturerName + '</div>';

        if (ISUDAschedule[i].productPrice)
            tempString += '            <div><p>최대혜택가</p>' + ISUDAschedule[i].productPrice + '</div>';
        else
            tempString += '            <div><p>최대혜택가</p>방송 중 확인</div>';

        tempString += '        </div>';
        tempString += '    </div>';
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
    ISUDAscheduleSpg.product.eq(ISUDAscheduleSpg.index).addClass('focus');
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
            SelectWatchPg.focus();

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
            if ((ISUDAscheduleSpg.index - 1) * 243 == ISUDAscheduleSpg.ISUDAPxMove) {
                ISUDAscheduleSpg.ISUDAPxMove = 243 * (ISUDAscheduleSpg.index - 2);
                jQuery('#ISUDAscheduleSpg #body').css("margin-top", '-' + ISUDAscheduleSpg.ISUDAPxMove + 'px');
            }
            //기존 상품 포커스 제거
            ISUDAscheduleSpg.product.eq(ISUDAscheduleSpg.index).removeClass('focus');

            //대분류 카테고리의 맨위에 도달했을때 위의 키를 누르면 , 맨아래로 간다.
            if (ISUDAscheduleSpg.index == 0) {
                ISUDAscheduleSpg.index = ISUDAschedule.length - 1;
                ISUDAscheduleSpg.ISUDAPxMove = 243 * (ISUDAscheduleSpg.index - 3);
                jQuery('#ISUDAscheduleSpg #body').css("margin-top", '-' + ISUDAscheduleSpg.ISUDAPxMove + 'px');
            }
            else
                ISUDAscheduleSpg.index--;
            ISUDAscheduleSpg.product.eq(ISUDAscheduleSpg.index).addClass('focus');

            break;
        case tvKey.KEY_DOWN:
            alert("ISUDAscheduleSpg_key : Down");
            
            //스크롤 구현 부분
            if ((ISUDAscheduleSpg.index - 3) * 243 == ISUDAscheduleSpg.ISUDAPxMove) {
                ISUDAscheduleSpg.ISUDAPxMove = 243 * (ISUDAscheduleSpg.index - 2);
                jQuery('#ISUDAscheduleSpg #body').css("margin-top", '-' + ISUDAscheduleSpg.ISUDAPxMove + 'px');
            }
            //기존 상품 포커스 제거
            ISUDAscheduleSpg.product.eq(ISUDAscheduleSpg.index).removeClass('focus');

            //대분류 카테고리의 맨 아래에 도달했을때 아래 키를 누르면, 맨위로 간다.
            if (ISUDAscheduleSpg.index == ISUDAschedule.length - 1) {
                ISUDAscheduleSpg.index = 0;
                jQuery('#ISUDAscheduleSpg #body').css("margin-top", "0px");
                ISUDAscheduleSpg.ISUDAPxMove = 0;
            }
            else
                ISUDAscheduleSpg.index++;
            ISUDAscheduleSpg.product.eq(ISUDAscheduleSpg.index).addClass('focus');

            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("ISUDAscheduleSpg_key : Enter");

            break;
        default:
            alert("Unhandled key");
            break;
    }
};