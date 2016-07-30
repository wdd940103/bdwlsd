//去重复


function games(box){
	this.box=box;
	this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.letterArr=[];
	this.num=5;
	this.speed=4;
	this.leve=1;
	this.score=0;
	this.pass=1;
	this.life=5;
	this.cw=document.documentElement.clientWidth;
    this.ch=document.documentElement.clientHeight;
	// this.getLetter(this.num);
	// this.play();
	// this.key();
}
games.prototype.getLetter=function(num){//获取指定数量的字母
	var that=this;

	//判断是否重复
	function check(abc){
		for (var i = 0; i < that.letterArr.length; i++) {
			if(that.letterArr[i]==abc){
				return true;
			}
		}
	}


 for (var i = 0; i < num; i++) {
 	var img=document.createElement("img");
	var abc=this.letter[Math.floor(Math.random()*this.letter.length)];
	while(check(abc)){
		abc=this.letter[Math.floor(Math.random()*this.letter.length)];
	}
	
	img.className=abc;
	img.src="images/"+abc+".png";
	img.style.cssText="width:80px;position:absolute;left:"+(Math.random()*(this.cw-150)+50)+"px;top:"+(-200*Math.random()-50)+"px";
	// (-200*Math.random()-50)
	this.box.appendChild(img);
	this.letterArr.push(abc);	
 }	
}
games.prototype.play=function(){
	var that=this;
	function move(){
	 	if(that.num>that.letterArr.length){
	 		that.getLetter(that.num-that.letterArr.length);
	 	}
	 	
	 	var letters=document.getElementsByTagName("img");
		for (var i = 0; i < letters.length; i++) {
			var tops=letters[i].offsetTop;

			letters[i].style.top=tops+that.speed+"px";
			if(tops>that.ch-230){
				var cn=letters[i].className;			
				for(var j=0;j<that.letterArr.length;j++){
					if(that.letterArr[j]==cn){
						that.letterArr.splice(j,1);
					}				
				}
				that.box.removeChild(letters[i]);



			//游戏结束
				that.score--;
				that.life--;
				if(that.life<=0){
					$(".end").show();
					clearInterval(t);
					var endletter=document.getElementsByTagName("img");
               
					for(var a=0;a<6;a++){
						that.box.removeChild(endletter[0]);
						that.letterArr.splice(0,1);
						console.log(that.letterArr)
					}
				}else if(that.score<0){
						$(".end").show();
						clearInterval(t);
						var endletter=document.getElementsByTagName("img");
						for(var a=0;a<6;a++){
						that.box.removeChild(endletter[0]);
						that.letterArr.splice(0,1);
						console.log(that.letterArr)
					}
					}
				$(".fenshus p").eq(3).text("生命:"+that.life);
				$(".fenshus p").eq(1).text("分数:"+that.score);




				letters[i]=null;
			}
		}
	 }
    var t=setInterval(move,50);

    //游戏结束
    var stop=document.getElementsByClassName("stop")[0];
	var stop2=document.getElementsByClassName("stop2")[0];
	stop.onclick=function(){
		clearInterval(t);
		stop.style.display="none";
		stop2.style.display="block";
	}
	stop2.onclick=function(){
		t=setInterval(move,50);
		stop2.style.display="none";
		stop.style.display="block";
	}


 	this.key();

}
games.prototype.key=function(){
	var that=this;
	document.onkeydown=function(e){
		var ev=e||window.event;
		var k=String.fromCharCode(ev.keyCode);
		var now=that.box.getElementsByClassName(""+k+"");
		for (var i = 0; i < now.length; i++) {
			if(now.length>0){
				that.box.removeChild(now[i]);


				that.score++;
				if(that.score%20==0){
					that.leve++;
					that.pass++;
					that.speed++;
				}
				$(".fenshus p").eq(1).text("分数:"+that.score);
				$(".fenshus p").eq(0).text("等级:"+that.leve);
				$(".fenshus p").eq(2).text("关卡:"+that.pass);


			}
		}		
		for (var i = 0; i < that.letterArr.length; i++) {
			if(that.letterArr[i]==k){
				that.letterArr.splice(i,1);
			}
		}
	}
}