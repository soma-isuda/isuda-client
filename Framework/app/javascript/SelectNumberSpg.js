﻿var SelectNumberSpg_index;
//0 : 기존의 번호 선택 
//1 : 새로운 번호 입력
//2 : 번호 최종 선택
//--------------------------------------------------
var SelectNumberSpg_numberIndex;
//기존에 저장된 번호들의 몇번째에 포커스가 되어있는지(0부터 시작)
var SelectNumberSpg_registerIndex;
//0:'번호 추가 버튼' 또는 '새로운 번호 입력 버튼'
//1:인증 번호 입력 버튼에 포커스
//--------------------------------------------------
var savedNumber_num;

//현재 TV에 저장되어 있는 번호의 개수.
//api를 통해 파일 시스템에 저장되어 있는 번호를 가져온다.
var savedNumber;
//현재 TV에 저장되어 있는 번호의 배열
//--------------------------------------------------
var MAX_NUMBER = 5;
//TV에 저장될 수 있는 번호의 최대 개수 -- 변할 수 있음
//--------------------------------------------------
var inputNum = 0;//입력된 전화번호 숫자의 수를 체크한다.(일단 최대 11자리로 제한) 
var certificationNum = 0;//서버에서 전송된 인증번호
var phoneNumber_input;//사용자가 입력한 인증번호
var MAX_INPUT;//입력창에 최대로 입력할 수 있는 숫자의 개수(11개 또는 6개)

var SelectNumberSpg = {

};

SelectNumberSpg.onLoad = function () {
    alert("SelectNumberSpg onLoad");
    //document.getElementById("SelectNumberSpg").style.marginLeft="1460px";
    jQuery.extend(SelectNumberSpg, {
        anchor: {
            main: jQuery('#anchor_SelectNumberSpg'),
            select: jQuery('#anchor_SelectNumberSpg_select'),
            register: jQuery('#anchor_SelectNumberSpg_register'),
            submit: jQuery('#anchor_SelectNumberSpg_submit'),
        }
    });
    this.focus();

    loadFile();//파일 시스템을 로딩한다.
    //writeFile(''); //전화번호 초기화
    /*
    savedNumber = readFile();
    savedNumber += ',01090897672'
    writeFile(savedNumber);
    //번호 추가 방법*/

    //writeFile('01090897672,01073707672,01054707672');//test용 

    var savedNumber_temp = readFile();//파일 시스템에 저장되어 있는 번호들을 불러온다.
    savedNumber = savedNumber_temp.split(',');
    savedNumber_num = savedNumber.length;

    //파일 시스템에서 TV에 저장되어 있는 번호들을 불러온다.
    for (var i = 0; i < savedNumber_num; i++) {
        var tempString = '';
        tempString += '<div>';
        tempString += '<div class="number_left">' + (i + 1) + '</div>';
        tempString += '<div class="number_right">' + savedNumber[i] + '</div>';
        tempString += '</div>';

        jQuery('#SelectNumber_list_already').append(tempString);
    }

    if (savedNumber_num < MAX_NUMBER) {//번호들을 더 추가할 수 있다면
        var tempString = '';
        //tempString += '<div id="new_first">번호추가</div>';
        tempString += '<div>번호추가</div>';
        jQuery('#SelectNumber_list_new').append(tempString);
    }
    jQuery.extend(SelectNumberSpg, {
        number: jQuery('#SelectNumber_list_already>div'),
        register: jQuery('#SelectNumber_list_new>div'),
    });

    if (savedNumber_num > 0)//번호가 한개라도 저장되어 있으면, 그 번호에 포커스를 맞추고 시작한다.
        SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).addClass('focus');
    else if (savedNumber_num == 0) {//번호가 한개도 없으면, 번호 추가에 포커스를 맞추고 시작한다.
        //'번호 추가' 부분으로 포커스를 넘긴다.
        SelectNumberSpg_index = 1;
        SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).addClass('focus');
        SelectNumberSpg.anchor.register.focus();
    }
};


SelectNumberSpg.focus = function () {
    alert("SelectNumberSpg.focus");
    SelectNumberSpg.anchor.select.focus();
    // 변수 초기화
    SelectNumberSpg_index = 0;
    SelectNumberSpg_numberIndex = 0;
    SelectNumberSpg_registerIndex = 0;
};

SelectNumberSpg.enableKeys = function () {
    document.getElementById("anchor").focus();
};

