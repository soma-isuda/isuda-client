//category Array for 'TVSchedulePg'
var firstCategory = new Array();//1-dimension array
var secondCategory = new Array();//2-dimension array [first : index][second :data]
var secondCategoryNumber = new Array();//ÇØ´ç ÁßºÐ·ùÀÇ second id¸¦ ÀúÀåÇÑ´Ù.

$(document).ready(function(){
    
	//refresh = setInterval(function(){MultiWatchPg.remainedTime();},1000);
    //get ALL category information
    //전체보기를 대분류의 첫번째로 넣는다.
    firstCategory[0] = '전체보기';
    secondCategory[0] = new Array();
	jQuery.ajax({
	    url: SERVER_ADDRESS + '/getFirstCategory',
	    type: 'GET',
	    dataType: 'json',
	    success: function (data) {
	        $.each(data, function (key,value) {
	            firstCategory[Number(value.id)] = value.name;
	            secondCategory[Number(value.id)] = new Array();//declare 2-dimension array
	        });
	    	jQuery.ajax({
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
	    	            if (temp == 0){
	    	                secondCategory[Number(value.firstId)][temp++] = '전체보기';//중분류의 처음(temp==0)에는 '전체보기'를 넣는다. 
	    	                secondCategory[Number(value.firstId)][temp] = value.name;//
	    	            }
                        else
	    	                secondCategory[Number(value.firstId)][temp]=value.name;//2-dimensional array

	    	            temp++;
	    	        });
	    	    }
	    	});
	        
	    }
	});
});

