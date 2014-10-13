

var ComparePriceSpg = {
    currentProductId:0,
};

ComparePriceSpg.onLoad = function () {
    alert("ComparePriceSpg onLoad");
    //document.getElementById("ComparePriceSpg").style.marginLeft="1460px";
    jQuery.extend(ComparePriceSpg, {
        header: jQuery('#ComparePriceSpg_header'),
        body: jQuery('#ComparePriceSpg_body'),
        footer: jQuery('#ComparePriceSpg_footer'),

        anchor: {
            main: jQuery('#anchor_ComparePriceSpg')
        }
    });
    this.focus();
    this.currentProductId = 0;
    $.ajax({
        url: SERVER_ADDRESS + '/now',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            alert('/now 성공');
            var tempIndex = 0;
            var currentChannel = Player.getChannel();
            alert('현재 채널 : ' + currentChannel);
            $.each(data, function (key, value) {
                if (tempIndex == currentChannel) {
                    ComparePriceSpg.currentProductId = value.id;
                    alert(value.id);
                    $.ajax({
                        url: SERVER_ADDRESS + "/recommendedProducts",
                        type: 'GET',
                        dataType: 'json',
                        data: ({ id: value.id }),
                        success: function (data) {
                            alert('/recommendedProducts 성공');
                            $.each(data, function (key, value) {
                                //페이지에 상세정보를 보여준다.
                                //시간을 형태에 맞게 바꾼다.
                                var tempString = '';
                                var timeRefined = '';

                                //시간에 9시간을 더한다.
                                var beforeTime = new Date(value.productStartTime);
                                beforeTime = new Date(beforeTime.valueOf() + (60 * 60 * 9 * 1000));
                                beforeTime = beforeTime.toISOString();
                                var beforeTime_end = new Date(value.productEndTime);
                                beforeTime_end = new Date(beforeTime_end.valueOf() + (60 * 60 * 9 * 1000));
                                beforeTime_end = beforeTime_end.toISOString();
                                //-----------------------------

                                tempString = value.productStartTime.split(/[-T:\.Z]/);
                                timeRefined += tempString[1] + "월" + tempString[2] + "일 " + tempString[3] + "시" + tempString[4] + "분 ~ ";
                                tempString = value.productEndTime.split(/[-T:\.Z]/);
                                timeRefined += tempString[3] + "시" + tempString[4] + "분";


                                //가격을 적절한 형태로 변형한다.(콤마와 원 추가)
                                var priceRefined = '';
                                var priceBefore = value.productPrice;
                                if (priceBefore) {//가격 값이 null이 아니면
                                    priceBefore = value.productPrice.toString();
                                    for (var i = priceBefore.length; i > 0; i = i - 3) {
                                        if (i == priceBefore.length)
                                            priceRefined = priceBefore.substring(i, i - 3);
                                        else
                                            priceRefined = priceBefore.substring(i, i - 3) + ',' + priceRefined;
                                    }
                                    priceRefined += ' 원';
                                }
                                else//가격 값이 null 이면
                                    priceRefined += '방송 중 확인';

                                //상품 데이터들을 적절한 위치에 삽입한다.
                                tempString = '';
                                tempString += '<div class="recommended_product">';
                                tempString += ' <div class="recommended_imgArea">';
                                tempString += '     <img src="' + value.productImgURL + '" alt="" class="recommended_productImg">';
                                tempString += ' </div>';
                                tempString += ' <div class="recommended_productTime">' + timeRefined + '</div>';
                                tempString += ' <div class="recommended_productInfoArea">';
                                tempString += '     <div class="recommended_productName">' + value.productName + '</div>';
                                tempString += '     <div class="recommended_productPrice"><p>최대 혜택가</p>' + priceRefined + '</div>';
                                tempString += ' </div>';
                                tempString += '</div>';
                                ComparePriceSpg.body.append(tempString);
                                ComparePriceSpg.footer.append('<div>상품 상세보기<div>');
                                ComparePriceSpg.footer.find('div').addClass('focus');
                            });
                        }
                    });
                }
                tempIndex++;
            });
        }
    });


};

var ComparePriceSpg_index = 0;

ComparePriceSpg.focus = function () {
    alert("ComparePriceSpg.focus");
    ComparePriceSpg.anchor.main.focus();
    // focus initialize
    ComparePriceSpg_index = 0;

};

ComparePriceSpg.enableKeys = function () {
    document.getElementById("anchor").focus();
};

ComparePriceSpg.keyDown = function () {
    alert("ComparePriceSpg keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + ComparePriceSpg_index);

    switch (keyCode) {
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", ComparePriceSpg);
            break;
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("ComparePriceSpg_key : RETURN");
        case tvKey.KEY_LEFT:
            alert("ComparePriceSpg_key : Left");
            jQuery('#ComparePriceSpg').hide();//페이지를 닫는다.	
            ComparePriceSpg.body.empty();
            SelectWatchPg.focus();

            break;
        case tvKey.KEY_RIGHT:
            alert("ComparePriceSpg_key : Right");
            break;
        case tvKey.KEY_UP:
            alert("ComparePriceSpg_key : Up");
            break;
        case tvKey.KEY_DOWN:
            alert("ComparePriceSpg_key : Down");
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("ComparePriceSpg_key : Enter");
            //상세보기 페이지를 로드한다.
            subPage_index = 0;
            Main.layout.subPage.load(subPageArr[subPage_index].html);
            setTimeout(function () {
                subPageArr[subPage_index].object.onLoad();//onLoad함수 안에 포커스를 넘겨주는 부분이 있음
            }, 10);
            break;
        default:
            alert("Unhandled key");
            break;
    }
};