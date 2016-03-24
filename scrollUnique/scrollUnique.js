//禁止子元素滚动时 父元素也跟着滚动插件
$.fn.scrollUnique = function() {
    return $(this).each(function() {
    	var _this = this;
    	
    	if (isPC()){
    		PC();
    	}else{
    		touch();
    	}


    	
    	function PC(){
    		var eventType = 'mousewheel';
	        // 火狐是DOMMouseScroll事件
	        if (document.mozHidden !== undefined) {
	            eventType = 'DOMMouseScroll';
	        }
	        $(_this).on(eventType, function(event) {
	            // 一些数据
	            var scrollTop = _this.scrollTop,
	                scrollHeight = _this.scrollHeight,
	                height = _this.clientHeight;
 
	            var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);        

	            if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
	                // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
	                _this.scrollTop = delta > 0? 0: scrollHeight;
	                // 向上滚 || 向下滚event.preventDefault();
	                event.preventDefault();
	            }
	        });
    	}

    	function touch(){
    		var x=0, y=0;
			$(_this).on("touchstart", function(){

				x = event.changedTouches[0].pageX;
				y = event.changedTouches[0].pageY;

			}).on("touchmove", function(){

				var currentX = event.changedTouches[0].pageX,
					currentY = event.changedTouches[0].pageY;

				var detail = currentY - y > 0 ? -1 : 1;

				var scrollTop = _this.scrollTop,
					clientHeight = _this.clientHeight,
					height = _this.scrollHeight;

				if ((detail > 0 && scrollTop + clientHeight + 1 >= height) || (detail < 0 && scrollTop <= 0) ){
					event.preventDefault();
				}

				
			})
    	}
        


        function isPC(){
		    var ua = navigator.userAgent;
		    var agent = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];   
		    for(var i=0; i<agent.length; i++){
		        if(ua.indexOf(agent[i])>0){
		            return false;
		        }
		    }
		    return true;
		}
		
    });	


};