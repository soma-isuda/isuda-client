//global variables
var TVSchedulePg_index = 0;
//대분류를 추적하는 변수
var big_index = 0;
//중분류를 추적하는 변수
var mid_index;
//--------------------------------------------------
var productIndex = 0;
//productIndex == 0 : 중분류 예약에 포커스
//productIndex == 1 : 상품 리스트에 포커스
//--------------------------------------------------
var productListIndex = 0;
//상품 목록들에 포커스가 도달했을 때, 상품 번호들을 추적하기 위한 변수
//--------------------------------------------------
var productNumber = 0;
//어떤 중분류를 선택했을때 불러오는 상품의 수
//--------------------------------------------------
var productListLine = 0;
//상품 목록들에서 포커스가 몇번째 줄에 있는지 확인하는 변수
//--------------------------------------------------
var productLoadedId = new Array();
//현재 불러져 있는 상품들의 id를 차례대로 저장해 놓는 배열
//상세정보 페이지등을 불러오는데 사용된다.
//--------------------------------------------------
var TVSchedulePg = {
    
    
};

TVSchedulePg.onLoad = function () {
    alert("TVSchedulePg onLoad");
    //TVSchedulePg.append('<div id="product"><div id="product_header"><div id="reserve_Category">해당 카테고리 예약</div></div><div id="product_nav">2014년 09월 29일</div><div id="product_list_pg"><ul id="product_list"></ul></div></div>');
    //document.getElementById("TVSchedulePg").style.marginLeft="1460px";
    jQuery.extend(TVSchedulePg, {
        big: jQuery('#big').find('ul'),
        mid: jQuery('#mid').find('ul'),

        anchor: {
            big: jQuery('#anchor_TVSchedulePg_bigCategory'),
            mid: jQuery('#anchor_TVSchedulePg_midCategory'),
            list:jQuery('#anchor_TVSchedulePg_productList'),
            main: jQuery('#anchor_TVSchedulePg')
        }
    });

    // Load first category
    for (var i = 0; i < firstCategory.length ; i++) {
        TVSchedulePg.big.append('<li>' + firstCategory[i] + '</li>');
    }


    //CSS를 위한 선택자
    jQuery.extend(TVSchedulePg, {
        midElem: jQuery('#mid').find('ul > li'),
        bigElem: jQuery('#big').find('ul > li'),

    });
    
    //첫번째 대분류 카테고리에 초점을 맞춘상태로 시작한다.
    TVSchedulePg.bigElem.eq(big_index).addClass('focus');

    
};


TVSchedulePg.focus = function () {
    alert("");
    alert("TVSchedulePg.focus");
    TVSchedulePg.anchor.big.focus();
    TVSchedulePg.bigElem.eq(big_index).addClass('focus');

    tabMenu();
};

TVSchedulePg.enableKeys = function () {
    document.getElementById("anchor").focus();
};


tabMenu = function () {

    alert("tabMenu");
    //clear mid tag
    //jQuery('#mid').find('ul').empty();
    jQuery('#mid > ul').empty();
    
    //중분류를 불러온다.
    for (var i = 0; i < secondCategory[big_index].length ; i++) {
        TVSchedulePg.mid.append('<li>' + secondCategory[big_index][i] + '</li>');
    }
    jQuery.extend(TVSchedulePg, {
        midElem: jQuery('#mid').find('ul > li'),
    });
};

//[[[[[[[[[대분류]]]]]]]]]]]에서의 키처리를 담당하는 부분
TVSchedulePg.bigKeyDown = function () {
    alert("TVSchedulePg big Category keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + TVSchedulePg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("TVSchedulePg_key : RETURN");
            //SelectWatchPg.onLoad();
            //메인으로 포커스를 넘긴다.
            break;
        case tvKey.KEY_LEFT:
            alert("TVSchedulePg_key : Left");
            //메뉴 선택으로 포커스를 다시 넘긴다.
            Main.onLoad();
            break;

        case tvKey.KEY_UP:
            alert("TVSchedulePg_key : Up");

            TVSchedulePg.bigElem.eq(big_index).removeClass('focus');
            //대분류 카테고리의 맨위에 도달했을때 위의 키를 누르면 , 맨아래로 간다.
            if (big_index == 0)
                big_index = firstCategory.length - 1;
            else
                big_index--;

            TVSchedulePg.bigElem.eq(big_index).addClass('focus');
            tabMenu();

            break;
        case tvKey.KEY_DOWN:
            alert("TVSchedulePg_key : Down");


            TVSchedulePg.bigElem.eq(big_index).removeClass('focus');
            //대분류 카테고리의 맨 아래에 도달했을때 아래 키를 누르면, 맨위로 간다.
            if (big_index == firstCategory.length - 1)
                big_index = 0;
            else
                big_index++;

            TVSchedulePg.bigElem.eq(big_index).addClass('focus');
            tabMenu();

            break;

            //오른쪽 버튼,엔터버튼을 누르면 
            //현재 보고 있던 대분류의 포커스는 유지한 상태로
            //중분류 첫번째에 포커스를 준뒤,
            //TVSchedulePg.midKeyDown으로 키처리를 넘긴다.
        case tvKey.KEY_RIGHT:
            alert("TVSchedulePg_key : Right");
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            alert("TVSchedulePg_key : Enter");
            mid_index = 0;

            tabMenu();
            TVSchedulePg.anchor.mid.focus();//중분류로 anchor를 넘긴다
            //첫번째 대분류 카테고리에 초점을 맞춘상태로 시작한다.

            TVSchedulePg.midElem.eq(mid_index).addClass('focus');

            break;
        default:
            alert("Unhandled key");
            break;
    }

};
    
