
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
        alert("이수다 영상 로드 : " + event.data);
        /*
ISUDAPlayOrder[0] = [0, 1, 2, 3, 4];
ISUDAPlayOrder[1] = [0, 1, 2, 3, 4];
ISUDAPlayOrder[2] = [0, 1, 4, 2, 3];
ISUDAPlayOrder[3] = [0, 1, 4, 2, 3];
ISUDAPlayOrder[4] = [0, 2, 1, 3, 4];
ISUDAPlayOrder[5] = [0, 2, 1, 3, 4];
ISUDAPlayOrder[6] = [0, 2, 4, 3, 1];
ISUDAPlayOrder[7] = [0, 2, 4, 3, 1];
        */
        //기존의 영상이 종료되었을때
        if (event.data == -1 && isNowPlaying==0 ) {
            ISUDAPlayRotation = (ISUDAPlayRotation+1)%5;//다음영상으로 넘어갈때 인덱스를 바꿈
            var nextPlayIdx = T1QuestionAnswer[2] * 4 + T1QuestionAnswer[1] * 2 + T1QuestionAnswer[0];
            alert('ISUDAPlayOrder[nextPlayIdx][ISUDAPlayRotation] : '+ISUDAPlayOrder[nextPlayIdx][ISUDAPlayRotation]);
            //event.target.playVideoAt(ISUDAPlayOrder[nextPlayIdx][ISUDAPlayRotation]);
            currentMovieIdx = ISUDAPlayOrder[nextPlayIdx][ISUDAPlayRotation];
            PlayerManager.play(ISUDAPlayOrder[nextPlayIdx][ISUDAPlayRotation]);//다음 영상을 로드한다.(T1질문에 따라서)
            alert('첫번째 if에서 : ' + currentMovieIdx);
            isNowPlaying = 1;
        }
        if (event.data == YT.PlayerState.PLAYING) {            
            isNowPlaying = 0;
            //            jQuery('#loading').removeClass('show');
            jQuery('#popup').empty();//이전 방송에서 눌리지 않고 남아 있는 팝업을 없앤다.
            //SelectWatchPg.focus(0); // 포커스를 다시 돌려보낸다.
            SelectWatchPg.clearPopupList(); // 셋타임 시켜놓은 명령어 삭제 
            currentMovieIdx = event.target.getPlaylistIndex(); // 현재 재생중인 영상 순서 
            alert('두번째 if에서 : ' + currentMovieIdx);

            alert("startQuestion : "+ startQuestion);
            indexInISUDAchannel = -1;
            currentQuestionIdx=0;
                
            moreInfoIndex=-1;

            if (userQuestionIdx >0 ){//T1질문이 남아있으면
                ISUDAFirstAccess = 1;
                startQuestion += 3; // 다음 t1질문을 하기위한 인덱스 변경
                
                SelectWatchPg.isudaPopup(0,startQuestion);
                userQuestionIdx--;  // 남은 t1질문의 수 --
            }
            else //T1질문이 더이상 남아있지 않으면
                SelectWatchPg.isudaPopup(currentMovieIdx+1, 0);

            SelectWatchPg.ChannelDetail.html(ISUDAschedule[currentMovieIdx].productName);            
            SelectWatchPg.showChannel();
        }

        //alert("동영상 : " + event.data);
    },    
    getPlaylistIndex:function(){
        return this.player.getPlaylistIndex();
    }
};
var isNowPlaying = 1;//1이면 다음 영상 시작, 0이면 아직

