var MyPg_SelectNumber_index;
//0 : 기존의 번호 선택 
//1 : 새로운 번호 입력
//2 : 번호 최종 선택
//--------------------------------------------------
var MyPg_numberIndex;
//기존에 저장된 번호들의 몇번째에 포커스가 되어있는지(0부터 시작)
var MyPg_registerIndex;
//0:'번호 추가 버튼' 또는 '새로운 번호 입력 버튼'
//1:인증 번호 입력 버튼에 포커스
var MyPg_submitIndex;
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

var MyPg_menuIndex=0;
var SMSAlarm_index=0;//방송상품 알람리스트에서 몇 번쨰를 나타내는 인덱스

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
        },
        selectNumber : {
            elem    : jQuery('#MyPg_seletNumber_list'),
            submit  : jQuery('#MyPg_seletNumber_submit'),
            anchor  : jQuery('#anchor_MyPg_seletNumber')
        },
        SMSAlarm : {
            submit    : jQuery('#MyPg_SMSAlarm_submit'),
            anchor    : jQuery('#anchor_MyPg_SMSAlarm')
        },
        // SMSAlarm : {
        //     elem    : jQuery('.MyPgItem'), //jQuery('#MyPg_SMSAlarm_list').find('ul>li'),
        //     submit  : jQuery('#MyPg_SMSAlarm_submit'),
        //     anchor  : jQuery('#anchor_MyPg_SMSAlarm')
        // },
        category:{
        	elem 	: jQuery('#MyPg_CategoryAlarm_list'),
        	submit	: jQuery('#MyPg_CategoryAlarm_submit'),
        	anchor	: jQuery('#anchor_MyPg_Category')
        },
        menu : jQuery(".MyPg_menu")
    });
    //this.focus();

    loadFile();//파일 시스템을 로딩한다.
 
    //writeFile('01028623166');//test용 

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
        tempString += '<div class="MyPgItem MyPg_list_Item">';
                                //tempString += '<div class="number_left">' + (i + 1) + '</div>';
        tempString += savedNumber[i];
        tempString += '</div>';

        jQuery('#MyPg_SelectNumber_list_already').append(tempString);
    }

    if (savedNumber_num < MAX_NUMBER) {//번호들을 더 추가할 수 있다면
        var tempString = '';
        //tempString += '<div id="new_first">번호추가</div>';
        tempString += '<div>번호추가</div>';
        jQuery('#MyPg_SelectNumber_list_new').append(tempString);
    }
    jQuery.extend(MyPg, {
        number: jQuery('#MyPg_SelectNumber_list_already>div'),
        register: jQuery('#MyPg_SelectNumber_list_new>div'),
        submit: jQuery('#MyPg_SelectNumber_submit')
    });


    // 변수 초기화
    MyPg_index = 0;
    MyPg_numberIndex = 0;
    MyPg_registerIndex = 0;
    MyPg_submitIndex = 0;
    
    
};


MyPg.focus = function () {
    alert("MyPg.focus");
    MyPg.anchor.select.focus();
    MyPg.menu.eq(1).removeClass('focus');
    MyPg.menu.eq(2).removeClass('focus');
    MyPg.menu.eq(0).addClass('focus');
    MyPg.submit.addClass('focus_');
    MyPg.SMSAlarm.submit.removeClass('focus_');    
    MyPg.category.submit.removeClass('focus_');    
    MyPg.SMSAlarm.submit.removeClass('focus');    
    MyPg.category.submit.removeClass('focus');    

    if (savedNumber_num > 0){//번호가 한개라도 저장되어 있으면, 그 번호에 포커스를 맞추고 시작한다.
        MyPg.number.eq(MyPg_numberIndex).removeClass('select');
        MyPg.number.eq(MyPg_numberIndex).addClass('focus');
        this.CategorySetting(MyPg_numberIndex);
        this.SMSAlarmSetting(MyPg_numberIndex);
    }
    else if (savedNumber_num == 0) {//번호가 한개도 없으면, 번호 추가에 포커스를 맞추고 시작한다.
        //'번호 추가' 부분으로 포커스를 넘긴다.
        MyPg_index = 1;
        MyPg.number.eq(MyPg_numberIndex).removeClass('select');
        MyPg.register.eq(MyPg_registerIndex).addClass('focus');
        MyPg.anchor.register.focus();
    }
     //_numberPost = MyPg.number.eq(MyPg_numberIndex).find('.number_right').text();
    
};