//[[[[[[[[[중분류]]]]]]]]]]]에서의 키처리를 담당하는 부분
TVSchedulePg.midKeyDown = function () {
    alert("TVSchedulePg mid Category keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + TVSchedulePg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("TVSchedulePg_key : RETURN");
            SelectWatchPg.onLoad();
            break;
        case tvKey.KEY_LEFT:
            alert("TVSchedulePg_key : Left");

            //다시 대분류로 포커스를 넘긴다.
            TVSchedulePg.anchor.big.focus();
            //포커스가 넘어가면 중분류를 없앤다.
            jQuery('#mid > ul').empty();
            break;
    
        case tvKey.KEY_UP:
            alert("TVSchedulePg_key : Up");
            TVSchedulePg.midElem.eq(mid_index).removeClass('focus');

            //중분류 카테고리의 맨위에 도달했을때 위의 키를 누르면 , 맨아래로 간다.
            if (mid_index == 0)
                mid_index = secondCategory[big_index].length - 1;
            else
                mid_index--;

            TVSchedulePg.midElem.eq(mid_index).addClass('focus');
            break;
        case tvKey.KEY_DOWN:
            alert("TVSchedulePg_key : Down");
 

            TVSchedulePg.midElem.eq(mid_index).removeClass('focus');

            //중분류 카테고리의 맨 아래에 도달했을때 아래 키를 누르면, 맨위로 간다.
            alert('mid_index:' + mid_index);//for debug
            if (mid_index == secondCategory[big_index].length - 1)
                mid_index = 0;
            else
                mid_index++;

            TVSchedulePg.midElem.eq(mid_index).addClass('focus');
           

            break;
            //중분류에서 오른쪽 키나 엔터를 누르면, 상품리스트로 이동한다.
        case tvKey.KEY_RIGHT:
            alert("TVSchedulePg_key : Right");
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            
            alert("TVSchedulePg_key : Enter");
            productNumber = 0;
            //해당 중분류의 상품들을 불러온다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //ajax요청
            alert(secondCategoryNumber[secondCategory[big_index][mid_index]]);
            jQuery.ajax({
                url: SERVER_ADDRESS + '/productInfo?secondId='+secondCategoryNumber[secondCategory[big_index][mid_index]],
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var temp = 0;
                    var firstCategoryTemp = -1;
                    var cnt = 0;
                    jQuery('#product_list_pg').find('ul').empty();
                    $.each(data, function (key, value) {
                        productNumber++;
                        //상품 데이터들을 적절한 위치에 삽입한다.
                        jQuery('#product_list_pg').find('ul').append('<li class="product_list_item"> <div class="imgArea"><img src="' + value.productImgURL + '" alt="" class="productImg"></div><div class="productTime">' + value.productStartTime + ' ~ ' + value.productEndTime + '</div><div class="productInfoArea"><div class="productName">' + value.productName + '</div><div class="productPrice">최대 혜택가: ' + value.productPrice + '</div></div></li>');
                        productLoadedId.push(value.id); // 로드된 상품들의 id를 저장해 놓는다.(상세정보 페이지를 위해)
                    });
                    if (productNumber == 0)//해당하는 중분류에 상품이 없을때,
                        jQuery('#product_list_pg').find('ul').append('<div style="width:1550px; height:876px; line-height:876px; font-size:3em; text-align:center;">해당 카테고리에 방송 예정 상품이 없습니다.</div>');
                }
            });
            
            //편성표 페이지의 상단 anchor로 넘긴다
            TVSchedulePg.anchor.list.focus();
            productIndex = 0;
            productListIndex = 0;
            //중분류 예약 부분에 포커스를 맞추고 시작한다.
            jQuery('#product>#product_header>#reserve_Category').addClass('focus');
            jQuery('#product').css("top","0px" );
            productListLine = 0;
            productListIndex = 0;
            productIndex = 0;
            break;
        default:
            alert("Unhandled key");
            break;
    }
};

