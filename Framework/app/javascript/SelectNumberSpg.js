var SelectNumberSpg_index;
//0 : 기존의 번호 선택 
//1 : 새로운 번호 입력
//2 : 번호 최종 선택
//--------------------------------------------------
var SelectNumberSpg_numberIndex;
//기존에 저장된 번호들의 몇번째에 포커스가 되어있는지(0부터 시작)
var SelectNumberSpg_registerIndex;
//0:'번호 추가 버튼' 또는 '새로운 번호 입력 버튼'
//1:인증 번호 입력 버튼에 포커스
var SelectNumberSpg_submitIndex;
//0:'선택완료'에 포커스
//1:'번호삭제'에 포커스
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
var _numberPost;//새롭게 입력된 번호를 저장하는 변수

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

    //writeFile('01090897672');//test용 

    var savedNumber_temp = readFile();//파일 시스템에 저장되어 있는 번호들을 불러온다.
    alert(savedNumber_temp);
    if (!savedNumber_temp) {//파일에 내용이 없다면
        savedNumber_num = 0;
    }
    else {
        savedNumber = savedNumber_temp.split(',');
        savedNumber_num = savedNumber.length;
    }
    //파일 시스템에서 TV에 저장되어 있는 번호들을 불러온다.
    for (var i = 0; i < savedNumber_num; i++) {
        var tempString = '';
        tempString += '<div>';
//        tempString += '<div class="number_left">' + (i + 1) + '</div>';
//        tempString += '<div class="number_right">' + savedNumber[i] + '</div>';
        tempString += savedNumber[i];
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
        submit: jQuery('#SelectNumber_submit>div')
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
    SelectNumberSpg_submitIndex = 0;
};

SelectNumberSpg.enableKeys = function () {
    document.getElementById("anchor").focus();
};

