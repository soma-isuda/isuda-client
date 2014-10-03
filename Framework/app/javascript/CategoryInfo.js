//category Array for 'TVSchedulePg'
var firstCategory = new Array();//1-dimension array
var secondCategory = new Array();//2-dimension array [first : index][second :data]
var secondCategoryNumber = new Array();//ÇØ´ç ÁßºÐ·ùÀÇ second id¸¦ ÀúÀåÇÑ´Ù.

$(document).ready(function(){
	
	//refresh = setInterval(function(){MultiWatchPg.remainedTime();},1000);
    //get ALL category information
	jQuery.ajax({
	    url: SERVER_ADDRESS + '/getFirstCategory',
	    type: 'GET',
	    dataType: 'json',
	    success: function (data) {
	        $.each(data, function (key,value) {
	            firstCategory[Number(value.id - 1)] = value.name;
	            secondCategory[Number(value.id-1)] = new Array();//declare 2-dimension array
	        });
	    	jQuery.ajax({
	    	    url: SERVER_ADDRESS + '/getSecondCategory',
	    	    type: 'GET',
	    	    dataType: 'json',
	    	    success: function (data) {
	    	        var temp = 0;
	    	        var firstCategoryTemp = -1;
	    	        $.each(data, function (key, value) {
	    	            secondCategoryNumber[value.name] = value.id;
	    	            if (firstCategoryTemp < Number(value.firstId - 1)) {
	    	                temp = 0;
	    	                firstCategoryTemp = Number(value.firstId - 1);
	                    }
	    	            secondCategory[Number(value.firstId - 1)][temp]=value.name;//2-dimensional array
	    	            temp++;
	    	            
	    	        });
	    	    }
	    	});
	        
	    }
	});

	
});

