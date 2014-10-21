
//씨제이, 지에스, 현대,   홈앤쇼핑, 롯데,  

function channel(idx, name, url){
    this.idx = idx;
    this.name = name;
    this.url = url;
    this.player = document.getElementById("player"+idx);

    this.player.src = this.url;
};

channel.prototype.getPlayer = function(){
    return this.player;
};

var Player = {
    channel: 0,
    playing: false,
    //	외부 호출 함수 
    init: function (ch) {
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
        this.setChannel((this.channel + 1) % channels.length);
        this.play();
    },
    channelDown: function () {
        this.setChannel((this.channel - 1 + channels.length) % channels.length);
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
        if (typeof ch != 'undefined')
            this.channel = ch;
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
    getPlayer: function () {
        return channels[this.channel].getPlayer();
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