MyPg.categoryfocus = function () {
    alert("MyPg.categoryfocus");
    alert(MyPg.category_.arr.length);
    MyPg.menu.eq(0).removeClass('focus');
    MyPg.menu.eq(1).removeClass('focus');
    MyPg.menu.eq(2).addClass('focus');
    MyPg.submit.removeClass('focus_');
    MyPg.SMSAlarm.submit.removeClass('focus_');    
    MyPg.category.submit.addClass('focus_');
    MyPg.submit.removeClass('focus');
    MyPg.SMSAlarm.submit.removeClass('focus');    


    if(MyPg.category_.arr.length > 0){
        MyPg.category.anchor.focus();
        MyPg.category_.content.eq(MyPg.category_.index).addClass('focus');
           	
    }
    else if(MyPg.SMSAlarm.elem.length > 0){
    	MyPg.SMSAlarmfocus(MyPg_numberIndex);    	
    }
    else 
        MyPg.focus();
};

MyPg.SMSAlarmfocus = function () {
    alert("MyPg.SMSAlarmfocus");
    alert("MyPg_SMSAlarm.elem.length : " + MyPg.SMSAlarm.elem.length);
    MyPg.menu.eq(0).removeClass('focus');
    MyPg.menu.eq(2).removeClass('focus');
    MyPg.menu.eq(1).addClass('focus');
    MyPg.submit.removeClass('focus_');
    MyPg.SMSAlarm.submit.addClass('focus_');    
    MyPg.category.submit.removeClass('focus_'); 
    MyPg.submit.removeClass('focus');
    MyPg.category.submit.removeClass('focus');     

    if(SMSAlarm_index >= MyPg.SMSAlarm.elem.length)
            SMSAlarm_index=0;
    if(MyPg.SMSAlarm.elem.length > 0){
        //상품알람리스트에 엥커 -> 키다운함수도 바뀐다.
        MyPg.SMSAlarm.anchor.focus();
        //상품알람리스트 포커스 효과
        MyPg.SMSAlarm.elem.eq(SMSAlarm_index).addClass('focus');   
    }
    else if(MyPg.category_.arr.length > 0){
        MyPg.categoryfocus();       
    }
    else
        MyPg.focus();
};

MyPg.enableKeys = function () {
    document.getElementById("anchor").focus();
};

