var AVPlayer=null;
var Player = { //실질적인 Player 클래스
		state : -1,
	    skipState : -1,
	    stopCallback : null,    /* Callback function to be set by client */
	    originalSource : null,
	    
	    STOPPED : 0,
	    PLAYING : 1,
	    PAUSED : 2,  
	    FORWARD : 3,
	    REWIND : 4,
	   
		onAVPlayObtained : function(avplay){	
			//AVPlayer 모듈을 초기화하는 콜백함수
			//모듈을 호출하는 onAVPlayObtained 함수는 AVPlay 인스턴스를 인자로 받는다.
			alert('Getting avplay object successfully');
			AVPlayer = avplay;
			alert("avplayavplayavplayavplayavplay=="+AVPlayer);
			AVPlayer.init({containerID : 'player_container', 
				displayRect:{
					width: 470,
		            height: 270,
		            top: 57,
		            left: 461
			}, autoRatio: true });
			alert('afafafaf1'); //check
			
			//이를 화면 레이어 전역에서 제어할 수 있게끔 로컬에 선언된 변수에 바인딩해서 AVPlayer 객체를 생성한 후 init 함수를 호출해 플레이어 구동 준비를 완료한다.
			//Initializes avplay with the specified option parameter. This has to be called before any ather avplay function.
		},
		onGetAVPlayError : function(){ 
			//AVPlayer 모듈을 초기화할 때 발생하는 에러를 처리하기 위한 함수
			alert('######onGetAVPlayError: ' + error.message);
		},
		onError : function(){
			alert('######onError: ');
		},
		onSuccess : function(){
			alert('######onSuccess: ');
		},
		play: function() {
			try{
				jQuery('#player_container').addClass('show'); //화면상에 player_container(스크린이라고 생각) 나타냄 
				AVPlayer.open("http://124.243.50.23/live/livestream/playlist.m3u8|COMPONENT=HLS");
				AVPlayer.play(Player.onSuccess, Player.onError); // 콘텐츠 재생
				index_saver = content_index; //현재 재생한 영상의 index를 기억하게 하기위해 변수 index_saver에 할당
				
			}catch(e){
				alert(e.message);
			}
		},
		stop: function() {
			jQuery('#player_container').removeClass('show'); // 화면상의 player_container(스크린이라고 생각) 제거
			AVPlayer.stop();
		},
		pause : function(){
			AVPlayer.pause();
		},
		resume : function(){
			AVPlayer.resume();
		},
		jumpBackward : function(){
			AVPlayer.jumpBackward(1); //재생되고 있는 영상클립을 1초전으로 이동
			
		},
		jumpForward : function(){
			AVPlayer.jumpForward(5);                                        //offset is big message 뜸(5로했을 때, 2로하니깐 되감기같이 구현됨)
		},
		setSpeed : function(speed){
			//재생속도를 매개변수 speed로 전달받음
			AVPlayer.setSpeed(speed); //재생속도는 2의 제곱수(2,4,8...)로 설정 가능
		},                                 //재생속도 변환 시 사운드 출력 X
										   //2배속까지는 연속적으로 재생되나, 4배속부터는 끊김현상 발생(불연속 재생)	
		
		setDisplayRect : function(rect){ //Sets the display area of video content on TV screen
			AVPlayer.setDisplayRect(rect);
		}
	};

Player.init = function()
{
	try{
		var playerInstance = webapis.avplay;
		alert('100000001'); //check
		playerInstance.getAVPlay(Player.onAVPlayObtained, Player.onGetAVPlayError);
		alert('1000000011'); //check
		return true;
		//playerInstance는 단순히 AVPlayer의 인스턴스를 가져와서 getAVPlay 함수를 호출하는데 사용할뿐.
		//getAVPlay함수가 정상적으로 호출되면, 함께 전달한 onAVPlayerObtained라는 콜백함수도 호출되며,
		//이 함수에서 실제적인 AVPlayer 모듈을 불러온다.
		//추가로 AVPlayer모듈을 불러올 때 발생할 수 있는 에러를 처리할 수 있는 콜백함수도 함께 전달한다.
		
	}catch(e){
		alert('######getAVplay Exception :[' +e.code + '] ' + e.message);
	}
	//Player.onAVPlayObtained();
}
Player.GetBitrates=function(){
	return AVPlayer;
}
Player.deinit = function()
{
	this.stop();
}

Player.setWindow = function()
{
	this.onAVPlayObtained();
}

