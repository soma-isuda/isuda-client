

var SMSSharingSpg= {
    messageIndex: 0,//현재 포커스 되어 있는 메세지의 인덱스
    inputNum:0,//번호 입력창에 입력된 숫자의 개수
    setMessageIndex:function(data){
        this.messageIndex=data;
    },
    getMessageIndex: function () {
        return this.messageIndex;
    },
};

SMSSharingSpg.onLoad = function()
{
	alert("SMSSharingSpg onLoad");
	//document.getElementById("SMSSharingSpg").style.marginLeft="1460px";
	jQuery.extend(SMSSharingSpg,{
		anchor: {
		    main: jQuery('#anchor_SMSSharingSpg'),
		    body: jQuery('#anchor_SMSSharingSpg_body'),
		    input: jQuery('#anchor_SMSSharingSpg_input'),
		    submit: jQuery('#anchor_SMSSharingSpg_submit')
		}
	});
	this.focus();

    //첫번째 메세지에 포커스를 맞추고 시작한다.
	jQuery.extend(SMSSharingSpg, {
	    body: jQuery('#SMSSharingSpg_body>div'),
	    input: jQuery('#SMSSharingSpg_input>div'),
	    submit: jQuery('#SMSSharingSpg_submit>div')
	});
	SMSSharingSpg.body.eq(this.messageIndex).addClass('focus');//첫번째 메세지에 포커스를 맞추고 시작한다.
};

var SMSSharingSpg_index =0;

SMSSharingSpg.focus = function(){ 
	alert("SMSSharingSpg.focus");
	SMSSharingSpg.anchor.body.focus();
	// focus initialize
	this.messageIndex = 0;//현재 포커스 되어 있는 메세지의 인덱스
	this.inputNum = 0;//번호 입력창에 입력된 숫자의 개수
	MAX_INPUT = 11;//번호 입력창에 입력될 수 있는 최대 개수
};