//처음에 키를 받는 부분, 번호를 선택하는 부분
MyPg.selectKeyDown = function () {
    alert("MyPg Select keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + MyPg_index);
    //nuberPost = 현재 포커스된 번호리스트의 번호

    //_numberPost = MyPg.number.eq(MyPg_numberIndex).find('.number_right').text();
    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
        case tvKey.KEY_LEFT:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("MyPg_key : RETURN or LEFT");
            MyPg.number.eq(MyPg_numberIndex).removeClass('focus');
            
            Main.focus();//사이드바 다시 포커스를 넘긴다.
            //jQuery('#MyPg').hide();//번호 선택 페이지를 닫는다.
            break;
        case tvKey.KEY_RIGHT:
            alert("MyPg_key : Right");
            alert("length : "+MyPg.SMSAlarm.elem.length);
            alert(SMSAlarm_index);
            //번호 리스트 포커스효과 삭제
            MyPg.number.eq(MyPg_numberIndex).removeClass('focus');
            MyPg.number.eq(MyPg_numberIndex).addClass('select');
            //상품알람 리스트 포커스
            MyPg.SMSAlarmfocus();
            
            //MyPg.categoryfocus();

            break;
        case tvKey.KEY_UP:
            alert("MyPg_key : Up, MyPg_numberIndex : "+MyPg_numberIndex);
            if (MyPg_numberIndex > 0){
                MyPg.number.eq(MyPg_numberIndex).removeClass('focus');
            	MyPg_numberIndex--;

            	MyPg.number.eq(MyPg_numberIndex).addClass('focus');
                MyPg.SMSAlarmSetting(MyPg_numberIndex);
                this.CategorySetting(MyPg_numberIndex);  

            }

            break;
        case tvKey.KEY_DOWN:
            alert("MyPg_key : Down");
            //다음 번호로 포커스를 넘긴다.
            MyPg.number.eq(MyPg_numberIndex).removeClass('focus');
            //번호의 마지막에 도달하면, '번호 추가' 부분으로 포커스를 넘긴다.
            if (savedNumber_num < MAX_NUMBER) {
                if (MyPg_numberIndex + 1 == savedNumber_num) {
                    MyPg_index = 1;
                    MyPg.register.eq(MyPg_registerIndex).addClass('focus');
       
                    MyPg.anchor.register.focus();
                }
                else {
                    MyPg_numberIndex++;
                	                              
                    MyPg.number.eq(MyPg_numberIndex).addClass('focus');
                    MyPg.SMSAlarmSetting(MyPg_numberIndex);
                    this.CategorySetting(MyPg_numberIndex);  
                }
            }
            else {
                MyPg_index = 2;//'선택 완료' 부분으로 포커스를 넘긴다.
                MyPg.anchor.submit.focus();
                MyPg.submit.eq(MyPg_submitIndex).addClass('focus');
                MyPg.number.eq(MyPg_numberIndex).removeClass('focus');
            }
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("MyPg_key : Enter");
            //번호 위에서 확인 버튼을 누르면,  '선택 완료' 부분으로 포커스를 넘긴다.
            _numberPost = MyPg.number.eq(MyPg_numberIndex).text();
            alert("_numberPost : "+ _numberPost);
            MyPg_index = 2;//'선택 완료' 부분으로 포커스를 넘긴다.
            MyPg.anchor.submit.focus();
            MyPg.submit.eq(MyPg_submitIndex).addClass('focus');
            MyPg.submit.eq(MyPg_submitIndex).removeClass('focus_');

            MyPg.number.eq(MyPg_numberIndex).removeClass('focus');
            MyPg.number.eq(MyPg_numberIndex).addClass('select');
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
            Main.focus();//사이드바로 다시 포커스를 넘긴다.
            break;
        case tvKey.KEY_RIGHT:
            alert("MyPg_key : Right");
            //번호 리스트 포커스효과 삭제
            MyPg.number.eq(MyPg_numberIndex).removeClass('focus');
            MyPg.number.eq(MyPg_numberIndex).addClass('select');
            MyPg.register.eq(MyPg_registerIndex).removeClass('focus');
            jQuery('#MyPg_SelectNumber_list_new').empty();
            var tempString = '';
            tempString += '<div>번호추가</div>';
            jQuery('#MyPg_SelectNumber_list_new').append(tempString);

            jQuery.extend(MyPg, {
                number: jQuery('#MyPg_SelectNumber_list_already>div'),
                register: jQuery('#MyPg_SelectNumber_list_new>div'),
            });

            MyPg_registerIndex = 0;//'번호 추가'버튼이 떠있도록

            //상품알람 리스트 포커스
            MyPg.SMSAlarmfocus();


            break;
        case tvKey.KEY_UP:
            alert("MyPg_key : Up");
            MyPg.register.eq(MyPg_registerIndex).removeClass('focus');
            MyPg.number.eq(MyPg_numberIndex).addClass('focus');
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
            MyPg_registerIndex = 0;//'번호 추가'버튼이 떠있도록
            MyPg.anchor.select.focus(); //번호 선택부분으로 포커스를 넘긴다.
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
                tempString += '<div>(전화 번호를 입력해주세요)</div>';
                //인증번호 입력창
                tempString += '<div>(인증 번호를 입력해주세)</div>';

//                MyPg.register.eq(MyPg_registerIndex).removeClass('focus');
                jQuery('#MyPg_SelectNumber_list_new>div:nth-child(1)').hide();//'번호 추가'를 숨긴다.
                jQuery('#MyPg_SelectNumber_list_new').append(tempString);
                jQuery.extend(MyPg, {//div가 새로 추가된 시점에서 다시 'register'를 등록한다.
                    register: jQuery('#MyPg_SelectNumber_list_new>div'),
                });
                //'새로운 번호'부분으로 포커스를 넘긴다.
                alert("MyPg_registerIndex : "+MyPg_registerIndex );
                MyPg_registerIndex++;
                MyPg.register.eq(MyPg_registerIndex).addClass('focus');
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
                    _numberPost = MyPg.register.eq(MyPg_registerIndex).text();
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
                    else {
                        savedNumber_temp += ',' + phoneNumber_input;
                    }
                    writeFile(savedNumber_temp);


                    savedNumber = savedNumber_temp.split(',');
                    savedNumber_num = savedNumber.length;

                    jQuery('#MyPg_SelectNumber_list_already').empty();
                    //파일 시스템에서 TV에 저장되어 있는 번호들을 불러온다.
                    for (var i = 0; i < savedNumber_num; i++) {
                        var tempString = '';
                        tempString += '<div class="MyPgItem MyPg_list_Item">';
                        //tempString += '<div class="number_left">' + (i + 1) + '</div>';
                        tempString += savedNumber[i];
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
                    MyPg.SMSAlarmSetting(MyPg_numberIndex);
                    MyPg.anchor.select.focus();

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
            if (MyPg_registerIndex == 1 || MyPg_registerIndex == 2) {
                if (inputNum > 0) {//숫자가 하나라도 있을때
                    var tempNum = MyPg.register.eq(MyPg_registerIndex).text();
                    var tempNum = tempNum.substring(0, --inputNum);
                    MyPg.register.eq(MyPg_registerIndex).empty();
                    MyPg.register.eq(MyPg_registerIndex).append(tempNum);
                }
                else { //번호추가에 포커스가 있을떄 사이드바메뉴로 이
                    MyPg.register.eq(MyPg_registerIndex).removeClass('focus');
                    jQuery('#MyPg_SelectNumber_list_new').empty();
                    var tempString = '';
                    tempString += '<div>번호추가</div>';
                    jQuery('#MyPg_SelectNumber_list_new').append(tempString);

                    jQuery.extend(MyPg, {
                        number: jQuery('#MyPg_SelectNumber_list_already>div'),
                        register: jQuery('#MyPg_SelectNumber_list_new>div'),
                    });

                    MyPg_registerIndex = 0;//'번호 추가'버튼이 떠있도록

                    Main.focus();
                }

            }
            else { //번호추가에 포커스가 있을떄 사이드바메뉴로 이
                MyPg.register.eq(MyPg_registerIndex).removeClass('focus');
                Main.focus();
            }
            alert("MyPg_key : Left");
            break;
        default:
            alert("Unhandled key");
            break;
    }
};

//'번호삭제'부분을 처리하는 곳
MyPg.submitKeyDown = function () {
    alert("MyPg keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + MyPg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
        case tvKey.KEY_LEFT:
             //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("MyPg_key : RETURN");
            Main.focus();//사이드바로 다시 포커스를 넘긴다.            
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
 
            MyPg.submit.eq(MyPg_submitIndex).removeClass('focus');

            //선택된 번호를 삭제 요청한다.
            if (MyPg_submitIndex == 0) {
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
                        popupMessage( _numberPost+" 이 <br> 삭제되었습니다.");
                        alert("사용자 삭제 성공");
                        //클라에서도 번호를 지우고 
                        
                
                    }
                });
                jQuery('#MyPg_SelectNumber_list_already').empty();

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
                alert("새로 불러온 번호의 개수:" + savedNumber_num + " " +savedNumber_temp);
                //파일 시스템에서 TV에 저장되어 있는 번호들을 불러온다.
                for (var i = 0; i < savedNumber_num; i++) {
                    var tempString = '';
                        tempString += '<div class="MyPgItem MyPg_list_Item">';
                        //tempString += '<div class="number_left">' + (i + 1) + '</div>';
                        tempString += savedNumber[i];
                        tempString += '</div>';

                    jQuery('#MyPg_SelectNumber_list_already').append(tempString);
                }

                jQuery('#MyPg_SelectNumber_list_new').empty();
                var tempString = '';
                tempString += '<div>번호추가</div>';
                jQuery('#MyPg_SelectNumber_list_new').append(tempString);

                jQuery.extend(MyPg, {
                    number: jQuery('#MyPg_SelectNumber_list_already>div'),
                    register: jQuery('#MyPg_SelectNumber_list_new>div'),
                });

                //새로운 번호에 포커스를 맞추고 시작한다.
                MyPg_index = 0;//'번호 선택'부분을 선택
                MyPg_registerIndex = 0;//'번호 추가'버튼이 떠있도록
                MyPg_numberIndex = 0;//다시 첫번째 번호로 포커스를 넘긴다.
                inputNum = 0;
                certificationNum = 0;

                if (savedNumber_num == 0) {//번호 삭제후 아무 번호도 남지 않았을 때,
                    //번호 추가 부분으로 포커스를 넘긴다.
                    MyPg.anchor.register.focus();
                    MyPg.register.eq(MyPg_registerIndex).addClass('focus');
                }
                else {//삭제후에도 번호가 남아 있을 때,
                    MyPg.number.eq(MyPg_numberIndex).addClass('focus');
                    MyPg.anchor.select.focus();
                }
            }
            
            break;
        default:
            alert("Unhandled key");
            break;
    }

};

