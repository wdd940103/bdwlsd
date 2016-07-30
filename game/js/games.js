function games(obj){
	this.obj=obj;
	this.letter=this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.letterArr=[];
	this.speed=3;//速度
	this.num=4;	//窗口图片的数量
	this.cw=document.documentElement.clientWidth;
	this.ch=document.documentElement.clientHeight;
	this.start(4);//访问start方法
	this.play();
}
games.prototype.start=function(num){
	for (var i = 0; i < num; i++) {//在浏览器中创建num个图片
	var img=document.createElement("img");//创建img标签
	var index=this.letter[Math.floor(Math.random()*this.letter.length)];//随机获取letter数组中的字母
	img.className=index;//为每个图片设置类名
	img.src="images/"+index+".png";	
	img.style.cssText="width:70px;position:absolute;left:"+(Math.random()*(this.cw-150)+50)+"px;top:"+(-200*Math.random()-50)+"px";
	//为每个图片设置绝对定位属性及随机位置
		this.obj.appendChild(img);//将这张图片插入到盒子中
		this.letterArr.push(index);//将该图片对应的类名保存到letterArr中，便于后边判断盒子中图片的数量
	}
	
	
}
games.prototype.play=function(){
	var that=this;
	function move(){
		that.start(that.num-that.letterArr.length);//当窗口中的图片减少是再次访问start方法，添加图片使数量保持在num内
		var imgs=document.getElementsByTagName("img");//获取当前窗口图片的标签名
		for (var i = 0; i < that.num; i++) {//以一定的速度不断地改变图片的top值
			var tops=imgs[i].offsetTop;
			imgs[i].style.top=tops+that.speed+"px";
			if(tops>=that.ch-200){//当top值超过浏览器的高度时消除
				var imgcs=imgs[i].className;
				for (var j = 0; j < that.letterArr.length; j++) {
					if(that.letterArr[j]==imgcs){
						that.letterArr.splice(j,1)
					}
					
				}
				that.obj.removeChild(imgs[i]);
			}
		}
	}
	setInterval(move,50);
	that.key();
}
games.prototype.key=function(){
	var that=this;
	document.onkeydown=function(e){
		var ev=e||window.event;
		var k=String.fromCharCode(ev.keyCode);//获取当前按下的键盘码
		var now=document.getElementsByClassName(""+k+"");
		for (var i = 0; i < now.length; i++) {
			if(now.length>0){
				that.obj.removeChild(now[i])
			}
		}
		for (var i = 0; i < that.letterArr.length; i++) {
			if(that.letterArr[i]==k){
				that.letterArr.splice(i,1);
			}
		}
	}
}