var videoURL = ["http://218.232.67.62:1935/live/mp4:a.stream/playlist.m3u8",
           "http://124.243.50.23/live/livestream/playlist.m3u8",
           "http://livem.gsshop.com:80/gsshop/_definst_/gsshop.sdp/playlist.m3u8",
           "http://live.hmall.gscdn.com/hmall/_definst_/live.stream/playlist.m3u8",
           "http://cjmall.live.cdn.visioncloud.co.kr/cjmalllive/stream2/playlist.m3u8"];

var Player = {
	nowPlaying : false,
	playerInit : false,
	init : function(){
		if(Player.playerInit)	return;
		try{
			var playerInstance = webapis.avplay;
			playerInstance.getAVPlay(Player.onAVPlayObtained, Player.onGetAVPlayError);
			Player.playerInit = true;		
		}catch(e){
			alert('######getAVplay Exception :[' +e.code + '] ' + e.message);
		}
	},
	onAVPlayObtained : function(avplay){	
		//AVPlayer 모듈을 초기화 콜백함수
		Main.AVPlayer = avplay;
		Main.AVPlayer.init({containerID : 'player', displayRect: {
			top: 0,
			left: 300,
			width: 1620,
			height: 1080
		} });
		
	},
	onGetAVPlayError : function(){ 
		//AVPlayer 모듈 초기화시 발생한 에러 핸들링함수
		alert('######onGetAVPlayError: ' + error.message);
	},
	onError : function(){
		alert('######onError: ');
	},
	onSuccess : function(){
		alert('######onSuccess: ');
	},
	play: function(index) {
		if(Player.nowPlaying)	return;
		try{
//			jQuery('#player_container').addClass('show');

			Main.AVPlayer.open(videoURL[index]);
			Main.AVPlayer.play(Player.onSuccess, Player.onError);
			Player.nowPlaying = true;			
		}catch(e){
			alert(e.message);
		}
	},
	stop: function() {
		Player.nowPlaying = false;
//		jQuery(').removeClass('show');
		Main.AVPlayer.stop();
	}
};