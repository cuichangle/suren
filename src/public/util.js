const formatTime = function(t){
		var timer
		if(t.indexOf('/')!=-1){
			timer = new Date(t).getTime()
		}else{
			timer = t
		}
	
	var timeSpanStr,timespan;
	if(String(timer).length == 10){
		timespan = timer * 1000
	}else{
		timespan = timer
	}
	 var dateTime = new Date(timespan);
	  var year = dateTime.getFullYear();
	  var month = dateTime.getMonth() + 1;
	  var day = dateTime.getDate();
	  var hour = dateTime.getHours();
	  var minute = dateTime.getMinutes();
	  var second = dateTime.getSeconds();
	  var now = new Date();
	

	  var milliseconds = 0;
	  
	
	  milliseconds = now - timespan;
	
	  if (milliseconds <= 1000 * 60 * 1) {
	    timeSpanStr = '刚刚';
	  }
	  else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
	    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
	  }
	  else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
	    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
	  }
	  else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
	    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
	  }
	  else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
	    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
	  } else {
	    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
	  }
	  return timeSpanStr;
}
const date = function(timer,houres){
	var timeSpanStr,timespan;
	if(String(timer).length == 10){
		timespan = timer * 1000
	}else{
		timespan = timer
	}
	var dateTime = new Date(timespan);
	var year = dateTime.getFullYear();
	 var month = dateTime.getMonth() + 1;
	 var day = dateTime.getDate();
	 var hour = dateTime.getHours()<10 ? '0'+ dateTime.getHours() : dateTime.getHours();
	 var minute = dateTime.getMinutes() <10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes();
	 if(houres === 'houres'){
		 if(hour == '0' && minute == '00'){
			 return 
		 }else{
			 return hour + " : " + minute
		 }
	 }else{
		 return year + '年' + month + '月' + day+'日'
	 }
	
}
export default {
	formatTime,
	date
}
