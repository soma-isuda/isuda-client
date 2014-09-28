var firstcategoryarr=[];
var secondcategoryarr=[];
$(document).ready(function(){
	jQuery.ajax({
		url : 'http://172.16.100.171:3000/getFirstCategory',
		type : 'GET',
		dataType : 'json',
		success : function (data) {
			$.each(data, function() {
				firstcategoryarr.push(this.name);
			});					
		}
	});			
	jQuery.ajax({
		url : 'http://172.16.100.171:3000/getSecondCategory',
		type : 'GET',
		dataType : 'json',
		success : function (data) {
			var temparr = new Array(firstcategoryarr.length);
			$.each(data, function() {
				temparr[this.firstId].push(this.name)
			});	
			secondcategoryarr = temparr;				
		}
	});	
});