////////////////////////////////////////////////////////
//////            Category List Part             ///////
////////////////////////////////////////////////////////
//처음에 키를 받는 부분, 번호를 선택하는 부분
MyPg.categoryKeyDown = function () {
    alert("MyPg category keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + MyPg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
        case tvKey.KEY_LEFT:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            MyPg.category_.content.eq(MyPg.category_.index).removeClass('focus');
            MyPg.category_.content.eq(MyPg.category_.index).removeClass('select');
            MyPg.SMSAlarmfocus();
            alert("MyPg_key : RETURN or LEFT");
            break;
        case tvKey.KEY_RIGHT:
            alert("MyPg_key : Right");

            break;
        case tvKey.KEY_UP:
            alert("MyPg_key : Up");
            if (MyPg.category_.index > 0){
                MyPg.category_.content.eq(MyPg.category_.index).removeClass('focus');
                MyPg.category_.index--;
            	MyPg.category_.content.eq(MyPg.category_.index).addClass('focus');
            }
            break;
        case tvKey.KEY_DOWN:
            alert("MyPg_key : Down");
            if (MyPg.category_.index < MyPg.category_.arr.length-1) {
                MyPg.category_.content.eq(MyPg.category_.index).removeClass('focus');
                MyPg.category_.index++;
                MyPg.category_.content.eq(MyPg.category_.index).addClass('focus');
            }
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            alert("MyPg_key : Enter");
            if(!MyPg.category.submit.hasClass('focus')){
            	MyPg.category_.content.eq(MyPg.category_.index).removeClass('focus');
                MyPg.category_.content.eq(MyPg.category_.index).addClass('select');            	
                MyPg.category.submit.addClass('focus');
                MyPg.category.submit.removeClass('focus_');                
            }
            else{
            	alert(MyPg.category_.arr[MyPg.category_.index]);
            	MyPg.DeleteCategory(MyPg_numberIndex, MyPg.category_.arr[MyPg.category_.index]);            	
            	MyPg.category.submit.removeClass('focus');
            	setTimeout(function(){
            		MyPg.categoryfocus();
            	}, 500);
            }
            break;
        default:
            alert("Unhandled key");
            break;
    }
};

