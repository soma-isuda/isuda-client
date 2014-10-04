var MyPg_index;
//0 : 기존의 번호 선택 
//1 : 새로운 번호 입력
//2 : 번호 최종 선택
//--------------------------------------------------
var MyPg_numberIndex;
//기존에 저장된 번호들의 몇번째에 포커스가 되어있는지(0부터 시작)
var MyPg_registerIndex;
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

var MyPg = {

};

MyPg.onLoad = function () {
    alert("MyPg onLoad");
    //document.getElementById("MyPg").style.marginLeft="1460px";
    jQuery.extend(MyPg, {
        anchor: {
            main: jQuery('#anchor_MyPg'),
            select: jQuery('#anchor_MyPg_select'),
            register: jQuery('#anchor_MyPg_register'),
            submit: jQuery('#anchor_MyPg_submit'),
        }
    });
    //this.focus();

    loadFile();//파일 시스템을 로딩한다.
    //writeFile(''); //전화번호 초기화
    /*
    savedNumber = readFile();
    savedNumber += ',01090897672'
    writeFile(savedNumber);
    //번호 추가 방법*/

    writeFile('01090897672');//test용 

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
        tempString += '<div class="number_left">' + (i + 1) + '</div>';
        tempString += '<div class="number_right">' + savedNumber[i] + '</div>';
        tempString += '</div>';

        jQuery('#MyPg_SelectNumber_list_already').append(tempString);
    }
///////////////
    if (savedNumber_num < MAX_NUMBER) {//번호들을 더 추가할 수 있다면
        var tempString = '';
        //tempString += '<div id="new_first">번호추가</div>';
        tempString += '<div>번호추가</div>';
        jQuery('#MyPg_SelectNumber_list_new').append(tempString);
    }
    jQuery.extend(MyPg, {
        number: jQuery('#MyPg_SelectNumber_list_already>div'),
        register: jQuery('#MyPg_SelectNumber_list_new>div'),
    });

    if (savedNumber_num > 0)//번호가 한개라도 저장되어 있으면, 그 번호에 포커스를 맞추고 시작한다.
        MyPg.number.eq(MyPg_numberIndex).addClass('focus');
    else if (savedNumber_num == 0) {//번호가 한개도 없으면, 번호 추가에 포커스를 맞추고 시작한다.
        //'번호 추가' 부분으로 포커스를 넘긴다.
        MyPg_index = 1;
        MyPg.register.eq(MyPg_registerIndex).addClass('focus');
        MyPg.anchor.register.focus();
    }
};


MyPg.focus = function () {
    alert("MyPg.focus");
    MyPg.anchor.select.focus();
    // 변수 초기화
    MyPg_index = 0;
    MyPg_numberIndex = 0;
    MyPg_registerIndex = 0;
    MyPg.number.eq(MyPg_numberIndex).addClass('focus');
};

MyPg.enableKeys = function () {
    document.getElementById("anchor").focus();
};

//처음에 키를 받는 부분
MyPg.selectKeyDown = function () {
    alert("MyPg Select keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + MyPg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
        case tvKey.KEY_LEFT:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("MyPg_key : RETURN");
            Main.focus();//편성표로 다시 포커스를 넘긴다.
            //jQuery('#MyPg').hide();//번호 선택 페이지를 닫는다.
        
            alert("MyPg_key : Left");
            break;
        case tvKey.KEY_RIGHT:
            alert("MyPg_key : Right");
            break;
        case tvKey.KEY_UP:
            alert("MyPg_key : Up");

            MyPg.number.eq(MyPg_numberIndex).removeClass('focus');
            if (MyPg_numberIndex > 0)
             //   MyPg_numberIndex--;
            MyPg.number.eq(--MyPg_numberIndex).addClass('focus');

            break;
        case tvKey.KEY_DOWN:
            alert("MyPg_key : Down");
            //다음 번호로 포커스를 넘긴다.
            MyPg.number.eq(MyPg_numberIndex).removeClass('focus');
            //번호의 마지막에 도달하면, '번호 추가' 부분으로 포커스를 넘긴다.
            if (savedNumber_num < MAX_NUMBER) {
                if (MyPg_numberIndex + 1 == savedNumber_num) {
                    MyPg_index = 1;
                     MyPg.anchor.register.focus();
                    MyPg.register.eq(MyPg_registerIndex).addClass('focus');     
                }
                else {
                    MyPg_numberIndex++;
                    MyPg.number.eq(MyPg_numberIndex).addClass('focus');
                }
            }
            else {
                MyPg_index = 2;//'선택 완료' 부분으로 포커스를 넘긴다.
                MyPg.anchor.submit.focus();

            }
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("MyPg_key : Enter");
            
            break;
        default:
            alert("Unhandled key");
            break;
    }
};

