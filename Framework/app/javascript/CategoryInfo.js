//category Array for 'TVSchedulePg'
var firstCategory = new Array();//1-dimension array
var secondCategory = new Array();//2-dimension array [first : index][second :data]
var secondCategoryNumber = new Array();//ÇØ´ç ÁßºÐ·ùÀÇ second id¸¦ ÀúÀåÇÑ´Ù.

$(document).ready(function(){
    //get ALL category information
    jQuery.ajax({
		url: SERVER_ADDRESS + '/productInfo',
		type : 'GET',
		dataType : 'json',
		success : function (data) {
			$.each(data, function() {
				if (++cnt >5) {
					alert(cnt);
					return false;
				};
			    jQuery('#mainItem').find('ul').append('<li id="MultiWatchPgItem'+cnt+'" class="MultiWatchPgItem"> <div class="imgArea"><img src="' +this.productImgURL+ '" alt="" class="productImg"></div><div class="productInfoArea"><div class="productEndTime">방송 혜택 종료까지 </div><div class="productName"></div><div class="productPrice">최대 혜택가</div></div><div><img src="img/moviefocus.PNG" alt="" id="productImg'+cnt+ '" class="focusImg multiWatchPgElem"></div></li>');
				$(MultiWatchPgItem[cnt]).css('background-color',color[cnt]);
			});					
//					jQuery('#input').val(data);
		}
	});	
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