//처음에 키를 받는 부분, 번호를 선택하는 부분
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
        case tvKey.KEY_LEFT:
            alert("SelectNumberSpg_key : Left");
            if (page_index == 3) //편성표에서 호출했을 때
                TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.
                

            else if (page_index == 2) //선택보기에서 호출했을 때
                SelectWatchPg.focus();//선택보기로 다시 포커스를 넘긴다.

            jQuery('#SelectNumberSpg').hide();//번호 선택 페이지를 닫는다.
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
                SelectNumberSpg.submit.eq(SelectNumberSpg_submitIndex).addClass('focus');
                SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).removeClass('focus');
            }
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("SelectNumberSpg_key : Enter");
            //번호 위에서 확인 버튼을 누르면,  '선택 완료' 부분으로 포커스를 넘긴다.
            _numberPost = SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).text();
            alert(_numberPost);

            SelectNumberSpg_index = 2;//'선택 완료' 부분으로 포커스를 넘긴다.
            SelectNumberSpg.anchor.submit.focus();
            SelectNumberSpg.submit.eq(SelectNumberSpg_submitIndex).addClass('focus');
            SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).removeClass('focus');
            SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).addClass('selected');            
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

            if (page_index == 3) //편성표에서 호출했을 때
                TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.


            else if (page_index == 2) //선택보기에서 호출했을 때
                SelectWatchPg.focus();//선택보기로 다시 포커스를 넘긴다.

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
                tempString += '<div>(전화 번호를 입력해주세요)</div>';
                //인증번호 입력창
                tempString += '<div>(인증 번호를 입력해주세요)</div>';

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
                    var isOverlapped = 0;//번호가 중복되면 1, 아니면 0
                    _numberPost = SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).text();
                    //입력된 번호가 이미 클라이언트에 있는 번호이면, 에러 메세지를 출력하고 다시 입력하도록 한다.
                    if (savedNumber_num != 0) {//번호가 하나라도 등록된 상태라면, 중복체크를 한다.
                        loadFile();
                        var savedNumber_temp = readFile();//저장된 번호를 읽어온다.
                        var savedNumber_forCheck = savedNumber_temp.split(',');
                        for (var i = 0; i < savedNumber_forCheck.length; i++) {
                            if (_numberPost == savedNumber_forCheck[i]) {//일치하는 번호가 있으면
                                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();
                                inputNum = 0;
                                SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append("이미 저장된 번호입니다. 다시 입력하세요");
                                isOverlapped = 1;
                                break;//다시 입력하도록 한다.
                            }
                        }
                    }
                    if (isOverlapped == 0) {//중복되지 않았을 때만 전송한다.
                        // 서버로 인증번호 요청
                        $.ajax({
                            type: "POST", // POST형식으로 폼 전송
                            url: PHP_SERVER_ADDRESS+"/CertificationSMS.php", // 목적지
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
            }
            else if (SelectNumberSpg_registerIndex == 2) {
                //인증번호를 제대로 입력했을때
                if (certificationNum == SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).text()) {
                    //파일시스템에 저장하고 다시 로드한다.
                    loadFile();//파일 시스템을 로딩한다.
                    var savedNumber_temp = readFile();
                    if (savedNumber_num == 0) {//첫번째로 등록한 번호일때는 '컴마'없이 번호만 등록한다.
                        savedNumber_temp += phoneNumber_input;
                    }
                    else {
                        savedNumber_temp += ',' + phoneNumber_input;
                    }
                    writeFile(savedNumber_temp);


                    savedNumber = savedNumber_temp.split(',');
                    savedNumber_num = savedNumber.length;

                    jQuery('#SelectNumber_list_already').empty();
                    //파일 시스템에서 TV에 저장되어 있는 번호들을 불러온다.
                    for (var i = 0; i < savedNumber_num; i++) {
                        var tempString = '';
                        tempString += '<div>';
//                        tempString += '<div class="number_left">' + (i + 1) + '</div>';
//                        tempString += '<div class="number_right">' + savedNumber[i] + '</div>';
                        tempString += savedNumber[i];                        
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
                    SelectNumberSpg_index = 0;//'번호 선택'부분을 선택
                    SelectNumberSpg_registerIndex = 0;//'번호 추가'버튼이 떠있도록
                    inputNum = 0;
                    certificationNum = 0;
                    if (savedNumber_num == 1)//첫번째 번호가 등록되었을때는 그 번호에 포커스를 맞춘다.
                        SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).addClass('focus');
                    else//원래 번호가 하나라도 있었을 경우에는 다음 번호에 포커스를 맞춘다.
                        SelectNumberSpg.number.eq(++SelectNumberSpg_numberIndex).addClass('focus');

                    SelectNumberSpg.anchor.select.focus();

                    //새로운 번호를 서버에 저장한다.
                    $.ajax({
                        type: "POST", // POST형식으로 폼 전송
                        url: SERVER_ADDRESS + "/user", // 목적지
                        data: {
                            phoneNumber: _numberPost//"를 안붙이면 전화번호 맨 앞의 0이 사라짐
                        },
                        dataType: "text",
                        success: function (data) {
                            alert("번호 등록 성공");
                        }
                    });
                }
                else {//인증번호를 제대로 입력하지 않았을때,
                    SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();
                    SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append("(인증번호를 다시 입력하세요)");
                    inputNum = 0;
                }
            }

            break;

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
            if (SelectNumberSpg_registerIndex == 1 || SelectNumberSpg_registerIndex == 2) {
                if (inputNum > 0) {//숫자가 하나라도 있을때
                    var tempNum = SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).text();
                    tempNum = tempNum.substring(0, --inputNum);
                    SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).empty();
                    SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).append(tempNum);
                }
                else {
                    alert("asdasd");
                    if (page_index == 3) //편성표에서 호출했을 때
                        TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.
                    else if (page_index == 2) //선택보기에서 호출했을 때
                        SelectWatchPg.focus();//선택보기로 다시 포커스를 넘긴다.

                    jQuery('#SelectNumberSpg').hide();//번호 선택 페이지를 닫는다.
                }
            }
                else {
                    alert("asdasd");
                    if (page_index == 3) //편성표에서 호출했을 때
                        TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.
                    else if (page_index == 2) //선택보기에서 호출했을 때
                        SelectWatchPg.focus();//선택보기로 다시 포커스를 넘긴다.

                    jQuery('#SelectNumberSpg').hide();//번호 선택 페이지를 닫는다.
                }            
            alert("SelectNumberSpg_key : Left");
            break;
        default:
            alert("Unhandled key");
            break;
    }
};