MyPg.DeleteCategory = function(idx, secondid){
	alert(idx);
	alert(secondid);
    jQuery.ajax({
        url: SERVER_ADDRESS + '/cAlarms',
        type : 'DELETE',
        data: { phoneNumber: savedNumber[idx], secondId: secondid},    
        dataType : 'text',
        success : function (data) {
        	alert("카테고리 삭제 성공 ");
            popupMessage("카테고리 알람이 <br> 삭제되었습니다.");
            MyPg.CategorySetting(idx);
        }
    });	        
};

MyPg.CategorySetting = function(idx){
        jQuery("#MyPg_CategoryAlarm_header").html('* '+savedNumber[MyPg_numberIndex]+' 님의 카테고 알람');        

    jQuery.ajax({
        url: SERVER_ADDRESS + '/cAlarms',
        type : 'GET',
        data: { phoneNumber: savedNumber[idx] },    
        dataType : 'json',
        success : function (data) {
        	var tempstring = "";
        	var temparr= [];
        	$.each(data, function() {
        		tempstring += '<div class="MyPgItem MyPg_list_Item">' + firstCategory[this.firstId] + "  >  " + this.secondName + "</div>";
                temparr.push(this.secondId);
        	});
        	MyPg.category.elem.html(tempstring);
        	alert('asda'+tempstring);
        	setTimeout(function(){
         	    jQuery.extend(MyPg, {
        	        category_: {
        	        	content: jQuery('#MyPg_CategoryAlarm_list>div'),
        	        	arr: temparr,
        	        	index:0
        	        }
        	    });
			},10);	
        } 
    });	 
};

////////////////////////////////////////////////////////
//////            SMS Alam List Part             ///////
////////////////////////////////////////////////////////

