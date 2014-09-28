var firstcategoryarr=[];
var secondcategoryarr=[];
$(document).ready(function(){
    //get ALL category information
	jQuery.ajax({
	    url: 'http://172.16.100.171:3000/getFirstCategory',
	    type: 'GET',
	    dataType: 'json',
	    success: function (data) {
	        $.each(data, function (key,value) {
	            firstCategory[Number(value.id - 1)] = value.name;
	            secondCategory[Number(value.id-1)] = new Array();//declare 2-dimension array
	        });
	    	jQuery.ajax({
	    	    url: 'http://172.16.100.171:3000/getSecondCategory',
	    	    type: 'GET',
	    	    dataType: 'json',
	    	    success: function (data) {
	    	        var temp = 0;
	    	        var firstCategoryTemp = -1;
	    	        $.each(data, function (key, value) {
	    	            
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

