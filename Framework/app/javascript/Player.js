
//씨제이, 지에스, 현대,   홈앤쇼핑, 롯데,  
function channel(idx, name, url){
    this.idx = idx;
    this.name = name;
    this.url = url;
};

channel.prototype.getURL = function(){
    return this.url;
};
channel.prototype.getName = function(){
    return this.name;
};


var Player = {
    videoURLlen: 0,
    channel: -1,
    player: document.getElementById("player"),
    playing: false,
    //	외부 호출 함수 
    init: function (ch) {
        alert(channels.length);
//        this.videoURLlen = channels.length;
        this.setChannel(ch);
        this.play();
        this.playing = true;
    },
    destroy: function () {
        if(this.playing){
            this.pause();
            this.playing = false;
        }
    },
    channelUp: function () {
        alert(this.getUpChannel());
        this.setChannel(this.getUpChannel());
        this.play();
    },
    channelDown: function () {

        this.setChannel(this.getDownChannel());
        this.play();
    },

    // 내부 호출 함수 
    play: function () {
        this.getPlayer().play();
    },
    pause: function () {
        this.getPlayer().pause();
    },
    load: function () {
        this.getPlayer().load();
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
        var bch = this.channel;
        if (typeof ch != 'undefined'){
            this.channel = ch;
        }
        if(this.channel == -1){
            this.channel = 0;
        }

        if(bch != this.channel){
            this.getPlayer().src = channels[this.channel].getURL();
        }
        else{ 
            this.load();
        }

    },
    getChannel: function () {
        return this.channel;
    },
    getUpChannel: function () {
        return (this.channel + 1) % channels.length;
    },
    getDownChannel: function () {
        return (this.channel - 1 + channels.length) % channels.length;
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