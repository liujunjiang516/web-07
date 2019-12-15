
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
var word = document.getElementById("word");
word.style.left = "950px";
var box = document.getElementById("box");
var sider = document.getElementById("slider");
var left = document.getElementById("left");
var right = document.getElementById("right");
var navList = document.getElementById("nav").children;
var index = 1;
var isMoving = false;
function before(){
	if(!isMoving){
		isMoving = true;
		navList[index - 1].removeAttribute("class"); 
		index--;
		if(index === 6){
			var x = 1;
		}else if(index === 0){
			var x = 5;
		}else{
			var x = index;
		}
		navList[x - 1].setAttribute("class","active");
		animate(slider,{left:-1200*index},function(){
			if(index === 0){
				slider.style.left = "-6000px";
				index = 5;
			}
			isMoving = false;
		});
	}
}
function next(){
	if(!isMoving){
		isMoving = true;
		navList[index - 1].removeAttribute("class"); 
		index++;
		if(index === 6){
			var x = 1;
		}else if(index === 0){
			var x = 5;
		}else{
			var x = index;
		}
		navList[x - 1].setAttribute("class","active");
		animate(slider,{left:-1200*index},function(){
			if(index === 6){
				slider.style.left = "-1200px";
				index = 1;
			}
			isMoving = false;
		});
	}
}
var timer = setInterval(next, 3000);
box.onmouseover = function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}
box.onmouseout = function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer = setInterval(next,3000);
}
left.onclick = before;
right.onclick = next;
for(var i = 1;i < navList.length + 1;i++){
	navList[i - 1].x = i;
	navList[i - 1].onclick = function(){
		navList[index - 1].removeAttribute("class");
		index = this.x;
		animate(slider,{left:-1200*index});
		this.setAttribute("class","active");
	}; 
}
setInterval(function(){ 
	if( word.style.left == "-475px"){
		word.style.left = "950px";
	}else{
		var t = parseInt(word.style.left) - 5;
		word.style.left = t + "px";
	}
} , 100);
