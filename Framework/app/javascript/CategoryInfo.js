//category Array for 'TVSchedulePg'
var firstCategory = new Array();//1-dimension array
var secondCategory = new Array();//2-dimension array [first : index][second :data]
var secondCategoryNumber = new Array();
var allProduct = new Array();//모든 상품정보를 담아놓는 배열
var midProduct = new Array();//중분류 전체보기를 위한 배열

$(document).ready(function () {

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

                }
            });

        }
    });

});