//카테고리에서 중분류를 선택하고 들어왔을 때,
//키처리를 담당하는 부분
TVSchedulePg.listKeyDown = function () {
    alert("TVSchedulePg product List keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + TVSchedulePg_index);
    
    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("TVSchedulePg_key : RETURN");
            SelectWatchPg.onLoad();
            break;
        case tvKey.KEY_LEFT:
            alert("TVSchedulePg_key : Left");
            //상품 리스트의 제일 왼쪽에 있을때,
            if (productListIndex % 4 == 0) {
                //다시 중분류로 포커스를 넘긴다.
                TVSchedulePg.anchor.mid.focus();
                //포커스가 넘어가면 상품들을 없앤다.
                jQuery('#product_list_pg > ul').empty();
            }
            if (productIndex == 0) {//중분류 예약에 포커스가 있을 때
                jQuery('#product>#product_header>#reserve_Category').removeClass('focus');
            }
            //그렇지 않을때
            else {
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).removeClass('focus');
                productListIndex--;//이전 상품으로 포커스를 되돌려준다.
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).addClass('focus');
            }
            break;
        case tvKey.KEY_RIGHT:
            alert("TVSchedulePg_key : Right");
            if (productIndex == 0) {
                jQuery('#product>#product_header>#reserve_Category').addClass('focus');
            }
            else if (productIndex == 1 && productListIndex != (productNumber - 1)) {
                //상품 리스트에 포커스가 있으면서, 마지막 상품이 아닌경우
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).removeClass('focus');
                productListIndex++;//다음 상품으로 이동

                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).addClass('focus');
                if ((productListIndex -1)% 4 == 3) {
                        var pxMove = '-' + (510 * (++productListLine)) + 'px';
                        jQuery('#product').css("top", pxMove);
                }
            }
            
            break;
        case tvKey.KEY_UP:
            alert("TVSchedulePg_key : Up");
            if (productIndex == 1) {
                //상품 리스트의 맨 윗줄에 있으면, 중분류 예약으로 이동한다.
                if (productListIndex >= 0 && productListIndex <= 3) {
                    jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).removeClass('focus');
                    jQuery('#product>#product_header>#reserve_Category').addClass('focus');
                    productIndex = 0;
                }
                else {//그렇지 않으면
                    productListIndex -= 4;
                    productListLine--;//이전줄로 이동
                    jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex + 4).removeClass('focus');
                    jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).addClass('focus');
                    
                    var pxMove = '-' + (510 * productListLine) + 'px';
                    jQuery('#product').css("top", pxMove);
                    
                }
            }
            break;
        case tvKey.KEY_DOWN:
            alert(productListLine);
            alert("TVSchedulePg_key : Down");
            //첫번째 줄이 아니면 ,한줄씩 내려갈때 마다 조금씩 레이어를 올린다.

            if (productIndex == 0) {//중분류 예약버튼에서 아래 버튼을 누르면,
                //'중분류 예약 버튼의 포커스 제거'
                jQuery('#product>#product_header>#reserve_Category').removeClass('focus');
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).addClass('focus');

                //상품 리스트로 포커스 이동
                productIndex = 1;
            }
            else if (productIndex == 1 && (productListIndex+4)<productNumber) {//상품 리스트에서 아래 버튼을 누르면
                productListLine++;
                productListIndex += 4;//상품의 다음 줄로 이동
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex - 4).removeClass('focus');
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).addClass('focus');
                if (productListLine != 0) {
                    var pxMove = '-' + (510 * productListLine)+'px';
                    jQuery('#product').css("top", pxMove);
                    
                }
            }
            
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            alert("TVSchedulePg_key : Enter");
            if (productIndex == 0) {//해당 카테고리 예약에 포커스가 있을 때
                //$(img[MultiWatchPg_index]).css("display", "none");
                jQuery('#product>#product_header>#reserve_Category').addClass('focus');
            }
            else if (productIndex == 1) {//상품에 포커스가 있을 때
                //상품 상세정보 페이지를 로드한다.
                Main.layout.subPage.load(subPageArr[0].html);
                setTimeout(function () {
                    subPageArr[0].object.onLoad();//onLoad함수 안에 포커스를 넘겨주는 부분이 있음
                }, 10);
            }
            break;
        default:
            alert("Unhandled key");
            break;
    }
};








TVSchedulePg.KeyDown = function () {
    alert("TVSchedulePg keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + TVSchedulePg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("TVSchedulePg_key : RETURN");
            SelectWatchPg.onLoad();
            break;
        case tvKey.KEY_LEFT:
            alert("TVSchedulePg_key : Left");
            break;
        case tvKey.KEY_RIGHT:
            alert("TVSchedulePg_key : Right");
            break;
        case tvKey.KEY_UP:
            alert("TVSchedulePg_key : Up");
            break;
        case tvKey.KEY_DOWN:
            alert("TVSchedulePg_key : Down");
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("TVSchedulePg_key : Enter");
            break;
        default:
            alert("Unhandled key");
            break;
    }

};
