
//씨제이, 지에스, 현대,   홈앤쇼핑, 롯데,  (이수다)

var PlayerManager = {
    channel: -1,
    videoURLlen : 0,
    player : null,
    playerarea : jQuery('#playerarea'),
    playing : false,
    init: function(ch){
        this.setChannel(ch);
        this.playing = true;
    },
    destroy: function(){
        if(this.playing){
            this.playerarea.html('');
            this.playing = false;
        }
/*        var url = providers[channels[this.channel]].getURL();
        if(url != null){
            this.playerarea.html('');
        }
        else{
            player.pause();
            //pause
        }*/
    },
    channelUp: function () {
        this.setChannel(this.getUpChannel());
//        this.play();
    },
    channelDown: function () {
        this.setChannel(this.getDownChannel());
//        this.play();
    },

    setChannel: function (ch) {
        if (typeof ch != 'undefined'){
            this.channel = ch;
        }
        if(this.channel == -1){
            this.channel = 0;
        }
        this.setPlayer();        
    },   
    setPlayer: function(){
        var url = providers[channels[this.channel]].getURL();
        alert(url);
        if(url != null){
            this.playerarea.html('<video id="player" src="'+url+'" width="1920px" height="1080px" loop="loop" autoplay="autoplay"></video>');
            this.player=MyPlayer;
        }
        else {
            this.playerarea.html('<iframe id="player" width="1920" height="1080" src="http://www.youtube.com/embed/videoseries?list=PLJ6Y7jZXezJ465T7ahzn4WN3AIlKhLyjF&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;autohide=0&amp;disablekb=0&amp;loop=1&amp;rel=0" frameborder="0" allowfullscreen></iframe>');
            this.player=YTPlayer;
        }
        this.player.init();
    },
    getChannel: function () {
        return this.channel;
    },
    getUpChannel: function () {
        return (this.channel + 1) % channels.length;
    },
    getDownChannel: function () {
        return (this.channel - 1 + channels.length) % channels.length;
    }    
};

var MyPlayer = {
    init : function(){

    },
    play: function () {
        document.getElementById("player").play();
    },
    pause: function () {
        document.getElementById("player").pause();
    }
};
var YTPlayer = {
 //   player:null,
    init : function(){
//        this.player = document.getElementById('player').contentWindow;
//        alert("init finish");
        //this.pause();
   
    },
    play: function (idx) {
        if(typeof idx != 'undefined')
            document.getElementById('player').contentWindow.postMessage('{"event":"command","func":"playVideoAt","args":"'+idx+'"}', '*');                      
        else    
            document.getElementById('player').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');                       
    },
    pause: function () {
            document.getElementById('player').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');                      
    }           
};


/*
var YTPlayer = {
    player:null,
    init : function(){
        alert("init");
        this.player = new YT.Player('player', {
            width: '1920',
            height:'1080',
            videoId: 'M7lc1UVf-VE',
            playerVars: { 'autoplay': 1, 'autohide':0, 'controls': 0, 'disablekb':0, 'loop': 1, 'rel':0, 'showinfo':0 },
            events: {
                'onReady': YTPlayer.onPlayerReady,
            }
        });
        alert("init finish");   
    },
    play: function (idx) {
        if(typeof idx != 'undefined')
            this.player.playVideoAt(idx);
        else
            this.player.playVideo();
    },
    pause: function () {
        this.player.pauseVideo();
    },
    onPlayerReady: function(event) {
        event.target.loadPlaylist({list: 'PLJ6Y7jZXezJ465T7ahzn4WN3AIlKhLyjF'});
    }           
};*/




/* 
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


Player.getPlayer().onended = function(){
	alert(Player.ispause());	
	alert(Player.isended());
};

Player.getPlayer().onpause = function(){
	alert(Player.ispause());
	alert(Player.isended());	
};*/