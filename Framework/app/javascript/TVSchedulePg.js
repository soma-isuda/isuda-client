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
//어떤 중분류를 선택했을때 불려져 있는 상품의 수(총 상품의 수 TVSchedulePg.productTotalNum와 다름)
//--------------------------------------------------
var productListLine = 0;
//상품 목록들에서 포커스가 몇번째 줄에 있는지 확인하는 변수
//--------------------------------------------------
var productLoadedId = new Array();
//현재 불러져 있는 상품들의 id를 차례대로 저장해 놓는 배열
//상세정보 페이지등을 불러오는데 사용된다.
//--------------------------------------------------
var TVSchedulePg = {
    bigPxMove: 0,//중분류 스크롤을 위한 변수
    midPxMove: 0,
    firstAccess: 0,//편성표 페이지에 처음 접근했으면 0, 아니면 1(대분류 전체보기를 위한 변수)
    loadedLineNum: 1,//상품 리스트에서 아래 버튼을 몇번 눌렀는지 추적하는 변수(상품 로딩을 위해서)
    INITIAL_NUMBER: 8,//처음에 편성표에서 로드되는 상품의 수
    productTotalNum: 0,//어떤 카테고리에 있는 총 상품의 수
};

TVSchedulePg.onLoad = function () {
    alert("TVSchedulePg onLoad");
    big_index = 0;
    this.firstAccess = 0;
    this.downKeyInputNum = 0;
    jQuery.extend(TVSchedulePg, {
        big: jQuery('#big').find('ul'),
        mid: jQuery('#mid').find('ul'),

        anchor: {
            big: jQuery('#anchor_TVSchedulePg_bigCategory'),
            mid: jQuery('#anchor_TVSchedulePg_midCategory'),
            list: jQuery('#anchor_TVSchedulePg_productList'),
            main: jQuery('#anchor_TVSchedulePg')
        }
    });

    // 대분류를 불러온다.
    var bigTemp;
    for (var i = 0; i < firstCategory.length ; i++) {
        bigTemp = '';
        if (firstCategory[i] == '면세점') {
            bigTemp += firstCategory[i];//그대로
        }
        else if (~firstCategory[i].indexOf('가구/인테리어')) {
            bigTemp += '가구/<br/>인테<br/>리어';
        }
        else {
            if (~firstCategory[i].indexOf('/')) {//대분류 이름에 '/'가 있으면
                for (var j = 0; j < firstCategory[i].length; j++) {
                    bigTemp += firstCategory[i][j];
                    if (firstCategory[i][j] == '/')
                        bigTemp += '<br/>';
                }
            }
            else {//없으면
                for (var j = 0; j < firstCategory[i].length; j++) {
                    bigTemp += firstCategory[i][j];
                    if (j == 1)
                        bigTemp += '<br/>';
                }
            }
        }
        TVSchedulePg.big.append('<li><div>' + bigTemp + '</div></li>');
    }

    //CSS를 위한 선택자
    jQuery.extend(TVSchedulePg, {
        midElem: jQuery('#mid').find('ul>li'),
        bigElem: jQuery('#big').find('ul>li')
    });
    var day = new Array('일', '월', '화', '수', '목', '금', '토');
    var tempDate = new Date();
    var tempString = '';
    tempString += tempDate.getFullYear() + "년 ";
    tempString += (tempDate.getMonth() + 1) + "월 ";
    tempString += tempDate.getDate() + "일  ";
    tempString += day[tempDate.getDay()] + "요일 ~";
    //내일 모레 날짜
    tempDate = new Date(tempDate.valueOf() + (48 * 60 * 60 * 1000));
    tempString += tempDate.getFullYear() + "년 ";
    tempString += (tempDate.getMonth() + 1) + "월 ";
    tempString += tempDate.getDate() + "일 ";
    tempString += day[tempDate.getDay()] + "요일";

    jQuery('#product>#product_nav').append(tempString);

    //전체 상품을 미리 불러온다.
    TVSchedulePg.firstLoad(allProduct[0]);
};

