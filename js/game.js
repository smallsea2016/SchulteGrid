window.onload = function(){
	function $(el){
		return	document.querySelector(el)
	}
	var schulteGrid = {
		timeFn:function(){
			s++;
			s < 10 ? s = "0"+s : s;
			if (s > 59) {
				s = 0;
				m++;
				m < 10 ? m = "0"+m : m;
			};
			if (m > 59) {
				m = 0;
				h++;
				h < 10 ? h = "0"+h : h;
			};
			var r = h+':'+m+':'+s;	
			$('.clock').innerHTML = r;	
		},

		//生成25个随机数字
		creatRandomNumber:function(){
			var len = 25,
				arr = [],
				res = [];
			for (var i = 1; i <= len; i++) {
				arr.push(i);
			};
			var li = '';
			li += '<ul class="grid">';
			for (var i = 0, len = arr.length; i < len; i++) {
			  var j = Math.floor(Math.random() * arr.length);
			  res[i] = arr[j];
			  li += '<li class="item"><span class="circle">'+arr.splice(j, 1)+'</span></li>';
			}
			li += '</ul>';
			$('.game').innerHTML = li;
		},

		//选择方格
		selectGrid:function(){
			var lis = document.querySelectorAll('.grid .item');
			var number,previousNum,t,tap,isTouch = 'ontouchstart' in window;
			isTouch ? tap = "touchstart" : tap = "click";
			for (var i = 0; i < lis.length; i++) {
				(function(i){
					lis[i].addEventListener(tap,function(){
						var _this = this;
						for (var i = 0; i < lis.length; i++){
							lis[i].className = "";
						}
						number = _this.childNodes[0].innerHTML;

						if (number == 1 || number == (previousNum+1)) {
							_this.className = "active";
						}else{
							_this.className = "error";
							clearTimeout(t);
							t = setTimeout(function(){
								_this.className = "";
							},500)
						}
						if (_this.className == 'active') {
							previousNum = parseInt(_this.childNodes[0].innerHTML);
						}
						if(_this.className == 'active' && number == 25){
							if(typeof(Storage)!=="undefined"){
								localStorage.setItem("gameTime",$('.clock').innerHTML);
							}
							alert('你总共用时'+$('.clock').innerHTML);
							clearInterval(timer);
						};
					},false)
				})(i)
			};
		}			
	}
	
	//开始
	var h = 0, m = 0, s = 0;
	var timer;
	$('#start').onclick = function(){
		$('#des').style.display = 'none';
		this.setAttribute('disabled',true);
		$('#restart').removeAttribute('disabled');
		schulteGrid.creatRandomNumber()
		h < 10 ? h = "0"+h : h;
		m < 10 ? m = "0"+m : m;
		schulteGrid.selectGrid();
		timer = setInterval(schulteGrid.timeFn,10);
	}
	//重新开始
	$('#restart').onclick = function(){
		schulteGrid.creatRandomNumber();
		h = 0; m = 0; s = 0;
		h < 10 ? h = "0"+h : h;
		m < 10 ? m = "0"+m : m;
		schulteGrid.selectGrid();
		clearInterval(timer);
		timer = setInterval(schulteGrid.timeFn,10);
	}

	if(typeof(Storage)!=="undefined" && localStorage.getItem("gameTime") != null)
	{
	    alert('你上次的记录是：'+localStorage.gameTime+'\n祝你接下来好运！');
	}
}