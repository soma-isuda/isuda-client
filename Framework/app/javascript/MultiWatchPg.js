var img = ["dummy","dummy","#img0","#img1","#img2","#img3","#img4","#img5"];
var cnt=0;
var MultiWatchPg= {
	
};

MultiWatchPg.onLoad = function()
{	
	cnt=0;
	jQuery.ajax({
				//url : 'http://61.43.139.145:3000/productInfo',
				url : 'http://172.16.100.171:3000/productInfo',
				type : 'GET',
				dataType : 'json',
				success : function (data) {
					$.each(data, function() {
						//console.log(this.index);
					    jQuery('#mainItem').find('ul').append('<li class="MultiWatchPgItem"> <div class="imgArea"><img src="' +this.productImgURL+ '" alt="" class="productImg"></div><div class="productInfoArea"><div class="productEndTime">방송 혜택 종료까지 </div><div class="productName"></div><div class="productPrice">최대 혜택가</div></div><div><img src="img/moviefocus.PNG" alt="" id="img'+cnt+'" class="focusImg multiWatchPgElem"></div></li>');
						if (++cnt >5) {
							return false;
						};
					});					
//					jQuery('#input').val(data);
				}
			});					
	jQuery.extend(MultiWatchPg,{
		MultiWatchPgElem : jQuery('.MultiWatchPgElem'),
		anchor:{
			main	: jQuery('#anchor_MultiWatchPg'),
		}
		//focus: 0
	});
	this.focus();	
};

var MultiWatchPg_index =0;

MultiWatchPg.focus = function(){ 
	alert("MultiWatchPg.focus");

	MultiWatchPg.anchor.main.focus();
	// focus initialize
	MultiWatchPg_index =0;
	MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');
};

MultiWatchPg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

MultiWatchPg.keyDown = function()
{
	alert("MultiWatchPg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + MultiWatchPg_index);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("MultiWatchPg_key : RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("MultiWatchPg_key : Left");
			if((MultiWatchPg_index==0)||(MultiWatchPg_index==2)||(MultiWatchPg_index==5)){ //이게 빠른지 3으로 나눈 나머지가 0인경우가 빠른지 모르겠다.
				//focus move to sideBar
				MultiWatchPg.anchor.main.removeClass('focus');
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				$(img[MultiWatchPg_index]).css("display","none");

				Main.focus();
			}
			else{
				$(img[MultiWatchPg_index]).css("display","none");
				$(img[--MultiWatchPg_index]).css("display","block");
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("MultiWatchPg_key : Right");
			if(MultiWatchPg_index<1){
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				MultiWatchPg.MultiWatchPgElem.eq(++MultiWatchPg_index).addClass('focus');
			}
			else if(MultiWatchPg_index>1){
				$(img[MultiWatchPg_index]).css("display","none");
				if(MultiWatchPg_index == 7){
					MultiWatchPg_index = 1;
				}
				$(img[++MultiWatchPg_index]).css("display","block");
			}
			break;
		case tvKey.KEY_UP:
			alert("MultiWatchPg_key : Up");
			if(MultiWatchPg_index<2){
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				$("#MultiWatchPg").animate({"top": "-=250px"}, "fast");
				MultiWatchPg_index += 6;
				$(img[MultiWatchPg_index]).css("display","block");
			}
			else{
				$(img[MultiWatchPg_index]).css("display","none");
				MultiWatchPg_index -= 3;
				if (MultiWatchPg_index<2) {
					if (MultiWatchPg_index <0) 
						MultiWatchPg_index=0;
					$("#MultiWatchPg").animate({"top": "+=250px"}, "fast");
					MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).addClass('focus');
				}
				else{
					$(img[MultiWatchPg_index]).css("display","block");
				}
			}
			break;
		case tvKey.KEY_DOWN:
			//$("#sideBar").animate({"top": "-=250px"}, "fast");
			alert("MultiWatchPg_key : Down");
			if(MultiWatchPg_index<=1){
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				MultiWatchPg_index = MultiWatchPg_index+3;
				$(img[MultiWatchPg_index]).css("display","block");
				$("#MultiWatchPg").animate({"top": "-=250px"}, "fast");
			}
			else if(MultiWatchPg_index>1){
				$(img[MultiWatchPg_index]).css("display","none");
				if(MultiWatchPg_index >4)
					MultiWatchPg_index -= 6;
				MultiWatchPg_index += 3;
				$(img[MultiWatchPg_index]).css("display","block");
			}
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
			if (MultiWatchPg_index>=3) {
				MultiWatchPg.anchor.main.removeClass('focus');
				MultiWatchPg.MultiWatchPgElem.eq(MultiWatchPg_index).removeClass('focus');
				Main.sideBarMenu.btn.eq(page_index).removeClass('focus');
				Main.sideBarMenu.btn.eq(++page_index).addClass('focus');
				Main.layout.page.load(pagearr[page_index].html);
				setTimeout(function(){
					pagearr[page_index].object.onLoad();
				},10);

			};
			alert("MultiWatchPg_key : Enter");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};