Player.setFullscreen = function()
{
    webapis.tv.window.setRect({
    width : 960,
    height : 540,
    top : 0,
    left : 0
});
}

Player.setVideoURL = function(url)
{
    this.url = url;
    alert("url============"+url);
    document.getElementById("description").innerHTML="url============"+url;
    alert("URL = " + this.url);
}

Player.playVideo = function()
{
    if (this.url == null)
    {
        alert("No videos to play");
    }
    else
    {
        this.state = this.PLAYING;
        document.getElementById("play").style.opacity = '0.2';
        document.getElementById("stop").style.opacity = '1.0';
        document.getElementById("pause").style.opacity = '1.0';
        document.getElementById("forward").style.opacity = '1.0';
        document.getElementById("rewind").style.opacity = '1.0';
        Display.status("Play");
        this.init();
        
      /*  this.plugin.Execute("SetInitialBuffer",640*1024);
        this.plugin.Execute("SetPendingBuffer",640*1024); */
       
        Player.play();
        //Audio.plugin.Execute("SetSystemMute",false);
    }
}

Player.pauseVideo = function()
{
    this.state = this.PAUSED;
    document.getElementById("play").style.opacity = '1.0';
    document.getElementById("stop").style.opacity = '1.0';
    document.getElementById("pause").style.opacity = '0.2';
    document.getElementById("forward").style.opacity = '0.2';
    document.getElementById("rewind").style.opacity = '0.2';
    Display.status("Pause");
    Player.pause();
}

Player.stopVideo = function()
{
    if (this.state != this.STOPPED)
    {
        this.state = this.STOPPED;
        document.getElementById("play").style.opacity = '1.0';
        document.getElementById("stop").style.opacity = '0.2';
        document.getElementById("pause").style.opacity = '0.2';
        document.getElementById("forward").style.opacity = '0.2';
        document.getElementById("rewind").style.opacity = '0.2';
        Display.status("Stop");
        //this.plugin.Execute("Stop");
        Player.stop();
        Display.setTime(0);
        
        if (this.stopCallback)
        {
            this.stopCallback();
        }
    }
    else
    {
        alert("Ignoring stop request, not in correct state");
    }
}

Player.resumeVideo = function()
{
    this.state = this.PLAYING;
    document.getElementById("play").style.opacity = '0.2';
    document.getElementById("stop").style.opacity = '1.0';
    document.getElementById("pause").style.opacity = '1.0';
    document.getElementById("forward").style.opacity = '1.0';
    document.getElementById("rewind").style.opacity = '1.0';
    Display.status("Play");
    Player.resume();
}

Player.skipForwardVideo = function()
{
    this.skipState = this.FORWARD;
    Player.jumpForward();
}

Player.skipBackwardVideo = function()
{
    this.skipState = this.REWIND;
   Player.jumpBackward();
}

Player.getState = function()
{
    return this.state;
}

// Global functions called directly by the player 

Player.onBufferingStart = function()
{
    Display.status("Buffering...");
    switch(this.skipState)
    {
        case this.FORWARD:
            document.getElementById("forward").style.opacity = '0.2';
            break;
        
        case this.REWIND:
            document.getElementById("rewind").style.opacity = '0.2';
            break;
    }
}

Player.onBufferingProgress = function(percent)
{
    Display.status("Buffering:" + percent + "%");
}

Player.onBufferingComplete = function()
{
    Display.status("Play");
    switch(this.skipState)
    {
        case this.FORWARD:
            document.getElementById("forward").style.opacity = '1.0';
            break;
        
        case this.REWIND:
            document.getElementById("rewind").style.opacity = '1.0';
            break;
    }
}

Player.setCurTime = function(time)
{
    Display.setTime(time);
}

/*Player.setTotalTime = function()
{
   // Display.setTotalTime(Player.plugin.Execute("GetDuration"));
}*/

onServerError = function()
{
    Display.status("Server Error!");
}

OnNetworkDisconnected = function()
{
    Display.status("Network Error!");
}

getBandwidth = function(bandwidth) { alert("getBandwidth " + bandwidth); }

onDecoderReady = function() { alert("onDecoderReady"); }

onRenderError = function() { alert("onRenderError"); }

stopPlayer = function()
{
    Player.stopVideo();
}

setTottalBuffer = function(buffer) { alert("setTottalBuffer " + buffer); }

setCurBuffer = function(buffer) { alert("setCurBuffer " + buffer); }
