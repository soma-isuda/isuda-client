
var InteractiveSpg = {
   
};

InteractiveSpg.onLoad = function () {
    alert("InteractiveSpg onLoad");
    //document.getElementById("InteractiveSpg").style.marginLeft="1460px";
    
    //사이드메뉴와 채널 헬퍼 hide
    SelectWatchPg.hideMenu();
    SelectWatchPg.hideChannel();

    var i = SelectWatchPg.currentISUDAchannel;
    var j = indexInISUDAchannel;
    
    
    var tempString = '';
    tempString += '<div class="recommended_product">';
    tempString += ' <div class="recommended_imgArea">';
    tempString += '     <img src="' + ISUDAelementArr[i][j].img + '" alt="" class="recommended_productImg">';
    tempString += '     <div></div>';
    tempString += ' </div>';
    tempString += ' <div class="recommended_productInfoArea">';
    tempString += '     <div class="recommended_productName">' + ISUDAelementArr[i][j].name + '</div>';
    tempString += '     <div class="recommended_productPrice"><p>'+ISUDAelementArr[i][j].benefit+'</p>' + ISUDAelementArr[i][j].price + '</div>';
    tempString += ' </div>';
    tempString += '</div>';

    jQuery.extend(InteractiveSpg,{
        header: jQuery('#InteractiveSpg_header'),
        body: jQuery('#InteractiveSpg_body'),
        footer: jQuery('#InteractiveSpg_footer'),
        anchor: {
            main: jQuery('#anchor_InteractiveSpg')
        }
    });
    this.focus();
    InteractiveSpg.body.append(tempString);
    InteractiveSpg.footer.append('<div>'+ISUDAelementArr[i][j].footer+'<div>');
    InteractiveSpg.footer.find('div').addClass('focus');
};

InteractiveSpg.focus = function () {
    alert("InteractiveSpg.focus");
    InteractiveSpg.anchor.main.focus();
    // focus initialize
    InteractiveSpg_index = 0;

};

InteractiveSpg.enableKeys = function () {
    document.getElementById("anchor").focus();
};

InteractiveSpg.keyDown = function () {
    alert("InteractiveSpg keyDown");
    var keyCode = event.keyCode;
    alert("Key pressed: " + keyCode + " ,index:" + InteractiveSpg_index);

    switch (keyCode) {
        case tvKey.KEY_EXIT:
            widgetAPI.blockNavigation(event);
            popupMessageButton("스마트 홈쇼핑을<br>종료 하시겠습니까?", InteractiveSpg);
            break;
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            //앱이 종료되는것을 방지해준다.
            widgetAPI.blockNavigation(event);
            alert("InteractiveSpg_key : RETURN");
        case tvKey.KEY_LEFT:
            alert("InteractiveSpg_key : Left");
            jQuery('#InteractiveSpg').hide();//페이지를 닫는다.	
            InteractiveSpg.body.empty();
            SelectWatchPg.focus('hide');

            break;
        case tvKey.KEY_RIGHT:
            alert("InteractiveSpg_key : Right");
            break;
        case tvKey.KEY_UP:
            alert("InteractiveSpg_key : Up");
            break;
        case tvKey.KEY_DOWN:
            alert("InteractiveSpg_key : Down");
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            //focus move to selectWatchPg
            alert("InteractiveSpg_key : Enter");
            //상세보기 페이지를 로드한다.
            jQuery('#popup').empty();
            subPage_index = 3;
            Main.layout.subPage.load(subPageArr[subPage_index].html, function (response, status, xhr) {
                if (status == "success") {
                    subPageArr[subPage_index].object.onLoad();//onLoad함수 안에 포커스를 넘겨주는 부분이 있음
                }
            });
            break;
        default:
            alert("Unhandled key");
            break;
    }
};