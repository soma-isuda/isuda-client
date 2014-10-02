//선택보기 메뉴 {상세보기, 가격비교, SMS공유, 바로결제}
//var SelectWatchPg_index =0; // = subPageArr_index
//
//var channel = 0;
//var playerInit = false;

var SelectWatchPg = {
	//선택보기 메뉴 {상세보기, 가격비교, SMS공유, 바로결제}		
	idxsubmenu : 0,
	//채널, 멀티 와치 페이지에서 onload될 때 넘어옴 = ch or 메인 메뉴에서 넘어옴 = 0
	channel : 0
};

SelectWatchPg.onLoad = function(ch)
{
	alert("SelectWatchPg onLoad");
//	alert(subPageArr.length);
	jQuery.extend(SelectWatchPg,{
		SelectWatchPgMenu : jQuery('#SelectWatchPgMenu').find('ul > li'),
		player : jQuery('#player > video'),
		anchor:{
			main	: jQuery('#anchor_SelectWatchPg')
		}
		//focus: 0
	});
	
	if(typeof ch != 'undefined'){
		this.channel = ch;
	}
	
	SelectWatchPg.player.addClass('show');
	
	//onload되는것 체크 해줘야됨..
//	if(!SelectWatchPg.player.paused){
		SelectWatchPg.player.attr('src',videoURL[this.channel]);
		SelectWatchPg.player[0].play();		
//	}
	
	alert("Channel = " + this.channel + " "+ ch);

	this.focus();

};

SelectWatchPg.focus = function(){ 
	alert("SelectWatchPg focus");
	SelectWatchPg.anchor.main.focus();
	// focus initialize
	//alert(SelectWatchPgMenu.size);
	SelectWatchPg.SelectWatchPgMenu.eq(this.idxsubmenu).removeClass('select');
	SelectWatchPg.SelectWatchPgMenu.eq(this.idxsubmenu).addClass('focus');
};

SelectWatchPg.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

SelectWatchPg.keyDown = function()
{
	alert("SelectWatchPg keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
//		채널 퀵변경 
		case tvKey.KEY_CH_UP:
			this.channel = (this.channel+videoURL.length+1)%videoURL.length;			
			SelectWatchPg.player.attr('src',videoURL[this.channel]);
			SelectWatchPg.player[0].play();		
			break;
		case tvKey.KEY_CH_DOWN:
			this.channel = (this.channel+videoURL.length-1)%videoURL.length;			
			SelectWatchPg.player.attr('src',videoURL[this.channel]);
			SelectWatchPg.player[0].play();						
			break;			
		
//		메뉴 활성
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("SelectWatchPg_key : RETURN");
			widgetAPI.blockNavigation(event);	
		case tvKey.KEY_LEFT:
			alert("SelectWatchPg_key : Left");
//			Player.stop();
			SelectWatchPg.anchor.main.removeClass('focus');
			SelectWatchPg.SelectWatchPgMenu.eq(this.idxsubmenu).removeClass('focus');
			Main.focus();
			break;
			
//		서브 메뉴 변경 
		case tvKey.KEY_UP:
			alert("SelectWatchPg_key : Up");
			SelectWatchPg.SelectWatchPgMenu.eq(this.idxsubmenu).removeClass('focus');			
			this.idxsubmenu = (this.idxsubmenu-1)%SelectWatchPg.SelectWatchPgMenu.size();
			SelectWatchPg.SelectWatchPgMenu.eq(this.idxsubmenu).addClass('focus');			
			break;
		case tvKey.KEY_DOWN:
			alert("SelectWatchPg_key : Down");
			SelectWatchPg.SelectWatchPgMenu.eq(this.idxsubmenu).removeClass('focus');			
			this.idxsubmenu = (this.idxsubmenu+1)%SelectWatchPg.SelectWatchPgMenu.size();
			SelectWatchPg.SelectWatchPgMenu.eq(this.idxsubmenu).addClass('focus');			
			break;

//		서브 메뉴 활성 
		case tvKey.KEY_ENTER: 
		case tvKey.KEY_PANEL_ENTER:
			alert("SelectWatchPg_index : "+ this.idxsubmenu);
			SelectWatchPg.SelectWatchPgMenu.eq(this.idxsubmenu).addClass('select');
			Main.layout.subPage.load(subPageArr[this.idxsubmenu].html);
			// setTimeout(function(){
			// 	document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1920px";
			// 	$("#"+subPageArr[SelectWatchPg_index].name).animate({left:'-460px'}, 1000);
			//  },1);
			setTimeout(function(){
				subPageArr[this.idxsubmenu].object.onLoad();
			},100);

			break;

		default:
			alert("Unhandled key");
			break;
	}
};