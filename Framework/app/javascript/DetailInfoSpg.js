var DetailInfoSpg_index = 0;
//0이면 '해당 카테고리 예약'에 포커스 된 상태
//1이면 상품 상세 정보 이미지에 포커스된 상태
//--------------------------------------------------
var detailImageHeight;
//불러오는 이미지의 높이를 구할 때 사용
//--------------------------------------------------
var detailImageScrollNumber;
//이미지 스크롤을 몇번 했는지
//--------------------------------------------------
var DetailInfoSpg = {
	
};

DetailInfoSpg.onLoad = function()
{
    alert("DetailInfoSpg onLoad");
    //document.getElementById("DetailInfoSpg").style.marginLeft="1460px";
    jQuery.extend(DetailInfoSpg, {
        anchor: {
            main: jQuery('#anchor_DetailInfoSpg'),
            image: jQuery('#anchor_DetailInfoSpg_Image')
        }
    });
    this.focus();

    //현재 방송중인 상품이면 '방송 시청',
    //그렇지 않으면 'SMS 알람 받기'를 출력한다.
    jQuery('#reserveButton').append('<div>SMS 알람 받기</div>');


    //상품 상세 정보 이미지를 로드한다.
    alert(productLoadedId[productListIndex]);
    //var detailImgPath = SERVER_ADDRESS + '/pageShots/' + productLoadedId[productListIndex] + '.jpeg';
    var detailImgPath = SERVER_ADDRESS + '/pageShots/GS201410030100.jpeg';

    jQuery('#detailImage').append('<img src="' + detailImgPath + '"  alt="이미지가 없습니다"  id="detailImg"/>');
    
    jQuery.extend(DetailInfoSpg, {
        reserve: jQuery('#reserveButton').find('div'),
        image: jQuery('#detailImage')
    });

    //'SMS 알람 받기' 버튼에 포커스를 맞추고 시작한다.
    DetailInfoSpg.reserve.addClass('focus');
};



DetailInfoSpg.focus = function(){ 
	alert("DetailInfoSpg.focus");
	DetailInfoSpg.anchor.main.focus();
	// focus initialize
	DetailInfoSpg_index =0;
	detailImageScrollNumber=0;
};

DetailInfoSpg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

DetailInfoSpg.keyDown = function()
{
	alert("DetailInfoSpg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + DetailInfoSpg_index);
	
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			//앱이 종료되는것을 방지해준다.
			alert("DetailInfoSpg_key : RETURN");
			widgetAPI.blockNavigation(event);

			TVSchedulePg.anchor.list.focus();//편성표로 다시 포커스를 넘긴다.
			jQuery('#DetailInfoSpg').hide();//상세보기 페이지를 닫는다.

		case tvKey.KEY_LEFT:
			alert("DetailInfoSpg_key : Left");
			//document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1920px";
		    //SelectWatchPg.onLoad();

            //TVSchedulePg로 다시 포커스를 넘긴다.
			TVSchedulePg.anchor.list.focus();
			jQuery('#DetailInfoSpg').hide();//상세보기 페이지를 닫는다.

			break;
		case tvKey.KEY_RIGHT:
		    alert("DetailInfoSpg_key : Right");
		    
		    DetailInfoSpg.reserve.addClass('focus');
			break;
		case tvKey.KEY_UP:
		    alert("DetailInfoSpg_key : Up");
		    if (DetailInfoSpg_index == 1) {//상품 이미지에 포커스가 있었을 때
		        if (detailImageScrollNumber == 0) {//이미지의 상단에 도달하면
		            DetailInfoSpg.image.removeClass('focus');
		            DetailInfoSpg.reserve.addClass('focus');
		            DetailInfoSpg_index = 0;
		        }
		        detailImageScrollNumber--;
		        var pxMove = '-' + 200 * detailImageScrollNumber + 'px';
		        DetailInfoSpg.image.find('img').css("margin-top", pxMove);
		    }
			break;
		case tvKey.KEY_DOWN:
		    alert("DetailInfoSpg_key : Down");
		    if (DetailInfoSpg_index == 0){//버튼 부분에 포커스가 있었을 때
		        DetailInfoSpg.image.addClass('focus');
		        DetailInfoSpg.reserve.removeClass('focus');
		        DetailInfoSpg_index = 1;
                //사진 높이를 구한다. -- 스크롤에 이용됨
		        //detailImageHeight = jQuery('#detailImage').find('img').height();
		        detailImageHeight = document.getElementById('detailImg').height;
		        alert(detailImageHeight);
		    }
		    else if (DetailInfoSpg_index == 1) {//상품 이미지에 포커스가 있을 때
		        //스크롤 구현하는 부분
		        if (200 * (detailImageScrollNumber + 1) < detailImageHeight) {

		            detailImageScrollNumber++;
		            //한번에 200px씩 스크롤 된다고 가정
		            var pxMove = '-' + 200 * detailImageScrollNumber + 'px';
		            DetailInfoSpg.image.find('img').css("margin-top", pxMove);
                }
		    }
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
		    alert("DetailInfoSpg_key : Enter");
		    if (DetailInfoSpg_index == 0) {//버튼 부분에 포커스가 있을 때
                //번호 선택 부분으로 포커스를 넘긴다.
		        Main.layout.subPage.load(subPageArr[4].html);
		        setTimeout(function () {
		            subPageArr[4].object.onLoad();//onLoad함수 안에 포커스를 넘겨주는 부분이 있음
		        }, 10);

		    }
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
