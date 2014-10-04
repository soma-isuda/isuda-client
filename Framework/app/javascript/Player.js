//씨제이, 지에스, 현대,   홈앤쇼핑, 롯데,  
var videoURL = ["http://cjmall.live.cdn.visioncloud.co.kr/cjmalllive/stream2/playlist.m3u8|COMPONENT=HLS|PLAYTYPE=VOD",
				"http://livem.gsshop.com:80/gsshop/_definst_/gsshop.sdp/playlist.m3u8|COMPONENT=HLS|PLAYTYPE=VOD",
				"http://live.hmall.gscdn.com/hmall/_definst_/live.stream/playlist.m3u8|COMPONENT=HLS|PLAYTYPE=VOD",
				"http://218.232.67.62:1935/live/mp4:a.stream/playlist.m3u8|COMPONENT=HLS|PLAYTYPE=VOD",
                "http://124.243.50.23/live/livestream/playlist.m3u8|COMPONENT=HLS|PLAYTYPE=VOD"];

var Player = {
	channel	: 0,
	player 	: jQuery('#player > video'),
	init	: function(ch){
		if(typeof ch != 'undefined')		this.channel = ch;
		this.setURL();
		this.play();
//			show();
	},
	show	: function(){
		//this.player.show();
		this.play();
	},
	hide	: function(){
		if(!this.isPaused()){
			this.pause();
		}
		//this.player.hide();		
	},
	
	play	: function(){
		this.player.get(0).play();		
	},
	pause	: function(){
		this.player.get(0).pause();		
	},
	
	stop	: function(){
		this.player.get(0).stop();
	},
	channelUp	: function(){
		this.channel = (this.channel + 1)%videoURL.length;
		this.setURL();
		this.play();
	},
	channelDown	: function(){
		this.channel = (this.channel - 1 + videoURL.length)%videoURL.length;
		this.setURL();
		this.play();
	},	
	isPaused: function(){
		return this.player.get(0).paused;
	},
	setURL	: function(){
		if(this.player.attr('src') != videoURL[this.channel]){
			this.player.attr('src',videoURL[this.channel]);			
		}
	},
	destroy	: function(){
		this.player.attr('src','');
		this.hide();
	}
};