//처음에 키를 받는 부분
SelectNumberSpg.selectKeyDown = function () {
    alert("SelectNumberSpg Select keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + SelectNumberSpg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("SelectNumberSpg_key : RETURN");
            TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.
            jQuery('#SelectNumberSpg').hide();//번호 선택 페이지를 닫는다.

            break;
        case tvKey.KEY_LEFT:
            alert("SelectNumberSpg_key : Left");
            break;
        case tvKey.KEY_RIGHT:
            alert("SelectNumberSpg_key : Right");
            break;
        case tvKey.KEY_UP:
            alert("SelectNumberSpg_key : Up");

            SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).removeClass('focus');
            if (SelectNumberSpg_numberIndex - 1 >= 0)
                SelectNumberSpg_numberIndex--;
            SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).addClass('focus');

            break;
        case tvKey.KEY_DOWN:
            alert("SelectNumberSpg_key : Down");
            //다음 번호로 포커스를 넘긴다.
            SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).removeClass('focus');
            //번호의 마지막에 도달하면, '번호 추가' 부분으로 포커스를 넘긴다.
            if (savedNumber_num < MAX_NUMBER) {
                if (SelectNumberSpg_numberIndex + 1 == savedNumber_num) {
                    SelectNumberSpg_index = 1;
                    SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).addClass('focus');

                    SelectNumberSpg.anchor.register.focus();
                }
                else {
                    SelectNumberSpg_numberIndex++;
                    SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).addClass('focus');
                }
            }
            else {
                SelectNumberSpg_index = 2;//'선택 완료' 부분으로 포커스를 넘긴다.
                SelectNumberSpg.anchor.submit.focus();

            }
            break;
        case tvKey.KEY_ENTER:
            if (SelectNumberSpg_index == 0) {

            }
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("SelectNumberSpg_key : Enter");
            break;
        default:
            alert("Unhandled key");
            break;
    }
};

//새로운 번호를 추가하는 부분의 키처리
SelectNumberSpg.registerKeyDown = function () {
    alert("SelectNumberSpg Register keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + SelectNumberSpg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("SelectNumberSpg_key : RETURN");
            TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.
            jQuery('#SelectNumberSpg').hide();//번호 선택 페이지를 닫는다.

            break;
        case tvKey.KEY_RIGHT:
            alert("SelectNumberSpg_key : Right");
            break;
        case tvKey.KEY_UP:
            alert("SelectNumberSpg_key : Up");
            if (SelectNumberSpg_registerIndex == 0) {//'번호 추가'버튼에 있을 때
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).removeClass('focus');
                SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).addClass('focus');
                SelectNumberSpg.anchor.select.focus(); //번호 선택부분으로 포커스를 넘긴다.
            }
            break;
        case tvKey.KEY_DOWN:
            alert("SelectNumberSpg_key : Down");
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("SelectNumberSpg_key : Enter");
            if (SelectNumberSpg_registerIndex == 0) {
                var tempString = '';
                //번호 입력창
                tempString += '<div>(번호 입력후 확인키를 누르면 인증번호가 전송됩니다)</div>';
                //인증번호 입력창
                tempString += '<div>(인증 번호 입력후 확인키를 누르세요)</div>';

                jQuery('#SelectNumber_list_new>div:nth-child(1)').hide();//'번호 추가'를 숨긴다.
                jQuery('#SelectNumber_list_new').append(tempString);
                jQuery.extend(SelectNumberSpg, {//div가 새로 추가된 시점에서 다시 'register'를 등록한다.
                    register: jQuery('#SelectNumber_list_new>div'),
                });
                //'새로운 번호'부분으로 포커스를 넘긴다.
                SelectNumberSpg_registerIndex++;
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).addClass('focus');
                MAX_INPUT = 11;
            }
            else if (SelectNumberSpg_registerIndex == 1) {
                if (inputNum == 0) {
                    //(번호 입력후 확인키를 누르면 인증번호가 전송됩니다) 글자를 지운다.
                    SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();
                }
                if (inputNum == 11) {
                    //11자리의 전화번호가 모두 입력된 상태에서 확인이 눌리면, 인증번호를 전송한다.

                    var _numberPost = SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).text();

                    // 서버로 인증번호 요청
                    $.ajax({
                        type: "POST", // POST형식으로 폼 전송
                        url: "http://172.16.100.171/CertificationSMS.php", // 목적지
                        timeout: 10000,
                        data: ({ numberPost: _numberPost }),
                        cache: false,
                        dataType: "text",
                        error: function (xhr, textStatus, errorThrown) { // 전송 실패
                            alert("전송에 실패했습니다.");
                        },
                        success: function (data) {
                            certificationNum = data;
                        }
                    });
                    phoneNumber_input = SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).text();
                    SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();
                    SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append("인증번호가 전송되었습니다");
                    SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).removeClass('focus');
                    SelectNumberSpg.register.eq(++SelectNumberSpg_registerIndex).addClass('focus');
                    inputNum = 0;
                    MAX_INPUT = 6;//인증번호 입력창은 최대 6글자 까지만 가능
                }
            }
            else if (SelectNumberSpg_registerIndex == 2) {
                //인증번호를 제대로 입력했을때
                if (certificationNum == SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).text()) {
                    //파일시스템에 저장하고 다시 로드한다.
                    loadFile();//파일 시스템을 로딩한다.
                    var savedNumber_temp = readFile();
                    savedNumber_temp += ',' + phoneNumber_input;
                    writeFile(savedNumber);


                    savedNumber = savedNumber_temp.split(',');
                    savedNumber_num = savedNumber.length;

                    jQuery('#SelectNumber_list_already').empty();
                    //파일 시스템에서 TV에 저장되어 있는 번호들을 불러온다.
                    for (var i = 0; i < savedNumber_num; i++) {
                        var tempString = '';
                        tempString += '<div>';
                        tempString += '<div class="number_left">' + (i + 1) + '</div>';
                        tempString += '<div class="number_right">' + savedNumber[i] + '</div>';
                        tempString += '</div>';

                        jQuery('#SelectNumber_list_already').append(tempString);
                    }
                    jQuery('#SelectNumber_list_new').empty();
                    if (savedNumber_num < MAX_NUMBER) {//번호들을 더 추가할 수 있다면
                        var tempString = '';
                        tempString += '<div>번호추가</div>';
                        jQuery('#SelectNumber_list_new').append(tempString);
                    }
                    jQuery.extend(SelectNumberSpg, {
                        number: jQuery('#SelectNumber_list_already>div'),
                        register: jQuery('#SelectNumber_list_new>div'),
                    });

                    //새로운 번호에 포커스를 맞추고 시작한다.
                    SelectNumberSpg_index = 0;
                    SelectNumberSpg_registerIndex = 0;
                    inputNum = 0;
                    certificationNum = 0;
                    SelectNumberSpg.number.eq(++SelectNumberSpg_numberIndex).addClass('focus');
                    SelectNumberSpg.anchor.select.focus();
                    /*
                    jQuery('#SelectNumber_list_already').empty();
                    Main.layout.subPage.load(subPageArr[4].html);
                    setTimeout(function () {
                        subPageArr[4].object.onLoad();//onLoad함수 안에 포커스를 넘겨주는 부분이 있음
                    }, 10);
                    */
                }
            }

            break;
            //
        case tvKey.KEY_0:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();
            if (inputNum < MAX_INPUT) {//최대 11자리(새로운 번호), 6자리(인증번호) 까지 입력 가능
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append("0");
                inputNum++;
            }

            break;
        case tvKey.KEY_1:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append("1");
                inputNum++;
            }

            break;
        case tvKey.KEY_2:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append("2");
                inputNum++;
            }

            break;
        case tvKey.KEY_3:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append("3");
                inputNum++;
            }

            break;
        case tvKey.KEY_4:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append("4");
                inputNum++;
            }

            break;
        case tvKey.KEY_5:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append("5");
                inputNum++;
            }

            break;
        case tvKey.KEY_6:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append("6");
                inputNum++;
            }

            break;
        case tvKey.KEY_7:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append("7");
                inputNum++;
            }

            break;
        case tvKey.KEY_8:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append("8");
                inputNum++;
            }

            break;
        case tvKey.KEY_9:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append("9");
                inputNum++;
            }

            break;
        case tvKey.KEY_LEFT://왼쪽 버튼을 누르면 글자를 하나씩 지운다.
            if (SelectNumberSpg_registerIndex == 1) {
                if (inputNum > 0) {//숫자가 하나라도 있을때
                    var tempNum = SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).text();
                    var tempNum = tempNum.substring(0, --inputNum);
                    SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();
                    SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append(tempNum);
                }
            }
            alert("SelectNumberSpg_key : Left");
            break;
        default:
            alert("Unhandled key");
            break;
    }
};