MyPg.SMSAlarmSetting = function(index){
        jQuery("#MyPg_SMSAlarm_header").html('* '+savedNumber[MyPg_numberIndex]+' 님의 방송 알람');

    alert("MyPg_SMSAlarmSetting");
    jQuery.ajax({
        url: SERVER_ADDRESS + '/sAlarms',
        type : 'GET',
        data : {
            phoneNumber : savedNumber[index]
        },
        dataType : 'json',
        success : function (data) {
            var tempString = '';
            var temparr= [];
            $.each(data, function() { 
                tempString += '<li class="SMSAlarm_list MyPgItem">                                          ';
                tempString += '     <div class="MyPg_imgArea">                                              ';
                tempString += '         <img src="' +this.productImgURL+ '" alt="" class="MyPg_productImg"> ';
                tempString += '     </div>                                                                  ';
                tempString += '     <div class="MyPg_productInfoArea">                                      ';
                tempString += '         <div class="MyPg_name">                                             ';
                tempString += '             <p>' +this.productName+ '</p>                                   ';
                tempString += '         </div>                                                              ';
                tempString += '         <div class="MyPg_price">                                            ';
                tempString += '             <p>최대 혜택가 :</p>                                               ';
                tempString += '             <p class="MyPg_productPrice">' + this.productPrice + '</p>      ';
                tempString += '         </div>                                                              ';
                tempString += '     </div>                                                                  ';
                tempString += ' </li>                                                                       ';
                temparr.push(this.id);
            });    
            jQuery('#MyPg_SMSAlarm_list').find('ul').html(tempString);                          
            
            setTimeout(function(){  
                jQuery.extend(MyPg, {
                    SMSAlarm : {
                        elem      : jQuery('.SMSAlarm_list'), //jQuery('#MyPg_SMSAlarm_list').find('ul >li'),
                        submit    : jQuery('#MyPg_SMSAlarm_submit'),
                        productId : temparr,
                        anchor    : jQuery('#anchor_MyPg_SMSAlarm')
                    }
                }); 
            },10);   
        }   
    });
};

MyPg.SMSAlarmKeyDown = function () {
    alert("MyPg SMSAlarm keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + MyPg_index);

    switch (keyCode) {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
        case tvKey.KEY_LEFT:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            MyPg.SMSAlarm.elem.eq(SMSAlarm_index).removeClass('focus');
            MyPg.SMSAlarm.elem.eq(SMSAlarm_index).removeClass('select');            
            MyPg.focus();
            alert("MyPg_key : RETURN or LEFT");
            break;
        case tvKey.KEY_RIGHT:
            alert("MyPg_key : Right");
            MyPg.SMSAlarm.elem.eq(SMSAlarm_index).removeClass('focus');
            MyPg.SMSAlarm.elem.eq(SMSAlarm_index).removeClass('select');                        
            //MyPg.SMSAlarm.elem.eq(SMSAlarm_index).addClass('select');
            MyPg.categoryfocus();
            break;
        case tvKey.KEY_UP:
            alert("MyPg_key : Up");
            if (SMSAlarm_index > 0){
                MyPg.SMSAlarm.elem.eq(SMSAlarm_index).removeClass('focus');
                MyPg.SMSAlarm.elem.eq(--SMSAlarm_index).addClass('focus');
            }
            break;
        case tvKey.KEY_DOWN:
            alert("MyPg_key : Down");
            if (SMSAlarm_index < MyPg.SMSAlarm.elem.length-1) {
                MyPg.SMSAlarm.elem.eq(SMSAlarm_index).removeClass('focus');
                MyPg.SMSAlarm.elem.eq(++SMSAlarm_index).addClass('focus');
            }
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            alert("MyPg_key : Enter");
            if(!MyPg.SMSAlarm.submit.hasClass('focus')){
                MyPg.SMSAlarm.elem.eq(SMSAlarm_index).removeClass('focus');
                MyPg.SMSAlarm.elem.eq(SMSAlarm_index).addClass('select');
                MyPg.SMSAlarm.submit.removeClass('focus_');                
                MyPg.SMSAlarm.submit.addClass('focus');
            }
            else{
                //alert(MyPg.category_.arr[MyPg.category_.index]);
                MyPg.DeleteSMSAlarm(MyPg_numberIndex, MyPg.SMSAlarm.productId[SMSAlarm_index]);                
                MyPg.SMSAlarm.submit.removeClass('focus');
                setTimeout(function(){
                    MyPg.SMSAlarmfocus();
                }, 500);
            }
            break;
        default:
            alert("Unhandled key");
            break;
    }
};
MyPg.DeleteSMSAlarm = function(index, productId){
    alert("DeleteSMSAlam");
    alert("productId : "+ productId);
    jQuery.ajax({
        url: SERVER_ADDRESS + '/sAlarms',
        type : 'DELETE',
        data: { phoneNumber: savedNumber[index], productId: productId},    
        dataType : 'text',
        success : function (data) {
            alert("상품 알림 삭제 성공 ");
            popupMessage("방송상품 알람이 <br> 삭제되었습니다.");
            MyPg.SMSAlarmSetting(index);
        }
    });         
};