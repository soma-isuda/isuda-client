var Player = {
	init : function(){
		try{
			var playerInstance = webapis.avplay;
			playerInstance.getAVPlay(Player.onAVPlayObtained, Player.onGetAVPlayError);
		
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
	play: function() {
		try{
//			jQuery('#player_container').addClass('show');
			Main.AVPlayer.open("http://124.243.50.23/live/livestream/playlist.m3u8");
			Main.AVPlayer.play(Player.onSuccess, Player.onError);
			
		}catch(e){
			alert(e.message);
		}
	},
	stop: function() {
//		jQuery(').removeClass('show');
		Main.AVPlayer.stop();
	}
};