//새로운 번호를 추가하는 부분의 키처리
MyPg.registerKeyDown = function () {
    alert("MyPg Register keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + MyPg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("MyPg_key : RETURN");
            Main.focus();//마이페이지로 다시 포커스를 넘긴다.
            // 추가할 번호 입력창과 안ㄴ창을 숨긴다.
            // jQuery('#MyPg_SelectNumber_list_new>div').hide();
            // // 다시 '번호추가'를 만들어준다.
            //  var tempString = '';
            // tempString += '<div>번호추가</div>';
            // jQuery('#MyPg_SelectNumber_list_new').append(tempString);
            // jQuery.extend(MyPg, {//div가 새로 추가된 시점에서 다시 'register'를 등록한다.
            //         register: jQuery('#MyPg_SelectNumber_list_new>div'),
            // });
            break;
        case tvKey.KEY_RIGHT:
            alert("MyPg_key : Right");
            break;
        case tvKey.KEY_UP:
            alert("MyPg_key : Up");
            if (MyPg_registerIndex == 0) {//'번호 추가'버튼에 있을 때
                MyPg.register.eq(MyPg_registerIndex).removeClass('focus');
                MyPg.number.eq(MyPg_numberIndex).addClass('focus');
                MyPg.anchor.select.focus(); //번호 선택부분으로 포커스를 넘긴다.
            }
            break;
        case tvKey.KEY_DOWN:
            alert("MyPg_key : Down");
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("MyPg_key : Enter");
            if (MyPg_registerIndex == 0) {
                var tempString = '';
                //번호 입력창
                tempString += '<div>(번호 입력후 확인키를 누르면 인증번호가 전송됩니다)</div>';
                //인증번호 입력창
                tempString += '<div>(인증 번호 입력후 확인키를 누르세요)</div>';

                jQuery('#MyPg_SelectNumber_list_new>div:nth-child(1)').hide();//'번호 추가'를 숨긴다.
                jQuery('#MyPg_SelectNumber_list_new').append(tempString);
                jQuery.extend(MyPg, {//div가 새로 추가된 시점에서 다시 'register'를 등록한다.
                    register: jQuery('#MyPg_SelectNumber_list_new>div'),
                });
                //'새로운 번호'부분으로 포커스를 넘긴다.
                //MyPg_registerInde++;
                MyPg.register.eq(++MyPg_registerIndex).addClass('focus');
                MAX_INPUT = 11;
            }
            else if (MyPg_registerIndex == 1) {
                if (inputNum == 0) {
                    //(번호 입력후 확인키를 누르면 인증번호가 전송됩니다) 글자를 지운다.
                    MyPg.register.eq(MyPg_registerIndex).empty();
                }
                if (inputNum == 11) {
                    //11자리의 전화번호가 모두 입력된 상태에서 확인이 눌리면, 인증번호를 전송한다.
                    var isOverlapped = 0;//번호가 중복되면 1, 아니면 0
                    var _numberPost = MyPg.register.eq(MyPg_registerIndex).text();
                    //입력된 번호가 이미 클라이언트에 있는 번호이면, 에러 메세지를 출력하고 다시 입력하도록 한다.
                    if (savedNumber_num != 0) {//번호가 하나라도 등록된 상태라면, 중복체크를 한다.
                        loadFile();
                        var savedNumber_temp = readFile();//저장된 번호를 읽어온다.
                        var savedNumber_forCheck = savedNumber_temp.split(',');
                        for (var i = 0; i < savedNumber_forCheck.length; i++) {
                            if (_numberPost == savedNumber_forCheck[i]) {//일치하는 번호가 있으면
                                MyPg.register.eq(MyPg_registerIndex).empty();
                                inputNum = 0;
                                MyPg.register.eq(MyPg_registerIndex).append("이미 저장된 번호입니다. 다시 입력하세요");
                                isOverlapped = 1;
                                break;//다시 입력하도록 한다.
                            }
                        }
                    }
                    if (isOverlapped == 0) {//중복되지 않았을 때만 전송한다.
                        // 서버로 인증번호 요청
                        $.ajax({
                            type: "POST", // POST형식으로 폼 전송
                            url: "http://"+PHP_SERVER_ADDRESS+"/CertificationSMS.php", // 목적지
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
                        phoneNumber_input = MyPg.register.eq(MyPg_registerIndex).text();
                        MyPg.register.eq(MyPg_registerIndex).empty();
                        MyPg.register.eq(MyPg_registerIndex).append("인증번호가 전송되었습니다");
                        MyPg.register.eq(MyPg_registerIndex).removeClass('focus');
                        MyPg.register.eq(++MyPg_registerIndex).addClass('focus');
                        inputNum = 0;
                        MAX_INPUT = 6;//인증번호 입력창은 최대 6글자 까지만 가능
                    }
                }
            }
            else if (MyPg_registerIndex == 2) {
                //인증번호를 제대로 입력했을때
                if (certificationNum == MyPg.register.eq(MyPg_registerIndex).text()) {
                    //파일시스템에 저장하고 다시 로드한다.
                    loadFile();//파일 시스템을 로딩한다.
                    var savedNumber_temp = readFile();
                    if (savedNumber_num == 0) {//첫번째로 등록한 번호일때는 '컴마'없이 번호만 등록한다.
                        savedNumber_temp += phoneNumber_input;
                    }
                    else{
                        savedNumber_temp += ',' + phoneNumber_input;
                    }
                    writeFile(savedNumber_temp);


                    savedNumber = savedNumber_temp.split(',');
                    savedNumber_num = savedNumber.length;

                    jQuery('#MyPg_SelectNumber_list_already').empty();
                    //파일 시스템에서 TV에 저장되어 있는 번호들을 불러온다.
                    for (var i = 0; i < savedNumber_num; i++) {
                        var tempString = '';
                        tempString += '<div>';
                        tempString +=   '<div class="number_left">' + (i + 1) + '</div>';
                        tempString +=   '<div class="number_right">' + savedNumber[i] + '</div>';
                        tempString += '</div>';

                        jQuery('#MyPg_SelectNumber_list_already').append(tempString);
                    }
                    jQuery('#MyPg_SelectNumber_list_new').empty();
                    if (savedNumber_num < MAX_NUMBER) {//번호들을 더 추가할 수 있다면
                        var tempString = '';
                        tempString += '<div>번호추가</div>';
                        jQuery('#MyPg_SelectNumber_list_new').append(tempString);
                    }
                    jQuery.extend(MyPg, {
                        number: jQuery('#MyPg_SelectNumber_list_already>div'),
                        register: jQuery('#MyPg_SelectNumber_list_new>div'),
                    });

                    //새로운 번호에 포커스를 맞추고 시작한다.
                    MyPg_index = 0;//'번호 선택'부분을 선택
                    MyPg_registerIndex = 0;//'번호 추가'버튼이 떠있도록
                    inputNum = 0;
                    certificationNum = 0;
                    if (savedNumber_num == 1)//첫번째 번호가 등록되었을때는 그 번호에 포커스를 맞춘다.
                        MyPg.number.eq(MyPg_numberIndex).addClass('focus');
                    else//원래 번호가 하나라도 있었을 경우에는 다음 번호에 포커스를 맞춘다.
                        MyPg.number.eq(++MyPg_numberIndex).addClass('focus');

                    MyPg.anchor.select.focus();
                    
                }
                else {//인증번호를 제대로 입력하지 않았을때,
                    MyPg.register.eq(MyPg_registerIndex).empty();
                    MyPg.register.eq(MyPg_registerIndex).append("(인증번호를 다시 입력하세요)");
                    inputNum = 0;
                }
            }

            break;
           
        case tvKey.KEY_0:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                MyPg.register.eq(MyPg_registerIndex).empty();
            if (inputNum < MAX_INPUT) {//최대 11자리(새로운 번호), 6자리(인증번호) 까지 입력 가능
                MyPg.register.eq(MyPg_registerIndex).append("0");
                inputNum++;
            }

            break;
        case tvKey.KEY_1:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                MyPg.register.eq(MyPg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                MyPg.register.eq(MyPg_registerIndex).append("1");
                inputNum++;
            }

            break;
        case tvKey.KEY_2:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                MyPg.register.eq(MyPg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                MyPg.register.eq(MyPg_registerIndex).append("2");
                inputNum++;
            }

            break;
        case tvKey.KEY_3:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                MyPg.register.eq(MyPg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                MyPg.register.eq(MyPg_registerIndex).append("3");
                inputNum++;
            }

            break;
        case tvKey.KEY_4:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                MyPg.register.eq(MyPg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                MyPg.register.eq(MyPg_registerIndex).append("4");
                inputNum++;
            }

            break;
        case tvKey.KEY_5:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                MyPg.register.eq(MyPg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                MyPg.register.eq(MyPg_registerIndex).append("5");
                inputNum++;
            }

            break;
        case tvKey.KEY_6:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                MyPg.register.eq(MyPg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                MyPg.register.eq(MyPg_registerIndex).append("6");
                inputNum++;
            }

            break;
        case tvKey.KEY_7:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                MyPg.register.eq(MyPg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                MyPg.register.eq(MyPg_registerIndex).append("7");
                inputNum++;
            }

            break;
        case tvKey.KEY_8:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                MyPg.register.eq(MyPg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                MyPg.register.eq(MyPg_registerIndex).append("8");
                inputNum++;
            }

            break;
        case tvKey.KEY_9:

            if (inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                MyPg.register.eq(MyPg_registerIndex).empty();

            if (inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                MyPg.register.eq(MyPg_registerIndex).append("9");
                inputNum++;
            }

            break;
        case tvKey.KEY_LEFT://왼쪽 버튼을 누르면 글자를 하나씩 지운다.
            if (MyPg_registerIndex == 1) {
                if (inputNum > 0) {//숫자가 하나라도 있을때
                    var tempNum = MyPg.register.eq(MyPg_registerIndex).text();
                    var tempNum = tempNum.substring(0, --inputNum);
                    MyPg.register.eq(MyPg_registerIndex).empty();
                    MyPg.register.eq(MyPg_registerIndex).append(tempNum);
                }
            }
            alert("MyPg_key : Left");
            break;
        default:
            alert("Unhandled key");
            break;
    }
};


MyPg.submitKeyDown = function () {
    alert("MyPg keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + MyPg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("MyPg_key : RETURN");

            TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.
            jQuery('#MyPg').hide();//번호 선택 페이지를 닫는다.

            break;
        case tvKey.KEY_LEFT:
            alert("MyPg_key : Left");
            break;
        case tvKey.KEY_RIGHT:
            alert("MyPg_key : Right");
            break;
        case tvKey.KEY_UP:
            alert("MyPg_key : Up");
            break;
        case tvKey.KEY_DOWN:
            alert("MyPg_key : Down");
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            alert("MyPg_key : Enter");
            //productId와 userId로 상품 예약 요청을 한다.
            /*
            $.ajax{

            }*/
            TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.
            jQuery('#MyPg').hide();//번호 선택 페이지를 닫는다.

            break;
        default:
            alert("Unhandled key");
            break;
    }

};

MyPg.KeyDown = function () {
    alert("MyPg keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + MyPg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("MyPg_key : RETURN");
            //SelectWatchPg.onLoad();
            break;
        case tvKey.KEY_LEFT:
            alert("MyPg_key : Left");
            break;
        case tvKey.KEY_RIGHT:
            alert("MyPg_key : Right");
            break;
        case tvKey.KEY_UP:
            alert("MyPg_key : Up");
            break;
        case tvKey.KEY_DOWN:
            alert("MyPg_key : Down");
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("MyPg_key : Enter");
            break;
        default:
            alert("Unhandled key");
            break;
    }

};