SMSSharingSpg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};
SMSSharingSpg.bodyKeyDown = function () {
    alert("SMSSharingSpg body keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + SMSSharingSpg_index);

    switch (keyCode) {
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", SMSSharingSpg.anchor.body);
            break;
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("SMSSharingSpg_key : RETURN");
        case tvKey.KEY_LEFT:
            alert("SMSSharingSpg_key : Left");
            jQuery('#SMSSharingSpg').hide();//페이지를 닫는다.			
            SelectWatchPg.focus();//선택보기로 다시 포커스를 넘긴다.
            break;
        case tvKey.KEY_RIGHT:
            alert("SMSSharingSpg_key : Right");
            break;
        case tvKey.KEY_UP:
            alert("SMSSharingSpg_key : Up");
            SMSSharingSpg.body.eq(this.messageIndex).removeClass('focus');
            if (this.messageIndex > 0)
                this.messageIndex--;

            else if (this.messageIndex == 0)
                this.messageIndex = 7 - this.messageIndex;//메세지의 마지막으로 이동

            SMSSharingSpg.body.eq(this.messageIndex).addClass('focus');
            break;
        case tvKey.KEY_DOWN:
            alert("SMSSharingSpg_key : Down");
            SMSSharingSpg.body.eq(this.messageIndex).removeClass('focus');

            if (this.messageIndex < 7)
                this.messageIndex++;

            else if (this.messageIndex == 7) //마지막 메세지에 있을 때
                this.messageIndex = 0;//메세지의 처음으로 넘긴다.
            
            SMSSharingSpg.body.eq(this.messageIndex).addClass('focus');
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("SMSSharingSpg_key : Enter");
            SMSSharingSpg.body.eq(this.messageIndex).removeClass('focus');
            SMSSharingSpg.body.eq(this.messageIndex).addClass('selected');
            SMSSharingSpg.anchor.input.focus();//번호 입력 부분에 포커스를 넘긴다.
            SMSSharingSpg.input.eq(1).addClass('focus');
            break;
        default:
            alert("Unhandled key");
            break;
    }
};

//상대방의 번호를 입력하는 곳
SMSSharingSpg.inputKeyDown = function () {
    alert("SMSSharingSpg input keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + SMSSharingSpg_index);

    switch (keyCode) {
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", SMSSharingSpg.anchor.input);
            break;
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("SMSSharingSpg_key : RETURN");
        case tvKey.KEY_LEFT:
            alert("SMSSharingSpg_key : Left");
            if (this.inputNum > 0) {//숫자가 하나라도 있을때, 왼쪽 버튼은 지우는 역할을 한다.
                var tempNum = SMSSharingSpg.input.eq(1).text();
                tempNum = tempNum.substring(0, --this.inputNum);
                SMSSharingSpg.input.eq(1).empty();
                SMSSharingSpg.input.eq(1).append(tempNum);
            }
            else{
                SMSSharingSpg.input.eq(1).removeClass('focus');
                SMSSharingSpg.anchor.body.focus();
                SMSSharingSpg.body.eq(this.messageIndex).removeClass('selected');
                SMSSharingSpg.body.eq(this.messageIndex).addClass('focus');
            }
            break;
        case tvKey.KEY_RIGHT:
            alert("SMSSharingSpg_key : Right");
            break;
        case tvKey.KEY_UP:
            SMSSharingSpg.input.eq(1).removeClass('focus');
            SMSSharingSpg.anchor.body.focus();
            SMSSharingSpg.body.eq(this.messageIndex).removeClass('selected');
            SMSSharingSpg.body.eq(this.messageIndex).addClass('focus');
            alert("SMSSharingSpg_key : Up");
            break;
        case tvKey.KEY_DOWN:
            alert("SMSSharingSpg_key : Down");
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //'공유하기'버튼으로 포커스를 이동한다.
            alert("SMSSharingSpg_key : Enter");
            if (this.inputNum == MAX_INPUT) {//전화번호 11자리가 다 눌렸을 때
                SMSSharingSpg.input.eq(1).removeClass('focus');
                SMSSharingSpg.submit.addClass('focus');
                SMSSharingSpg.anchor.submit.focus();
            }
            else{
                SMSSharingSpg.input.eq(1).empty();
                SMSSharingSpg.input.eq(1).append("다시 입력하세요");
                this.inputNum=0;
            }
            
            break;
        case tvKey.KEY_0:
            if (this.inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SMSSharingSpg.input.eq(1).empty();

            if (this.inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
               SMSSharingSpg.input.eq(1).append("0");
               this.inputNum++;
            }

            break;
        case tvKey.KEY_1:
            if (this.inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SMSSharingSpg.input.eq(1).empty();

            if (this.inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SMSSharingSpg.input.eq(1).append("1");
                this.inputNum++;
            }

            break;
        case tvKey.KEY_2:
            if (this.inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SMSSharingSpg.input.eq(1).empty();

            if (this.inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SMSSharingSpg.input.eq(1).append("2");
                this.inputNum++;
            }

            break;
        case tvKey.KEY_3:
            if (this.inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SMSSharingSpg.input.eq(1).empty();

            if (this.inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SMSSharingSpg.input.eq(1).append("3");
                this.inputNum++;
            }

            break;
        case tvKey.KEY_4:
            if (this.inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SMSSharingSpg.input.eq(1).empty();

            if (this.inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SMSSharingSpg.input.eq(1).append("4");
                this.inputNum++;
            }

            break;
        case tvKey.KEY_5:
            if (this.inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SMSSharingSpg.input.eq(1).empty();

            if (this.inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SMSSharingSpg.input.eq(1).append("5");
                this.inputNum++;
            }

            break;
        case tvKey.KEY_6:
            if (this.inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SMSSharingSpg.input.eq(1).empty();

            if (this.inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SMSSharingSpg.input.eq(1).append("6");
                this.inputNum++;
            }

            break;
        case tvKey.KEY_7:
            if (this.inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SMSSharingSpg.input.eq(1).empty();

            if (this.inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SMSSharingSpg.input.eq(1).append("7");
                this.inputNum++;
            }

            break;
        case tvKey.KEY_8:
            if (this.inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SMSSharingSpg.input.eq(1).empty();

            if (this.inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SMSSharingSpg.input.eq(1).append("8");
                this.inputNum++;
            }

            break;
        case tvKey.KEY_9:
            if (this.inputNum == 0) //아직 아무런 숫자도 입력되지 않았을 때
                SMSSharingSpg.input.eq(1).empty();

            if (this.inputNum < MAX_INPUT) {//최대 11자리 까지 입력 가능
                SMSSharingSpg.input.eq(1).append("9");
                this.inputNum++;
            }

            break;
        default:
            alert("Unhandled key");
            break;
    }
};
SMSSharingSpg.submitKeyDown = function () {
    alert("SMSSharingSpg submit keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + SMSSharingSpg_index);

    switch (keyCode) {
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", SMSSharingSpg.anchor.submit);
            break;
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("SMSSharingSpg_key : RETURN");
        case tvKey.KEY_UP:
            SMSSharingSpg.input.eq(1).addClass('focus');
            SMSSharingSpg.submit.removeClass('focus');
            SMSSharingSpg.anchor.input.focus();            
            alert("SMSSharingSpg_key : Up");
            break;

        case tvKey.KEY_LEFT:
            alert("SMSSharingSpg_key : Left");
            jQuery('#SMSSharingSpg').hide();//페이지를 닫는다.			
            SelectWatchPg.focus();//선택보기로 다시 포커스를 넘긴다.
            break;
        case tvKey.KEY_RIGHT:
            alert("SMSSharingSpg_key : Right");
            break;
        case tvKey.KEY_DOWN:
            alert("SMSSharingSpg_key : Down");
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("SMSSharingSpg_key : Enter");
            var _URLPost;
            var _numberPost = SMSSharingSpg.input.eq(1).text();
            var _messagePost;
            if (this.messageIndex == 7) {//메세지 없음을 선택했을 때
                _messagePost = '';
            }
            else {
                _messagePost = SMSSharingSpg.body.eq(this.messageIndex).text();
            }
            //지인에게 문자 발송
            $.ajax({
                url: SERVER_ADDRESS + '/now',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var tempIndex = 0;
                    var currentChannel = Player.getChannel();
                    $.each(data, function (key, value) {
                        alert(value.providerId);
                        if (tempIndex == currentChannel) {
                            _URLPost = value.productPgURL;
                        }
                        tempIndex++;
                    });
                    setTimeout(function () {
                        $.ajax({
                            type: "POST", // POST형식으로 폼 전송
                            url: PHP_SERVER_ADDRESS + "/SMSShare.php", // 목적지
                            timeout: 10000,
                            data: {
                                friendPhoneNumber: _numberPost,
                                message: _messagePost,
                                url: _URLPost
                            },
                            cache: false,
                            dataType: "text",
                            error: function (xhr, textStatus, errorThrown) { // 전송 실패
                                alert("전송에 실패했습니다.");
                            },
                            success: function (data) {
                                alert(data);
                                alert("지인에게 문자 발송 성공");
                            }
                        });
                    }, 10);
                }
            });
            jQuery('#SMSSharingSpg').hide();//페이지를 닫는다.			
            SelectWatchPg.focus();//선택보기로 다시 포커스를 넘긴다.         
            break;
        default:
            alert("Unhandled key");
            break;
    }
};
SMSSharingSpg.keyDown = function()
{
	alert("SMSSharingSpg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + SMSSharingSpg_index);
	
	switch(keyCode)
	{
	    case tvKey.KEY_EXIT:
	        widgetAPI.blockNavigation(event);
	        popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", SMSSharingSpg);
	        break;
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			//앱이 종료되는것을 방지해준다.
			widgetAPI.blockNavigation(event);
			alert("SMSSharingSpg_key : RETURN");
		case tvKey.KEY_LEFT:
			alert("SMSSharingSpg_key : Left");
			jQuery('#SMSSharingSpg').hide();//페이지를 닫는다.			
			SelectWatchPg.focus();//선택보기로 다시 포커스를 넘긴다.
			break;
		case tvKey.KEY_RIGHT:
			alert("SMSSharingSpg_key : Right");
			break;
		case tvKey.KEY_UP:
			alert("SMSSharingSpg_key : Up");
			break;
		case tvKey.KEY_DOWN:
			alert("SMSSharingSpg_key : Down");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
			alert("SMSSharingSpg_key : Enter");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};