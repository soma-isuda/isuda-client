//youtube player관련
/*var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var ytissuccess = false;
function onYouTubeIframeAPIReady() {
    ytissuccess = true;
}*/

//category Array for 'TVSchedulePg'
var firstCategory = new Array();//1-dimension array
var secondCategory = new Array();//2-dimension array [first : index][second :data]
var secondCategoryNumber = new Array();
var allProduct = new Array();//모든 상품정보를 담아놓는 배열
var midProduct = new Array();//중분류 전체보기를 위한 배열

var providers = new Array();
var channels = new Array();
//var providerIdToName = new Array();

//이수다 채널의 편성표를 저장하는 부분
var ISUDAschedule = new Array();

var pagearr = new Array();
pagearr.push({name: 'MultiWatchPg',     html: 'app/html/MultiWatchPg.html',     object: MultiWatchPg});
pagearr.push({name: 'SelectWatchPg',    html: 'app/html/SelectWatchPg.html',    object: SelectWatchPg});
pagearr.push({name: 'TVSchedulePg',     html:'app/html/TVSchedulePg.html',      object: TVSchedulePg});
pagearr.push({name: 'MyPg',             html:'app/html/MyPg.html',              object: MyPg});

var subPageArr= new Array();
subPageArr.push({name: 'DetailInfoSpg',     html:'app/html/DetailInfoSpg.html',    object: DetailInfoSpg});
subPageArr.push({name: 'ComparePriceSpg',   html:'app/html/ComparePriceSpg.html',  object: ComparePriceSpg});
subPageArr.push({name: 'SMSSharingSpg',     html:'app/html/SMSSharingSpg.html',    object: SMSSharingSpg});
subPageArr.push({ name: 'SelectNumberSpg',  html:'app/html/SelectNumberSpg.html',  object: SelectNumberSpg });
subPageArr.push({ name: 'ISUDAscheduleSpg', html:'app/html/ISUDAscheduleSpg.html', object: ISUDAscheduleSpg });
//subPageArr.push({ name: 'InteractiveSpg',   html:'app/html/InteractiveSpg.html',   object: InteractiveSpg });

var arrowImgArr = [];
arrowImgArr.push("img/arrow_up_0.png");
arrowImgArr.push("img/arrow_down_0.png");
arrowImgArr.push("img/arrow_up_1.png");
arrowImgArr.push("img/arrow_down_1.png");

var ISUDAelementArr = new Array();
ISUDAelementArr[0] = new Array();
ISUDAelementArr[0][1] = ({img: 'img/milk.png', name: '삼성뮤직 MILK', benefit: '삼성 휴대폰 사용고객 전원', price: '365일 평생 무료!', footer: '앱 다운로드', enter:3 })
ISUDAelementArr[0][2] = ({img: 'img/hojoo.png', name: '호주 10일 패키지 여행', benefit: '대한항공 직항+10대 특식 포함', price: '2,629,000원', footer: '상세보기', enter:0})
ISUDAelementArr[1] = new Array();
ISUDAelementArr[1][0] = ({img: 'img/bedal.png', name: '대한민국 1등 배달앱. 배달의 민족!', benefit: '오늘먹을 치킨을', price: '내일로 미루지 말자', footer: '앱 다운로드', enter:3})


function provider(name, url){
    this.name = name;
    this.url = url;
};


provider.prototype.getURL = function(){
    return this.url;
};
provider.prototype.getName = function(){
    return this.name;
};

$(document).ready(function () {

    jQuery.ajax({
        url: SERVER_ADDRESS + '/getProviders',
        type : 'GET',
        dataType : 'json',
        success : function (data) {
            $.each(data, function (key, value) {
                alert(key+" : " + value.providerName);
//                if (value.chURL != null) {
                    providers[value.id] = new provider(value.providerName, value.chURL);
                    channels.push(value.id);    
//                    channels.push(new channel(key, value.providerName, value.chURL));
//                    providerIdToName[value.id] = value.providerName;
//                }
            });
        }
    });  

    //refresh = setInterval(function(){MultiWatchPg.remainedTime();},1000);
    //get ALL category information
    //전체보기를 대분류의 첫번째로 넣는다.
    firstCategory[0] = '전체보기';
    allProduct[0] = new Array();//대분류의 '전체보기'가 들어가는 곳

    secondCategory[0] = new Array();
    $.ajax({
        url: SERVER_ADDRESS + '/getFirstCategory',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (key, value) {
                firstCategory[Number(value.id)] = value.name;
                secondCategory[Number(value.id)] = new Array();//declare 2-dimension array
                allProduct[Number(value.id)] = new Array();
                midProduct[Number(value.id)] = new Array();
            });
            $.ajax({
                url: SERVER_ADDRESS + '/getSecondCategory',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var temp = 0;
                    var firstCategoryTemp = 0;
                    $.each(data, function (key, value) {
                        
                        secondCategoryNumber[value.name] = value.id;
                        if (firstCategoryTemp < Number(value.firstId)) {
                            temp = 0;
                            firstCategoryTemp = Number(value.firstId);
                            
                        }
                        if (temp == 0) {
                            //allProduct[Number(value.firstId)][temp] = new Array();
                            secondCategory[Number(value.firstId)][temp++] = '전체보기';//중분류의 처음(temp==0)에는 '전체보기'를 넣는다. 
                            secondCategory[Number(value.firstId)][temp] = value.name;
                        }
                        else
                            secondCategory[Number(value.firstId)][temp] = value.name;//2-dimensional array

                        allProduct[Number(value.firstId)][Number(value.id)] = new Array();//['대분류index']['중분류index']에 배열을 만든다.
                        temp++;
                    });
                    //모든 상품 정보를 받아온다.
                    $.ajax({
                        url: SERVER_ADDRESS + '/productInfo',//전체 상품을 얻어오는 URL
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            alert('/productInfo success');
                            $.each(data, function (key, value) {
                                allProduct[0].push(value); //allProduct[0] 배열에는 모든 상품이 들어가야 하므로, 일단 넣는다.
                                if (value.firstId > 0 && value.secondId > 0) {//대분류와 중분류가 명확히 분류되어 있는 상품일 경우
                                    allProduct[Number(value.firstId)][Number(value.secondId)].push(value);
                                    midProduct[Number(value.firstId)].push(value);//중분류 전체보기
                                }
                            });
                            alert('상품정보 받아오기 끝');
                        }
                    });
                    //이수다 홈쇼핑의 방송 정보를 얻어온다.
                    $.ajax({
                        url: SERVER_ADDRESS + '/productISUDA',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            alert('/productISUDA success');
                            var temp__ = 0;
                            $.each(data, function (key, value) {
                                  
                                ISUDAschedule.push(value);
                            });
                        },
                    })

                }
            });

        }
    });

});

