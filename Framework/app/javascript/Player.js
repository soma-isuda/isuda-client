
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
            this.playerarea.html('<video id="myplayer" src="'+url+'" width="1920px" height="1080px" loop="loop" autoplay="autoplay" poster="img/loading.png"></video>');
            this.player=MyPlayer;
        }
        else {
            this.playerarea.html('<iframe id="ytplayer" width="1920" height="1080" src="https://www.youtube.com/embed/videoseries?list=PLen2wlGtcdPg0gosdUUU_Gh5vtFngMyD-&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;autohide=0&amp;disablekb=0&amp;loop=1&amp;rel=0&amp;enablejsapi=1" frameborder="0" allowfullscreen></iframe>');
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
    },
    play : function(idx){
        this.player.play(idx);
    }    
};

var MyPlayer = {
    init : function(){

    },
    play: function () {
        document.getElementById("myplayer").play();
    },
    pause: function () {
        document.getElementById("myplayer").pause();
    }
};
var YTPlayer = {
    player:null,

    init : function(){
        this.player = new YT.Player('ytplayer', {
            events: {
                'onStateChange': YTPlayer.onPlayerStateChange
            }
        });
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
    // 이수다 채널 플레이어 재생시 자동 호출        
    onPlayerStateChange:function(event){
        alert("이수다 영상 로드");
        if(event.data == YT.PlayerState.PLAYING){
            //            jQuery('#loading').removeClass('show');
            jQuery('#popup').empty();//이전 방송에서 눌리지 않고 남아 있는 팝업을 없앤다.
            //SelectWatchPg.focus('hide'); // 포커스를 다시 돌려보낸다.
            SelectWatchPg.clearPopupList(); // 셋타임 시켜논 명령어 삭제 
            currentMovieIdx = event.target.getPlaylistIndex(); // 현재 재생중인 영상 순서 
            alert("startQuestion : "+ startQuestion);
            indexInISUDAchannel = -1;
            currentQuestionIdx=0;
            ISUDAFirstAccess =1;

            if (userQuestionIdx >0 ){//이수다 채널에 처음 접근하면
                startQuestion += 3; // 다음 t1질문을 하기위한 인덱스 변경{}
                
                SelectWatchPg.isudaPopup(0,startQuestion);
                userQuestionIdx--;  // 남은 t1질문의 수 --
            }
            else 
                SelectWatchPg.isudaPopup(currentMovieIdx+1, 0);

        }

        //alert("동영상 : " + event.data);
    },    
    getPlaylistIndex:function(){
        return this.player.getPlaylistIndex();
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