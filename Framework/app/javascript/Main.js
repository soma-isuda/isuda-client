var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

//category Array for 'TVSchedulePg'
var firstCategory = new Array() ;//1-dimension array
var secondCategory = new Array();//2-dimension array [first : index][second :data]

// pagearr : information about pages in pageinfo
var page_index = 1;
//var sideBarMenuImg = $(".sideBarMenuImg img");

var Main =
{
	layout:{
		sideBar : jQuery('#sideBar'),
		page	: jQuery('#article'),
		subPage : jQuery('#subPage')
	},
	sideBarMenu:{
		btn : jQuery('#sideBar').find('ul > li')
	},
	anchor:{
//		menu	: jQuery('#menu'),
		main	: jQuery('#anchor_main'),
		subPage : jQuery('#anchor_subPage')
	},
	focus: 0	
};

Main.onLoad = function()
{
	alert("Main.onLoad");
	//alert(sideBarMenuImg.length);
	Main.layout.page.load(pagearr[page_index].html);	
	// Enable key event processing
	this.focus();
	widgetAPI.sendReadyEvent();

	alert('Main_onLoad completed');

};

Main.focus = function()
{
	Main.anchor.main.focus();
	Main.layout.sideBar.addClass('focus');
	Main.sideBarMenu.btn.eq(page_index).addClass('focus');
	$("#sideBar").css("width","460px");
	$(".sideBarMenuText").css("display","block");
};
Main.returnFocusFromPage = function()
{
	Main.anchor.main.focus();
	Main.layout.sideBar.addClass('focus');
	Main.sideBarMenu.btn.eq(page_index).addClass('focus');
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;
//	alert("Key pressed: " + keyCode);

	alert("Main");	
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("main_key : Return");
			widgetAPI.sendReturnEvent();
			break;
			
		case tvKey.KEY_UP:
			alert("main_key : Up");
			if(page_index > 1){
				Main.sideBarMenu.btn.eq(page_index).removeClass('focus');
				Main.sideBarMenu.btn.eq(--page_index).addClass('focus');
				Main.layout.page.load(pagearr[page_index].html);
			}
			else{
				Main.sideBarMenu.btn.eq(page_index).removeClass('focus');
				page_index = pagearr.length-1;
				Main.sideBarMenu.btn.eq(page_index).addClass('focus');
				Main.layout.page.load(pagearr[page_index].html);
			}
			break;
		case tvKey.KEY_DOWN:
			alert("main_key : Down");
			alert(page_index);
			alert(pagearr[page_index]);
			if(page_index < (pagearr.length-1)){
				Main.sideBarMenu.btn.eq(page_index).removeClass('focus');
				Main.sideBarMenu.btn.eq(++page_index).addClass('focus');
				//sideBarMenuImg[page_index].attr({src:"../../img/icon1.png"});
				Main.layout.page.load(pagearr[page_index].html);
			}
			else{
				Main.sideBarMenu.btn.eq(page_index).removeClass('focus');
				page_index = 1;
				Main.sideBarMenu.btn.eq(page_index).addClass('focus');				
				Main.layout.page.load(pagearr[page_index].html);

			}
			break;
		case tvKey.KEY_ENTER:
			alert("main_key : Enter");
		case tvKey.KEY_PANEL_ENTER:
			alert("main_key : Panel Enter");		
		case tvKey.KEY_RIGHT:
			alert("main_key : Right");
			//focus move to Page
			setTimeout(function(){
				pagearr[page_index].object.onLoad();
			},10);			
			Main.layout.sideBar.removeClass('focus');
			//Main.sideBarMenu.btn.removeClass('focus');
			$("#sideBar").css("width","300px");
			$(".sideBarMenuText").css("display","none");
			document.getElementById(pagearr[page_index].name).style.marginLeft="130px";

			//document.getElementById("MultiWatchPg").style.marginLeft="120px";
			//pagearr[page_index].onLoad();
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
var SubPage = {};
SubPage.keyDown = function(){
	alert("SubPage keyDown");
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode +" ,index:" + SelectWatchPg_index);
	
	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			//앱이 종료되는것을 방지해준다.
			widgetAPI.blockNavigation(event);
			//event.preventDefault();
			//widgetAPI.blockNavigation(); // prodect App exit
			//widgetAPI.sendReturnEvent();

			alert("SubPage_key : RETURN");
			document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1920px";
			SelectWatchPg.onLoad();
			break;
		case tvKey.KEY_LEFT:
			alert("SubPage_key : Left");
			if(SelectWatchPg_index==0){ //이게 빠른지 3으로 나눈 나머지가 0인경우가 빠른지 모르겠다.
				//focus move to sideBar
				//SelectWatchPg.anchor.main.removeClass('select');
				//SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('select');
				document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1920px";
				SelectWatchPg.onLoad();
			}
			else{
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('select');
				//document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1920px";
				SelectWatchPg.SelectWatchPgMenu.eq(--SelectWatchPg_index).addClass('select');
				//document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1460px";
				Main.layout.subPage.load(subPageArr[SelectWatchPg_index].html);
				setTimeout(function(){
					document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1460px";
					subPageArr[SelectWatchPg_index].object.onLoad();
				},10);
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("SubPage_key : Right");
			if(SelectWatchPg_index==3){
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('select');
				//document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1920px";
				// SelectWatchPg_index를 0으로 만들어 다음 서브 페이지 메뉴버튼에 주황색을 넣어준다.
				// 처음 서브페이지를 메인에 서브페이즈 div에 로드한다.
				// 마진을 1460으로 낮추어서 보이게 한다.
				// 10ms 후 처음 서브페이지에 onLoad함수를 호출한다.
				SelectWatchPg_index=0;
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).addClass('select');
				Main.layout.subPage.load(subPageArr[SelectWatchPg_index].html);
				//document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1460px";
				setTimeout(function(){
					//document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1460px";
					subPageArr[SelectWatchPg_index].object.onLoad();
				},10);
			}
			else{
				// 현재 서브페이지의 포커스를 없애고(주황색준것을 없앤다)
				// 현재 서브페이즈의 마진을 1920으로 바꾸어 다시 보이지 않는곳으로 옮긴다.
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('focus');
				SelectWatchPg.SelectWatchPgMenu.eq(SelectWatchPg_index).removeClass('select');
				//document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1920px";
				// SelectWatchPg_index를 증가시켜서 다음 서브 페이지 메뉴버튼에 주황색을 넣어준다.
				// 다음 서브페이지를 메인에 서브페이즈 div에 로드한다.
				// 마진을 1460으로 낮추어서 보이게 한다.
				// 10ms 후 다음 서브페이지에 onLoad함수를 호출한다.
				SelectWatchPg.SelectWatchPgMenu.eq(++SelectWatchPg_index).addClass('select');
				alert(SelectWatchPg_index);
				alert(subPageArr[SelectWatchPg_index].name);
				Main.layout.subPage.load(subPageArr[SelectWatchPg_index].html);
				//document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1460px";
				setTimeout(function(){
					//document.getElementById(subPageArr[SelectWatchPg_index].name).style.marginLeft="1460px";
					subPageArr[SelectWatchPg_index].object.onLoad();
				},10);
			}
			break;
		case tvKey.KEY_UP:
			alert("SubPage_key : Up");
		
			break;
		case tvKey.KEY_DOWN:
			alert("SubPage_key : Down");
			

			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			//focus move to selectWatchPg
			
			alert("SubPage_key : Enter");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};



Main.numKeyDown = function()
{
	var keyCode = event.keyCode;
	
	
	switch(keyCode)
	{
		case tvKey.KEY_0:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"0");
			break;	
		case tvKey.KEY_1:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"1");
			break;
		case tvKey.KEY_2:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"2");
			break;
		case tvKey.KEY_3:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"3");
			break;
		case tvKey.KEY_4:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"4");
			break;
		case tvKey.KEY_5:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"5");
			break;
		case tvKey.KEY_6:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"6");
			break;
		case tvKey.KEY_7:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"7");
			break;
		case tvKey.KEY_8:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"8");
			break;
		case tvKey.KEY_9:
			MultiWatchPg.login.input.val(MultiWatchPg.login.input.val()+"9");
			break;			
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			pagearr[page_index].object.returnFocusFromInput();			
			break;
/*		case tvKey.KEY_LEFT:
			alert("LEFT");
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			if(focus_comp == "loginInput"){
				MultiWatchPg.anchor.main.focus();
				MultiWatchPg.login.input.removeClass('focus');
				MultiWatchPg.login.submit.addClass('focus');
				focus_comp="loginButton";
			}			
			break;*/
		default:
			alert("Unhandled key");
			break;
	}
};
