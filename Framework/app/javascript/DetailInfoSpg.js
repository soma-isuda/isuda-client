var DetailInfoSpg_index = 0;
//0이면 '버튼 부분'에 포커스 된 상태
//1이면 상품 상세 정보 이미지에 포커스된 상태
//--------------------------------------------------
var detailImageHeight;
//불러오는 이미지의 높이를 구할 때 사용
//--------------------------------------------------
var detailImageScrollNumber;
//이미지 스크롤을 몇번 했는지
//--------------------------------------------------
var DetailInfoSpg = {

};

DetailInfoSpg.onLoad = function () {
    alert("DetailInfoSpg onLoad");
    //document.getElementById("DetailInfoSpg").style.marginLeft="1460px";
    jQuery.extend(DetailInfoSpg, {
        anchor: {
            main: jQuery('#anchor_DetailInfoSpg'),
            image: jQuery('#anchor_DetailInfoSpg_Image')
        }
    });
    this.focus();

    //현재 방송중인 상품이면 '방송 시청',
    //그렇지 않으면 'SMS 알람 받기'를 출력한다. -> 일단 보류

    if (page_index == 2) {//선택보기에서 '상세보기'
        jQuery('#reserveButton').hide();//'SMS 알람 받기' 버튼을 없앤다.

    }
    else if (page_index == 3) {//편성표에서 '상세보기'
        jQuery('#reserveButton').append('<div>SMS 알람 받기</div>');
    }
    else if (page_index == 4) {
        jQuery('#reserveButton').append('<div>해당 상품 알람 삭제<div>');
    }

    //상품 상세 정보 이미지를 로드한다.
    alert(productLoadedId[productListIndex]);
    var detailImgPath = SERVER_ADDRESS + '/pageShots/CJ201410030200.jpeg';
    /* // !!!!!!!!!!!!!일단 서버쪽에서 이미지를 다 넣으면 주석만 풀면 됨!!!!!!!!!!!!!!!!
    if (page_index == 2) { //선택보기에서 '상세보기'
        $.ajax({
            url: SERVER_ADDRESS + '/now',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var tempIndex = 0;
                var currentChannel = Player.getChannel();
                $.each(data, function (key, value) {
                    if (tempIndex == currentChannel) {
                        var detailImgPath = SERVER_ADDRESS + '/pageShots/' + value.id + '.jpeg';
                    }
                    tempIndex++;
                });
            }
        });
    }
    else if (page_index == 3) //편성표에서 '상세보기'
        var detailImgPath = SERVER_ADDRESS + '/pageShots/' + productLoadedId[productListIndex] + '.jpeg';
        */




    jQuery('#detailImage').append('<img src="' + detailImgPath + '"  alt="이미지가 없습니다"  id="detailImg"/>');

    jQuery.extend(DetailInfoSpg, {
        reserve: jQuery('#reserveButton').find('div'),
        image: jQuery('#detailImage')
    });

    //'SMS 알람 받기' 버튼에 포커스를 맞추고 시작한다.
    DetailInfoSpg.reserve.addClass('focus');
};



DetailInfoSpg.focus = function () {
    alert("DetailInfoSpg.focus");
    DetailInfoSpg.anchor.main.focus();
    // focus initialize
    DetailInfoSpg_index = 0;
    detailImageScrollNumber = 0;
};

DetailInfoSpg.enableKeys = function () {
    document.getElementById("anchor").focus();
};

DetailInfoSpg.keyDown = function () {
    alert("DetailInfoSpg keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + DetailInfoSpg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
        case tvKey.KEY_LEFT:
            alert("DetailInfoSpg_key : Left");
            widgetAPI.blockNavigation(event);

            if (page_index == 2) //선택보기에서 '상세보기'
                SelectWatchPg.focus();//선택보기로 다시 포커스를 넘긴다.

            else if (page_index == 3) //편성표에서 '상세보기'
                TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.

            else if (page_index == 4) {//마이페이지에서 '상세보기'
                //어디로 포커스를 되돌리는지 정해지면 넣기
            }


            jQuery('#DetailInfoSpg').hide();//상세보기 페이지를 닫는다.

            break;
        case tvKey.KEY_RIGHT:
            alert("DetailInfoSpg_key : Right");

            DetailInfoSpg.reserve.addClass('focus');
            break;
        case tvKey.KEY_UP:
            alert("DetailInfoSpg_key : Up");
            if (DetailInfoSpg_index == 1) {//상품 이미지에 포커스가 있었을 때
                if (detailImageScrollNumber == 0) {//이미지의 상단에 도달하면
                    DetailInfoSpg.image.removeClass('focus');
                    DetailInfoSpg.reserve.addClass('focus');
                    DetailInfoSpg_index = 0;
                }
                detailImageScrollNumber--;
                var pxMove = '-' + 200 * detailImageScrollNumber + 'px';
                DetailInfoSpg.image.find('img').css("margin-top", pxMove);
            }
            break;
        case tvKey.KEY_DOWN:
            alert("DetailInfoSpg_key : Down");
            if (DetailInfoSpg_index == 0) {//버튼 부분에 포커스가 있었을 때
                DetailInfoSpg.image.addClass('focus');
                DetailInfoSpg.reserve.removeClass('focus');
                DetailInfoSpg_index = 1;
                //사진 높이를 구한다. -- 스크롤에 이용됨
                //detailImageHeight = jQuery('#detailImage').find('img').height();
                detailImageHeight = document.getElementById('detailImg').height;
                alert(detailImageHeight);
            }
            else if (DetailInfoSpg_index == 1) {//상품 이미지에 포커스가 있을 때
                //스크롤 구현하는 부분
                if (200 * (detailImageScrollNumber + 1) < detailImageHeight) {

                    detailImageScrollNumber++;
                    //한번에 200px씩 스크롤 된다고 가정
                    var pxMove = '-' + 200 * detailImageScrollNumber + 'px';
                    DetailInfoSpg.image.find('img').css("margin-top", pxMove);
                }
            }
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("DetailInfoSpg_key : Enter");
            if (DetailInfoSpg_index == 0) {//버튼 부분에 포커스가 있을 때
                //번호 선택 부분으로 포커스를 넘긴다.
                if (page_index == 3) {//편성표에서 'SMS 알람 받기'를 눌렀을 때
                    Main.layout.subPage.load(subPageArr[4].html);
                    setTimeout(function () {
                        subPageArr[4].object.onLoad();//onLoad함수 안에 포커스를 넘겨주는 부분이 있음
                    }, 10);
                }
                else if (page_index == 4) {//마이페이지에서 '알람 삭제'를 눌렀을 때(단일 상품 예약 삭제)
                    $.ajax({
                        type: "DELETE", // POST형식으로 폼 전송
                        url: SERVER_ADDRESS + "/sAlarms", // 목적지
                        data: {
                            phoneNumber: savedNumber[MyPg_numberIndex],
                            productId: MyPg_currentProductId
                        },
                        dataType: "text",
                        success: function (data) {
                            alert("단일 상품 예약 삭제 완료");
                        }
                    });
                }
            }

            break;
        default:
            alert("Unhandled key");
            break;
    }
};