TVSchedulePg.focus = function () {
    alert("TVSchedulePg.focus");
    TVSchedulePg.anchor.big.focus();
    TVSchedulePg.bigElem.eq(big_index).removeClass('select');
    TVSchedulePg.bigElem.eq(big_index).addClass('focus');
    tabMenu();
};

TVSchedulePg.enableKeys = function () {
    document.getElementById("anchor").focus();
};


tabMenu = function () {

    alert("tabMenu");
    var tempString = '';

    //중분류를 불러온다.

    for (var i = 0; i < secondCategory[big_index].length ; i++) {
        tempString += '<li> <div>' + secondCategory[big_index][i] + '</div> </li>';
    }
    TVSchedulePg.mid.html(tempString);

    /*
    var midTemp;
    for (var i = 0; i < secondCategory[big_index].length ; i++) {
        midTemp = '';


        if (~secondCategory[big_index][i].indexOf('/')) {//대분류 이름에 '/'가 있으면
            for (var j = 0; j < secondCategory[big_index][i].length; j++) {
                midTemp += secondCategory[big_index][i][j];
                if (secondCategory[big_index][i][j] == '/')
                    midTemp += '<br/>';
            }
        }
        else {//없으면
            for (var j = 0; j < secondCategory[big_index][i].length; j++) {
                midTemp += secondCategory[big_index][i][j];
                if (j == 1)
                    midTemp += '<br/>';
            }
        }

        TVSchedulePg.mid.append('<li><div>' + midTemp + '</div></li>');
    }*/

    jQuery.extend(TVSchedulePg, {
        midElem: jQuery('#mid').find('ul>li'),
    });
};

