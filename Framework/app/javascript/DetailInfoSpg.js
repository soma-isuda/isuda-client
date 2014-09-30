

var DetailInfoSpg = {
	
};

DetailInfoSpg.onLoad = function()
{
    alert("DetailInfoSpg onLoad");
    //document.getElementById("DetailInfoSpg").style.marginLeft="1460px";
    jQuery.extend(DetailInfoSpg, {
        anchor: {
            main: jQuery('#anchor_DetailInfoSpg')
        }
    });
    this.focus();

    //현재 방송중인 상품이면 '방송 시청',
    //그렇지 않으면 '방송 예약'을 출력한다.
    //jQuery('#reserveButton').find('div').append('<p>방송 예약</p>');


    //상품 상세 정보 이미지를 로드한다.
    alert(productLoadedId[productListIndex]);
    jQuery.ajax({
        url: SERVER_ADDRESS + '/productInfo?productId="' + productLoadedId[productListIndex] + '"',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (key, value) {
                alert(value.productImgURL);
                jQuery('#detailImage').append('<img src=" ' + value.productImgURL + ' "  alt="" class="detailImg" />');
            })
        }
    });
	
    jQuery.extend(DetailInfoSpg, {
        reserve: jQuery('#reserveButton').find('div'),
        image: jQuery('#detailImage')
    });
};

var DetailInfoSpg_index =0;

DetailInfoSpg.focus = function(){ 
	alert("DetailInfoSpg.focus");
	DetailInfoSpg.anchor.main.focus();
	// focus initialize
	DetailInfoSpg_index =0;
	
   
    
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
		    /*jQuery.extend(DetailInfoSpg, {
        reserve: jQuery('#reserveButton').find('div'),
        image: jQuery('#detailImage')
    });*/
		    //TVSchedulePg.bigElem.eq(big_index).addClass('focus');
		    DetailInfoSpg.reserve.addClass('focus');
			break;
		case tvKey.KEY_UP:
			alert("DetailInfoSpg_key : Up");
			break;
		case tvKey.KEY_DOWN:
			alert("DetailInfoSpg_key : Down");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
		    alert("DetailInfoSpg_key : Enter");


			break;
		default:
			alert("Unhandled key");
			break;
	}
};