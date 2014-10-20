
//씨제이, 지에스, 현대,   홈앤쇼핑, 롯데,  
var videoURL = ["http://cjmall.live.cdn.visioncloud.co.kr/cjmalllive/stream2/playlist.m3u8|COMPONENT=HLS|PLAYTYPE=VOD",
				"http://livem.gsshop.com:80/gsshop/_definst_/gsshop.sdp/playlist.m3u8|COMPONENT=HLS|PLAYTYPE=VOD",
				"http://live.hmall.gscdn.com/hmall/_definst_/live.stream/playlist.m3u8|COMPONENT=HLS|PLAYTYPE=VOD",
				"http://182.162.174.62:1935/live/mp4:a.stream/playlist.m3u8|COMPONENT=HLS|PLAYTYPE=VOD",
                "http://124.243.50.23/live/livestream/playlist.m3u8|COMPONENT=HLS|PLAYTYPE=VOD"];
/*
function channel(idx, name, url, player){
    this.idx = idx;
    this.name = name;
    this.url = url;
    this.player = document.getElementById("player"+idx);

    if(this.url != null)
        this.player.src = this.url;
};


function Player_(name, player, channel, url){
    this.name = name;
    this.player = player;
    this.channel = channel;
    this.url = url;
    this.playing = false;

    this.setPlayer = function(player){

    }
}

Player_.prototype.show = function(){


}

Player_.prototype.hide = function(){


}

Player_.prototype.getUpChannel = function(){

}

Player_.prototype.getDownChannel = function(){
    
}

Player_.prototype.ispaused = function () {
    return this.player.paused;
}

Player_.prototype.isended = function () {
    return this.player.ended;
}
*/
var Player = {
    videoURLlen: videoURL.length,
    channel: 0,
    player: document.getElementById("player"),
    playing: false,
    //	외부 호출 함수 
    init: function (ch) {
        this.setChannel(ch);
        this.play();
        this.playing = true;
    },
    destroy: function () {
        if(this.playing){
            this.getPlayer().src = '';
            this.playing = false;
        }
    },
    channelUp: function () {
        this.setChannel((this.channel + 1) % this.videoURLlen);
        this.play();
    },
    channelDown: function () {
        this.setChannel((this.channel - 1 + this.videoURLlen) % this.videoURLlen);
        this.play();
    },

    // 내부 호출 함수 
    play: function () {
        this.getPlayer().play();
    },
    stop: function () {
        this.getPlayer().stop();
    },
    pause: function () {
        this.getPlayer().pause();
    },

    //state 함수 
    ispaused: function () {
        return this.getPlayer().paused;
    },
    isended: function () {
        return this.getPlayer().ended;
    },


    //get, set 함수
    setChannel: function (ch) {
        if (typeof ch != 'undefined')
            this.channel = ch;
        // if (this.channel <3)
        //     document.getElementById("player").style.width="1790px";
        // else
        //     document.getElementById("player").style.width="1610px";
        if (this.getPlayer().src != videoURL[this.channel]) {
            this.getPlayer().src = videoURL[this.channel];
        }
    },
    getChannel: function () {
        return this.channel;
    },
    getUpChannel: function () {
        return (this.channel + 1) % this.videoURLlen;
    },
    getDownChannel: function () {
        return (this.channel - 1 + this.videoURLlen) % this.videoURLlen;
    },    
    setPlayer: function (player) {
        this.player = player;
    },
    getPlayer: function () {
        return this.player;
    }
};

/*
Player.getPlayer().onended = function(){
	alert(Player.ispause());	
	alert(Player.isended());
};

Player.getPlayer().onpause = function(){
	alert(Player.ispause());
	alert(Player.isended());	
};*/