//[[[[[[[[[대분류]]]]]]]]]]]에서의 키처리를 담당하는 부분
TVSchedulePg.bigKeyDown = function () {
    alert("TVSchedulePg big Category keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + TVSchedulePg_index);

    switch (keyCode) {
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", TVSchedulePg);
            break;
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("TVSchedulePg_key : RETURN");
        case tvKey.KEY_LEFT:
            alert("TVSchedulePg_key : Left");
            //메뉴 선택으로 포커스를 다시 넘긴다.
            TVSchedulePg.bigElem.eq(big_index).removeClass('focus');
            $(".sideBarMenuText").css("display", "block");
            Main.focus();
            break;
        case tvKey.KEY_UP:
            alert("TVSchedulePg_key : Up");
            TVSchedulePg.bigElem.eq(big_index).removeClass('focus');

           if ((big_index-1)*148 == this.bigPxMove) {
                this.bigPxMove = 148 * (big_index-2);
                jQuery('#big').find('ul').css("margin-top", '-'+this.bigPxMove+'px');
            }
            //대분류 카테고리의 맨위에 도달했을때 위의 키를 누르면 , 맨아래로 간다.
            if (big_index == 0) {
                big_index = firstCategory.length - 1;
                this.bigPxMove = 148 * (big_index - 6);
                jQuery('#big').find('ul').css("margin-top", '-'+this.bigPxMove+'px');
            }
            else
                big_index--;

            TVSchedulePg.bigElem.eq(big_index).addClass('focus');
            //tabMenu();//중분류 미리보기를 없앤다.

            //미리 로드하는 부분
            mid_index = 0;
            if (big_index == 0) {//대분류 '전체보기' 일때 
                if (this.firstAccess != 0) { //'대분류 전체보기'에 처음 접근하는게 아니라면
                    //전체 상품을 다시 불러온다.
                    TVSchedulePg.firstLoad(allProduct[0]);
                }
            }
            else {//대분류 '전체보기'가 아닐때
                TVSchedulePg.firstLoad(midProduct[big_index]);
            }
            break;
        case tvKey.KEY_DOWN:
            alert("TVSchedulePg_key : Down");
            
            //대분류를 표시할 수 있는 영역을 넘쳤을 때는 스크롤한다.
            //if (big_index >= 6 && big_index < (firstCategory.length - 1))
            if ((big_index-6)*148 == this.bigPxMove) {
                this.bigPxMove = 148 * (big_index-5);
                jQuery('#big').find('ul').css("margin-top", '-' + this.bigPxMove + 'px');
            }

            TVSchedulePg.bigElem.eq(big_index).removeClass('focus');

            //대분류 카테고리의 맨 아래에 도달했을때 아래 키를 누르면, 맨위로 간다.
            if (big_index == firstCategory.length - 1) {
                big_index = 0;
                jQuery('#big').find('ul').css("margin-top", "0px");
                this.bigPxMove =0;
            }
            else
                big_index++;
            TVSchedulePg.bigElem.eq(big_index).addClass('focus');
            //tabMenu();//중분류 미리 보여주기를 없앤다.

            

            //미리 로드하는 부분
            mid_index = 0;
            if (big_index == 0) {//대분류 '전체보기' 일때 
                if (this.firstAccess != 0) { //'대분류 전체보기'에 처음 접근하는게 아니라면
                    //전체 상품을 다시 불러온다.
                    TVSchedulePg.firstLoad(allProduct[0]);
                }
            }
            else {//대분류 '전체보기'가 아닐때
                TVSchedulePg.firstLoad(midProduct[big_index]);
            }

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
            if (big_index == 0) {//대분류 '전체보기' 처리 부분
                TVSchedulePg.bigElem.eq(big_index).addClass('select');
                if (this.firstAccess != 0) { //'대분류 전체보기'에 처음 접근하는게 아니라면
                    //전체 상품을 다시 불러온다.
                    TVSchedulePg.firstLoad(allProduct[0]);
                }
                //상품 리스트로 바로 포커스를 넘긴다.

                TVSchedulePg.anchor.list.focus();
                //변수 초기화
                productIndex = 1;//바로 리스트 부분에 있으므로
                productListIndex = 0;//첫번째 상품에 포커스를 맞춘다.
                productListLine = 0;

                jQuery('#product').css("top", "0px");
                jQuery('#product>#product_header>#reserve_Category').hide();//예약 버튼을 없앤다.
                setTimeout(function () {//상품 리스트들을 다 불러오고 난 다음에 첫번째 상품에 포커스를 넘긴다.
                    jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).append('<div class="schedule_product_focus_"></div><div class="schedule_product_focus">상세보기</div>');
                }, 100);
                this.firstAccess = 1;
            }
            else {//대분류 '전체보기'가 아닐때
                mid_index = 0;
                //대분류 부분을 숨기고 중분류 부분을 보여준다.
                jQuery('#mid').show();
                jQuery('#big').hide();

                tabMenu();
                TVSchedulePg.anchor.mid.focus();//중분류로 anchor를 넘긴다
                //첫번째 대분류 카테고리에 초점을 맞춘상태로 시작한다.
                TVSchedulePg.bigElem.eq(big_index).addClass('select');
                TVSchedulePg.midElem.eq(mid_index).addClass('focus');
                this.midPxMove=0;
                
            }
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
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", TVSchedulePg.anchor.mid);
            break;
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("TVSchedulePg_key : RETURN");
        case tvKey.KEY_LEFT:
            alert("TVSchedulePg_key : Left");

            //다시 대분류로 포커스를 넘긴다.
            jQuery('#mid').hide();
            jQuery('#big').show();
            TVSchedulePg.bigElem.eq(big_index).removeClass('select');
            TVSchedulePg.midElem.eq(mid_index).removeClass('focus');

            jQuery('#mid').find('ul').css("margin-top", "0");

            TVSchedulePg.anchor.big.focus();
            //포커스가 넘어가면 중분류를 없앤다.
            break;
        case tvKey.KEY_UP:
            alert("TVSchedulePg_key : Up");
            TVSchedulePg.midElem.eq(mid_index).removeClass('focus');

            if ((mid_index-1)*148 == this.midPxMove) {
                this.midPxMove = 148 * (mid_index-2);
                jQuery('#mid').find('ul').css("margin-top", '-'+this.midPxMove+'px');

            }
            //중분류 카테고리의 맨위에 도달했을때 위의 키를 누르면 , 맨아래로 간다.
            if (mid_index == 0) {
                mid_index = secondCategory[big_index].length - 1;
                this.midPxMove = 148 * (mid_index - 6);

                jQuery('#mid').find('ul').css("margin-top", '-'+this.midPxMove+'px');
            }
            else
                mid_index--;

            TVSchedulePg.midElem.eq(mid_index).addClass('focus');
            if(mid_index==0)
                TVSchedulePg.firstLoad(midProduct[big_index]);
            else
                TVSchedulePg.firstLoad(allProduct[big_index][secondCategoryNumber[secondCategory[big_index][mid_index]]]);
            break;
        case tvKey.KEY_DOWN:
            alert("TVSchedulePg_key : Down");
            //중분류를 표시할 수 있는 영역을 넘쳤을 때는 스크롤한다.
            if ((mid_index-6)*148 == this.midPxMove) {//중분류는 한번에 최대 8개까지 보여줌
                this.midPxMove = 148 * (mid_index-5);
                jQuery('#mid').find('ul').css("margin-top", '-'+this.midPxMove+'px');
            }

            TVSchedulePg.midElem.eq(mid_index).removeClass('focus');

            //중분류 카테고리의 맨 아래에 도달했을때 아래 키를 누르면, 맨위로 간다.
            alert('mid_index:' + mid_index);//for debug
            if (mid_index == secondCategory[big_index].length - 1) {
                mid_index = 0;
                jQuery('#mid').find('ul').css("margin-top", "0px");
                this.midPxMove =0;
            }
            else
                mid_index++;

            TVSchedulePg.midElem.eq(mid_index).addClass('focus');

            if (mid_index == 0)
                TVSchedulePg.firstLoad(midProduct[big_index]);
            else
                TVSchedulePg.firstLoad(allProduct[big_index][secondCategoryNumber[secondCategory[big_index][mid_index]]]);

            break;
            //중분류에서 오른쪽 키나 엔터를 누르면, 상품리스트로 이동한다.
        case tvKey.KEY_RIGHT:
            alert("TVSchedulePg_key : Right");
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:

            alert("TVSchedulePg_key : Enter");
            //TVSchedulePg.midElem.eq(mid_index).removeClass('focus');
            TVSchedulePg.midElem.eq(mid_index).addClass('select');

            jQuery('#product>#product_header>#reserve_Category').show();//예약 버튼을 일단 다시 표시한다.
            jQuery('#product_header>#totalNumber').empty();//토탈 개수를 일단 지운다.
            this.downKeyInputNum = 0;
            //해당 중분류의 상품들을 불러온다
            alert(secondCategoryNumber[secondCategory[big_index][mid_index]]);
            if (mid_index == 0) {//'중분류 전체보기'일 경우
                productIndex = 1;
                productListIndex = 0;
                jQuery('#product>#product_header>#reserve_Category').hide();

                TVSchedulePg.firstLoad(midProduct[big_index]);
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).append('<div class="schedule_product_focus_"></div><div class="schedule_product_focus">상세보기</div>');

            }
            else {//'중분류 전체보기'가 아닐 경우
                //중분류 예약 부분에 포커스를 맞추고 시작한다.
                productIndex = 0;
                jQuery('#product>#product_header>#reserve_Category').addClass('focus');

                TVSchedulePg.firstLoad(allProduct[big_index][secondCategoryNumber[secondCategory[big_index][mid_index]]]);
            }


            //편성표 페이지의 상단 anchor로 넘긴다
            TVSchedulePg.anchor.list.focus();

            productListIndex = 0;
            productListLine = 0;

            jQuery('#product').css("top", "0px");



            break;
        default:
            alert("Unhandled key");
            break;
    }
};

