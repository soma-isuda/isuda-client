//global variables
var TVSchedulePg_index = 0;
var big_index = 0;
var mid_index;

var TVSchedulePg = {
    
    
};

TVSchedulePg.onLoad = function () {
    alert("TVSchedulePg onLoad");
    //document.getElementById("TVSchedulePg").style.marginLeft="1460px";
    jQuery.extend(TVSchedulePg, {
        big: jQuery('#big').find('ul'),
        mid: jQuery('#mid').find('ul'),

        anchor: {
            big: jQuery('#anchor_TVSchedulePg_bigCategory'),
            mid: jQuery('#anchor_TVSchedulePg_midCategory'),
            main: jQuery('#anchor_TVSchedulePg')
        }
    });

    // Load first category
    for (var i = 0; i < firstCategory.length ; i++) {
        TVSchedulePg.big.append('<li>' + firstCategory[i] + '</li>');
    }
    this.focus();

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


//대분류에서의 키처리를 담당하는 부분
TVSchedulePg.bigKeyDown = function()
{
	alert("TVSchedulePg big Category keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + TVSchedulePg_index);
	
	switch(keyCode)
	{
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
	        //현재 보고 있던 대분류의 포커스는 유지한 상태로
	        //중분류 첫번째에 포커스를 준뒤,
	        //TVSchedulePg.midKeyDown으로 키처리를 넘긴다.
	        alert("TVSchedulePg_key : Right");

            //중분류로 포커스를 넘긴다.
	        TVSchedulePg.anchor.mid.focus();
	        //중분류 첫번째에 초점을 맞춘상태로 시작한다.
	        TVSchedulePg.midElem.eq(mid_index).addClass('focus');
			break;
		case tvKey.KEY_UP:
		    alert("TVSchedulePg_key : Up");

            //중분류 카테고리의 맨위에 도달했을때 위의 키를 누르면 , 맨아래로 간다.
		    TVSchedulePg.bigElem.eq(big_index).removeClass('focus');
		    if (big_index == 0)
		        big_index = firstCategory.length;
			TVSchedulePg.bigElem.eq(--big_index).addClass('focus');

            
		    TVSchedulePg.bigElem.eq(big_index).removeClass('focus');
		    //중분류 카테고리의 맨위에 도달했을때 위의 키를 누르면 , 맨아래로 간다.
		    if (big_index == 0)
		        big_index = firstCategory.length-1;
		    else
		        big_index--;

			TVSchedulePg.bigElem.eq(big_index).addClass('focus');

			tabMenu();
			
			break;
		case tvKey.KEY_DOWN:
		    alert("TVSchedulePg_key : Down");

            //중분류 카테고리의 맨 아래에 도달했을때 아래 키를 누르면, 맨위로 간다.
            TVSchedulePg.bigElem.eq(big_index).removeClass('focus');
		    if (big_index == firstCategory.length-1) {
		        big_index = -1;
		    }
			TVSchedulePg.bigElem.eq(++big_index).addClass('focus');

            
		  
		    TVSchedulePg.bigElem.eq(big_index).removeClass('focus');
		    //중분류 카테고리의 맨 아래에 도달했을때 아래 키를 누르면, 맨위로 간다.
		    if (big_index == firstCategory.length-1)
		        big_index = 0;
		    else
		        big_index++;

			TVSchedulePg.bigElem.eq(big_index).addClass('focus');

			tabMenu();
			
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("TVSchedulePg_key : Enter");
			TVSchedulePg.big.eq(big_index).removeClass('focus');
			tabMenu();
			TVSchedulePg.anchor.mid.focus();//중분류로 anchor를 넘긴다
			TVSchedulePg.mid.eq(mid_index).find('li').focus();
			break;
		default:
			alert("Unhandled key");
			break;
	}


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
            SelectWatchPg.onLoad();
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


            TVSchedulePg.anchor.mid.focus();//중분류로 anchor를 넘긴다
            //첫번째 대분류 카테고리에 초점을 맞춘상태로 시작한다.

            alert(TVSchedulePg.midElem.eq(mid_index));
            TVSchedulePg.midElem.eq(mid_index).addClass('focus');

            break;
        default:
            alert("Unhandled key");
            break;
    }

};
    
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
            TVSchedulePg.anchor.big.focus();//중분류로 anchor를 넘긴다
            break;
        case tvKey.KEY_RIGHT:
            alert("TVSchedulePg_key : Right");
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