SelectNumberSpg.submitKeyDown = function () {
    alert("SelectNumberSpg keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + SelectNumberSpg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("SelectNumberSpg_key : RETURN");

            TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.
            jQuery('#SelectNumberSpg').hide();//번호 선택 페이지를 닫는다.

            break;
        case tvKey.KEY_LEFT:
            alert("SelectNumberSpg_key : Left");
            break;
        case tvKey.KEY_RIGHT:
            alert("SelectNumberSpg_key : Right");
            break;
        case tvKey.KEY_UP:
            alert("SelectNumberSpg_key : Up");
            break;
        case tvKey.KEY_DOWN:
            alert("SelectNumberSpg_key : Down");
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            alert("SelectNumberSpg_key : Enter");
            //productId와 userId로 상품 예약 요청을 한다.
            /*
            $.ajax{

            }*/
            TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.
            jQuery('#SelectNumberSpg').hide();//번호 선택 페이지를 닫는다.

            break;
        default:
            alert("Unhandled key");
            break;
    }

};

SelectNumberSpg.KeyDown = function () {
    alert("SelectNumberSpg keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + SelectNumberSpg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("SelectNumberSpg_key : RETURN");
            //SelectWatchPg.onLoad();
            break;
        case tvKey.KEY_LEFT:
            alert("SelectNumberSpg_key : Left");
            break;
        case tvKey.KEY_RIGHT:
            alert("SelectNumberSpg_key : Right");
            break;
        case tvKey.KEY_UP:
            alert("SelectNumberSpg_key : Up");
            break;
        case tvKey.KEY_DOWN:
            alert("SelectNumberSpg_key : Down");
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("SelectNumberSpg_key : Enter");
            break;
        default:
            alert("Unhandled key");
            break;
    }

};