//카테고리에서 '상품 리스트'로 들어왔을 때,
//키처리를 담당하는 부분
TVSchedulePg.listKeyDown = function () {
    alert("TVSchedulePg product List keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + TVSchedulePg_index);

    switch (keyCode) {
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", TVSchedulePg.anchor.list);
            break;
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("TVSchedulePg_key : RETURN");
        case tvKey.KEY_LEFT:
            alert("TVSchedulePg_key : Left");
            //상품 리스트의 제일 왼쪽에 있을때,
            if (productListIndex % 4 == 0 || productIndex == 0) {//상품 리스트의 제일 왼쪽에 있거나 '중분류 예약'에 포커스가 있을 때 

                if (big_index == 0) {//'대분류 전체보기' 이면
                    //다시 대분류로 포커스를 넘긴다.
                    TVSchedulePg.anchor.big.focus();
                    TVSchedulePg.bigElem.eq(big_index).removeClass('select');

                }
                else {//'대분류 전체보기'가 아니면
                    //다시 중분류로 포커스를 넘긴다.
                    TVSchedulePg.midElem.eq(mid_index).removeClass('select');
                    TVSchedulePg.anchor.mid.focus();
                    //포커스가 넘어가면 상품들을 없앤다.
                    //                    jQuery('#product_list_pg > ul').empty();

                }
                //'총 몇개의 상품이 있습니다' 부분을 없앤다.
                //                jQuery('#product_header>#totalNumber').empty();

                if (productIndex == 0) {//중분류 예약에 포커스가 있었을 때
                    jQuery('#product>#product_header>#reserve_Category').removeClass('focus');
                }
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).find('div.schedule_product_focus').hide();//포커스를 제거한 상태에서 전체보기 상품은 계속 보여준다.
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).find('div.schedule_product_focus_').hide();//포커스를 제거한 상태에서 전체보기 상품은 계속 보여준다.

                jQuery('#product').css("top", "0");
            }

                //그렇지 않을때
            else {
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).find('div.schedule_product_focus').hide();
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).find('div.schedule_product_focus_').hide();//포커스를 제거한 상태에서 전체보기 상품은 계속 보여준다.

                productListIndex--;//이전 상품으로 포커스를 되돌려준다.

                //상품 포커스 처리
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).append('<div class="schedule_product_focus_"></div><div class="schedule_product_focus">상세보기</div>');

            }

            break;
        case tvKey.KEY_RIGHT:
            alert("TVSchedulePg_key : Right");
            if (productIndex == 0) {
                jQuery('#product>#product_header>#reserve_Category').addClass('focus');
            }
            else if (productIndex == 1 && productListIndex != (TVSchedulePg.productTotalNum - 1)) {
                //상품 리스트에 포커스가 있으면서, 마지막 상품이 아닌경우
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).find('div.schedule_product_focus').hide();
                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).find('div.schedule_product_focus_').hide();//포커스를 제거한 상태에서 전체보기 상품은 계속 보여준다.

                productListIndex++;//다음 상품으로 이동

                jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).append('<div class="schedule_product_focus_"></div><div class="schedule_product_focus">상세보기</div>');
                if ((productListIndex - 1) % 4 == 3) {//상품 리스트의 제일 오른쪽에 있을 때
                    var pxMove = '-' + (542 * (++productListLine)) + 'px';
                    jQuery('#product').css("top", pxMove);

                    //다음줄을 로드한다.
                    var nextLoadNum = productNumber + 4;
                    if (nextLoadNum > TVSchedulePg.productTotalNum)
                        nextLoadNum = TVSchedulePg.productTotalNum;
                    for (var i = productNumber; i < nextLoadNum ; i++) {
                        //대분류 전체보기에서 
                        if (big_index == 0) 
                            TVSchedulePg.loadNewProduct(allProduct[0][i]);
                        //중분류 전체보기에서
                        else if (big_index != 0 && mid_index == 0)
                            TVSchedulePg.loadNewProduct(midProduct[big_index][i]);
                        //중분류 카테고리에서
                        else if (big_index != 0 && mid_index != 0)
                            TVSchedulePg.loadNewProduct(allProduct[big_index][mid_index][i]);
                    }//다음줄 로드 완료
                }
            }

            break;
        case tvKey.KEY_UP:
            alert("TVSchedulePg_key : Up");
            if (productIndex == 1) {
                //상품 리스트의 맨 윗줄에 있으면서 '전체보기'가 아니면, 중분류 예약으로 이동한다.
                if (productListIndex >= 0 && productListIndex <= 3) {
                    if (big_index != 0 && mid_index != 0) {
                        jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).find('div.schedule_product_focus').hide();
                        jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).find('div.schedule_product_focus_').hide();

                        jQuery('#product>#product_header>#reserve_Category').addClass('focus');
                        productIndex = 0;
                    }
                }
                else {//그렇지 않으면
                    productListIndex -= 4;
                    productListLine--;//이전줄로 이동
                    jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex + 4).find('div.schedule_product_focus').hide();
                    jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex + 4).find('div.schedule_product_focus_').hide();

                    jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).append('<div class="schedule_product_focus_"></div><div class="schedule_product_focus">상세보기</div>');

                    var pxMove = '-' + (542 * productListLine) + 'px';
                    jQuery('#product').css("top", pxMove);

                }
            }
            break;

        case tvKey.KEY_DOWN:
            //alert("productListLine:" + productListLine + " productNumber:" + productNumber);
            alert("TVSchedulePg_key : Down");

            //첫번째 줄이 아니면 ,한줄씩 내려갈때 마다 조금씩 레이어를 올린다.
            if (TVSchedulePg.productTotalNum != 0) {//상품이 하나라도 있을 때만(상품이 하나도 없을 때는 아무것도 안한다.)
                if (productIndex == 0) {//중분류 예약버튼에서 아래 버튼을 누르면,
                    //'중분류 예약 버튼의 포커스 제거'
                    jQuery('#product>#product_header>#reserve_Category').removeClass('focus');
                    jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).append('<div class="schedule_product_focus_"></div><div class="schedule_product_focus">상세보기</div>');

                    //상품 리스트로 포커스 이동
                    productIndex = 1;
                }
                else if (productIndex == 1) {//상품 리스트에서 아래 버튼을 누르면

                    if ((productListLine + 1) < (TVSchedulePg.productTotalNum / 4)) {//다음 줄에 하나라도 상품이 있을 때만 아래 키를 받는다.
                        //다음줄을 로드한다.
                        var nextLoadNum = productNumber + 4;
                        if (nextLoadNum > TVSchedulePg.productTotalNum)
                            nextLoadNum = TVSchedulePg.productTotalNum;
                        for (var i = productNumber; i < nextLoadNum ; i++) {
                            //대분류 전체보기에서 
                            if (big_index == 0) {
                                alert(allProduct[0][i].id);
                                TVSchedulePg.loadNewProduct(allProduct[0][i]);
                                
                            }
                                //중분류 전체보기에서
                            else if (big_index != 0 && mid_index == 0)
                                TVSchedulePg.loadNewProduct(midProduct[big_index][i]);
                                //중분류 카테고리에서
                            else if (big_index != 0 && mid_index != 0)
                                TVSchedulePg.loadNewProduct(allProduct[big_index][mid_index][i]);
                        }//다음줄 로드 완료

                        //일단 원래 상품의 포커스를 지운다.
                        jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).find('div.schedule_product_focus').hide();
                        jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).find('div.schedule_product_focus_').hide();

                        if ((productListIndex + 4) < TVSchedulePg.productTotalNum)//바로 밑에 다른 상품이 있으면
                            productListIndex += 4;//상품의 다음 줄로 이동
                        else if ((productListIndex + 4) >= TVSchedulePg.productTotalNum)//바로 밑에 다음 상품이 없으면
                            productListIndex = TVSchedulePg.productTotalNum - 1;//마지막 상품으로 이동

                        productListLine++;

                        jQuery('#product>#product_list_pg>#product_list>li').eq(productListIndex).append('<div class="schedule_product_focus_"></div><div class="schedule_product_focus">상세보기</div>');

                        if (productListLine != 0) {
                            var pxMove = '-' + (540 * productListLine) + 'px';
                            jQuery('#product').css("top", pxMove);
                        }
                    }
                }
            }
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            alert("TVSchedulePg_key : Enter");
            if (productIndex == 0) {//해당 카테고리 예약에 포커스가 있을 때
                //$(img[MultiWatchPg_index]).css("display", "none");
                jQuery('#product>#product_header>#reserve_Category').addClass('focus');
                //번호 선택 subPage를 로드한다.
                subPage_index = 3;
                Main.layout.subPage.load(subPageArr[subPage_index].html);
                setTimeout(function () {
                    subPageArr[subPage_index].object.onLoad();//onLoad함수 안에 포커스를 넘겨주는 부분이 있음
                }, 10);
            }
            else if (productIndex == 1) {//상품에 포커스가 있을 때
                //상품 상세정보 페이지를 로드한다.
                subPage_index = 0;
                Main.layout.subPage.load(subPageArr[subPage_index].html);
                setTimeout(function () {
                    subPageArr[subPage_index].object.onLoad();//onLoad함수 안에 포커스를 넘겨주는 부분이 있음
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
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", TVSchedulePg);
            break;
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("TVSchedulePg_key : RETURN");
            //SelectWatchPg.onLoad();
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

TVSchedulePg.firstLoad = function (data) {
    productListIndex = 0;
    var firstCategoryTemp = -1;
    TVSchedulePg.productTotalNum = data.length;//불려진 카테고리의 총 상품의 수를 가지고 있는다.

    jQuery('#product_list_pg').find('ul').empty();
    productNumber = 0;
    productLoadedId = new Array();//배열을초기화한다.
    $.each(data, function (key, value) {
        TVSchedulePg.loadNewProduct(value);
        if (productNumber == TVSchedulePg.INITIAL_NUMBER)
            return false;
    });
    if (productNumber == 0)//해당하는 중분류에 상품이 없을때,
        jQuery('#product_list_pg').find('ul').append('<div style="width:1550px; height:876px; line-height:876px; font-size:3em; text-align:center;">해당 카테고리에 방송 예정 상품이 없습니다.</div>');
    //현재 카테고리에 몇개의 상품이 있는지 보여준다.
    var tempString;
    if (big_index != 0)//'전체보기'가 아닐 경우
        tempString = '* ' + firstCategory[big_index] + ' > ' + secondCategory[big_index][mid_index] + ' 에 총 ' + TVSchedulePg.productTotalNum + '개의 상품이 있습니다.';
    else
        tempString = '* 총 ' + TVSchedulePg.productTotalNum + '개의 상품이 있습니다.';
    jQuery('#product_header>#totalNumber').empty();

    jQuery('#product_header').find('div:nth-child(2)').append(tempString);
};


//상품 하나에 대한 정보를 받으면 화면에 뿌려주는 함수
TVSchedulePg.loadNewProduct = function (value) {
    productNumber++;
    //시간을 형태에 맞게 바꾼다.
    var timeRefined = '';
    var priceBefore;
    var priceRefined = '';

    var beforeTime = new Date(value.productStartTime);
    beforeTime = new Date(beforeTime.valueOf() + (60 * 60 * 9 * 1000));
    beforeTime = beforeTime.toISOString();
    var beforeTime_end = new Date(value.productEndTime);
    beforeTime_end = new Date(beforeTime_end.valueOf() + (60 * 60 * 9 * 1000));
    beforeTime_end = beforeTime_end.toISOString();

    var tempString = '';
    tempString = beforeTime.split(/[-T:\.Z]/);
    timeRefined += tempString[1] + "월" + tempString[2] + "일 " + tempString[3] + "시" + tempString[4] + "분 ~ ";
    tempString = beforeTime_end.split(/[-T:\.Z]/);
    timeRefined += tempString[3] + "시" + tempString[4] + "분";


    //가격을 적절한 형태로 변형한다.(콤마와 원 추가)
    priceRefined = '';
    priceBefore = value.productPrice;
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
    tempString += '<li class="schedule_product_list_item">';
    tempString += ' <div class="imgArea">';
    tempString += '     <img src="' + value.productImgURL + '" alt="" class="schedule_productImg">';
    tempString += ' </div>';
    tempString += ' <div class="schedule_productTime">' + timeRefined + '</div>';
    tempString += ' <div class="schedule_productInfoArea">';
    tempString += '     <div class="schedule_productName">' + value.productName + '</div>';
    tempString += '     <div class="schedule_providerName">' + providerIdToName[value.providerId] + '</div>';
    tempString += '     <div class="schedule_productPrice"><p>최대 혜택가</p>' + priceRefined + '</div>';
    tempString += ' </div>';
    tempString += '</li>';
    jQuery('#product_list_pg').find('ul').append(tempString);
    productLoadedId.push(value.id); // 로드된 상품들의 id를 저장해 놓는다.(상세정보 페이지를 위해)
    timeRefined = '';
}