//'선택 완료'부분을 처리하는 곳
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

            if (page_index == 3) //편성표에서 호출했을 때
                TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.


            else if (page_index == 2) //선택보기에서 호출했을 때
                SelectWatchPg.focus();//선택보기로 다시 포커스를 넘긴다.

            jQuery('#SelectNumberSpg').hide();//번호 선택 페이지를 닫는다.
            break;

            break;
        case tvKey.KEY_LEFT:
            alert("SelectNumberSpg_key : Left");
            if (SelectNumberSpg_submitIndex == 1) {
                SelectNumberSpg.submit.eq(SelectNumberSpg_submitIndex).removeClass('focus');
                SelectNumberSpg.submit.eq(--SelectNumberSpg_submitIndex).addClass('focus');
            }
            else{
                if (page_index == 3) //편성표에서 호출했을 때
                    TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.

                else if (page_index == 2) //선택보기에서 호출했을 때
                    SelectWatchPg.focus();//선택보기로 다시 포커스를 넘긴다.

                jQuery('#SelectNumberSpg').hide();//번호 선택 페이지를 닫는다.                
            }
            break;
        case tvKey.KEY_RIGHT:
            alert("SelectNumberSpg_key : Right");
            if (SelectNumberSpg_submitIndex == 0) {
                SelectNumberSpg.submit.eq(SelectNumberSpg_submitIndex).removeClass('focus');
                SelectNumberSpg.submit.eq(++SelectNumberSpg_submitIndex).addClass('focus');
            }
            break;
        case tvKey.KEY_UP:
            alert("SelectNumberSpg_key : Up");
            SelectNumberSpg.anchor.select.focus();           
            SelectNumberSpg.submit.eq(SelectNumberSpg_submitIndex).removeClass('focus');
            SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).addClass('focus');
            SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).removeClass('selected');            
            SelectNumberSpg_submitIndex = 0; 

            break;
        case tvKey.KEY_DOWN:
            alert("SelectNumberSpg_key : Down");
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            alert("SelectNumberSpg_key : Enter");

            //'선택 완료' 버튼을 눌렀을 때
            if (SelectNumberSpg_submitIndex == 0) {
                //중분류 카테고리 예약이면
                if (page_index == 3 && productIndex == 0) {

                    $.ajax({
                        type: "POST",
                        url: SERVER_ADDRESS + "/cAlarms",
                        data: {
                            secondName: secondCategory[big_index][mid_index],//중분류의 이름
                            phoneNumber: _numberPost,//선택된 사용자의 번호
                            firstId: (big_index+1)//대분류의 id(DB에서는 대분류 id가 1부터 시작)
                        },
                        dataType: "text",
                        success: function (data) {
                            alert("중분류 예약 성공");
                        }
                    });
                    TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.
                    jQuery('#SelectNumberSpg').hide();//번호 선택 페이지를 닫는다.

                }
                    //단일 상품 예약이면
                else if (page_index == 3 && productIndex == 1) {

                    $.ajax({
                        type: "POST", // POST형식으로 폼 전송
                        url: SERVER_ADDRESS + "/sAlarms", // 목적지
                        data: {
                            productId: productLoadedId[productListIndex],
                            phoneNumber: _numberPost
                        },
                        dataType: "text",
                        success: function (data) {
                            alert("알람 등록 성공");
                        }
                    });
                    TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.
                    jQuery('#SelectNumberSpg').hide();//번호 선택 페이지를 닫는다.
                }
                else if (page_index == 2 && SelectWatchPg_index == 3) {//선택보기에서 '직접 구매' 버튼을 눌렀을 때
                    
                    $.ajax({
                        url: SERVER_ADDRESS + '/now',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            var tempIndex = 0;
                            var currentChannel = Player.getChannel();
                            var _URLPost;
                            $.each(data, function (key, value) {
                                if (tempIndex == currentChannel) {
                                    _URLPost = value.productPgURL;
                                }
                                tempIndex++;
                            });
                            setTimeout(function () {
                                $.ajax({
                                    type: "POST", // POST형식으로 폼 전송
                                    url: PHP_SERVER_ADDRESS + "/PaymentSMS.php", // 목적지
                                    timeout: 10000,
                                    data: {
                                        myPhoneNumber:_numberPost,
                                        url:_URLPost
                                        },
                                    cache: false,
                                    dataType: "text",
                                    error: function (xhr, textStatus, errorThrown) { // 전송 실패
                                        alert("전송에 실패했습니다.");
                                    },
                                    success: function (data) {
                                        alert(data);
                                        alert("구매 url 문자 전송 성공");
                                    }
                                });
                            }, 10);
                        }
                    });

                    SelectWatchPg.focus();//선택보기로 다시 포커스를 넘긴다.   
                    jQuery('#SelectNumberSpg').hide();//번호 선택 페이지를 닫는다.
                }
                
            }
            //'번호 삭제' 버튼을 눌렀을 때
            else if (SelectNumberSpg_submitIndex == 1) {
                //ajax 요청이 들어가는 부분
                //번호 삭제시, 데이터베이스에 있는 내용도 같이 지울지 이야기 해봐야 함.
                alert(_numberPost);
                $.ajax({
                    type: "DELETE", //DELETE 요청
                    url: SERVER_ADDRESS + "/user",//목적지
                    data: {
                        phoneNumber: _numberPost,
                    },
                    dataType: "text",
                    success: function (data) {
                        alert("사용자 삭제 성공");
                    }
                });
                //클라에서도 번호를 지우고 
                jQuery('#SelectNumber_list_already').empty();

                loadFile();//파일 시스템을 로딩한다.
                var savedNumber_temp = readFile();
                savedNumber = savedNumber_temp.split(',');
                savedNumber_num = savedNumber.length;
                savedNumber_temp = '';
                for (var i = 0; i < savedNumber_num; i++) {
                    if (savedNumber[i] != _numberPost) {//지우려는 번호만 빼고 다시 저장한다.
                        if (i != 0)//첫번째 번호가 아니면 컴마도 같이 등록한다.
                            savedNumber_temp += ',';
                        savedNumber_temp += savedNumber[i];
                    }
                }
                alert("다시 저장할 번호 : " + savedNumber_temp);
                writeFile(savedNumber_temp);

                //다시 로드한다.
                savedNumber_temp = readFile();
                savedNumber_num = savedNumber_temp.length;
                alert("새로 불러온 번호의 개수:" + savedNumber_num + " " + savedNumber_temp);
                //파일 시스템에서 TV에 저장되어 있는 번호들을 불러온다.
                for (var i = 0; i < savedNumber_num; i++) {
                    var tempString = '';
                    tempString += '<div>';
//                    tempString += '<div class="number_left">' + (i + 1) + '</div>';
//                    tempString += '<div class="number_right">' + savedNumber[i] + '</div>';
                    tempString += savedNumber[i];
                    tempString += '</div>';

                    jQuery('#SelectNumber_list_already').append(tempString);
                }

                jQuery('#SelectNumber_list_new').empty();
                var tempString = '';
                tempString += '<div>번호추가</div>';
                jQuery('#SelectNumber_list_new').append(tempString);

                jQuery.extend(SelectNumberSpg, {
                    number: jQuery('#SelectNumber_list_already>div'),
                    register: jQuery('#SelectNumber_list_new>div'),
                });

                //새로운 번호에 포커스를 맞추고 시작한다.
                SelectNumberSpg_index = 0;//'번호 선택'부분을 선택
                SelectNumberSpg_registerIndex = 0;//'번호 추가'버튼이 떠있도록
                SelectNumberSpg_numberIndex = 0;//다시 첫번째 번호로 포커스를 넘긴다.
                inputNum = 0;
                certificationNum = 0;

                SelectNumberSpg.submit.eq(SelectNumberSpg_submitIndex--).removeClass('focus');
                if (savedNumber_num == 0) {//번호 삭제후 아무 번호도 남지 않았을 때,
                    //번호 추가 부분으로 포커스를 넘긴다.
                    SelectNumberSpg.anchor.register.focus();
                    SelectNumberSpg.register.eq(SelectNumberSpg_registerIndex).addClass('focus');
                }
                else {//삭제후에도 번호가 남아 있을 때,
                    SelectNumberSpg.number.eq(SelectNumberSpg_numberIndex).addClass('focus');
                    SelectNumberSpg.anchor.select.focus();
                }
                
            }

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