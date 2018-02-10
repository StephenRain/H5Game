


/*
 * 创建弹动的球类
 * 参数依次是  球心 x  y坐标  半径  ，x坐标速度 ，y坐标速度，画笔 
 * 
 * */
function Ball(index,x,y,r,xs,ys,color){
	this.index = index;
	this.x=x;
	this.y=y;
	this.r=r;
	this.xs = xs;
	this.ys = ys;
	this.color = color;
}
/*给球类中添加方法：
 	画一个球
 * */
Ball.prototype.drawBall=function(){
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.fillStyle=this.color;
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
		ctx.fill();
}


/*球类中添加改变球圆心坐标的方法
 */
Ball.prototype.move=function(){
		
		this.drawBall();	//画球
		
		var obj = getBollxy()			//求出玩家球的坐标
		//玩家控制球的坐标
		var px = obj.x;
		var py = obj.y;
		//该球与玩家球之间的距离
		var dis = zhuima.getDis(px,py,this.x,this.y);
//		console.log(dis);	
		//当玩家球与这个小球相撞
		if(dis <=this.r + pbr){
			console.log(dis);
			return -1;
		}
		
		//拿当前球的坐标依次和其他球算距离
		for(var i = 0; i< bollArr.length;i++){
			if(i ==this.index){
				continue;
			}
			
			//获取当前球心坐标和其他球心之间距离
			var d = zhuima.getDis(this.x,this.y,bollArr[i].x,bollArr[i].y);
			var enterDis = d-(this.r + bollArr[i].r);					//球表面之间的距离
			 
			if( enterDis <= -3){
				var tgb = bollArr[i];
					//当相撞时，让该球的坐标往回跑设定，避免一个球进入里一个球内
					var a = ((Math.abs(this.xs))/this.xs)*enterDis;
					var b = ((Math.abs(this.ys))/this.ys)*enterDis;
					console.log(a,b);
					this.x +=  a;
				 	this.y += b;
				 	//两个小球真正的速度
				 	/*var xspeed = this.xs / sec;
				 	var yspeed = this.ys /sec ;
				 	var tgxsp = tgb.xs / sec ;
				 	var tgysp = tgb.ys /sec;*/
				 	
				 	//两个小球速度差
				 /*	var xsc = Math.abs(xspeed - tgxsp); 
				 	var ysc = Math.abs(yspeed -tgysp );*/
				 	//两个小球坐标差
				 	/*var xc = Math.abs(this.x - tgb.x);
				 	var yc = Math.abs(this.y - tgb.y);
					//进入的距离
					var eds = Math.ceil(-enterDis);
					//进入的时间
					var entime1 =  (xc+0.01)*eds /(d * (xsc+0.01));
					console.log("进入时间",entime1);*/
					
					//当时间计算错误，就按照
//					if(entime1 >= sec && entime1 < 2*sec){
//						console.log("错误时间1：",entime1);
//						entime1 = sec / 2;
//					}else if(entime1 >= sec*2){
//						console.log("错误时间2：",entime1);
//						entime1 = Math.sqrt(sec);
//					}else if(entime1 > sec * 3){
//						console.log("错误时间3：",entime1);
//						this.x += this.r; 
//						this.y +=this.r;
//					}
					/*var tx ,ty,bx,by;
					for(var j = 1 ; j< sec;j=j+3){
						 tx = this.x - xspeed*j ;
						 ty = this.y - yspeed*j;
						 bx = tgb.x -tgxsp*j;
						 by = tgb.y - tgysp*j;
						var bb = parseFloat((zhuima.getDis(tx,ty,bx,by)).toFixed(2));
						var bbs = bb - (this.r + tgb.r);
						console.log("最后球面相距",bbs);
						if( bbs<=8 && bbs>=-8){
							
							this.x = tx;
							this.y = ty;
							tgb.x = bx;
							tgb.y = by;
							console.log("找到合适的点");
							break;
						}else {
							console.log("没找到合适的点");
						}
					}*/
					
					
					

					/*if(entime1 >sec ){
						entime1 = sec/4;
					}*/
					//保留两位有效数字
					/*entime1 = parseFloat(entime1.toFixed(2));
					console.log("保留2位数字",entime1);*/
					//var entime2 = yc*eds /(d * ysc);
					
					//console.log(entime1,entime2);
					
					
					/*this.x -= xspeed *entime1;
					this.y -= yspeed *entime1;
					tgb.x -= tgb.xs *entime1;
					tgb.y -= tgb.ys *entime1;*/
					
					//var zuidis = zhuima.getDis(this.x,this.y,tgb.x,tgb.y) - (this.r + tgb.r);
					//console.log(zuidis);
					
					
				
				//交换x方向速度
				/*var tempx = this.xs;
				this.xs = bollArr[i].xs;
				bollArr[i].xs = tempx;
				//交换y方向速度
				var tempy = this.ys;
				this.ys = bollArr[i].ys;
				bollArr[i].ys = tempy;*/
				
				//速度交换系数s
				var sb = parseFloat(((bollArr[i].r/this.r)*(bollArr[i].r/this.r)).toFixed(2));
				console.log("速度交换系数",sb);
				//交换x方向速度
				var tempx = this.xs;
				
				this.xs =  parseFloat((sb*bollArr[i].xs).toFixed(2));
				
				bollArr[i].xs =  parseFloat((tempx/sb).toFixed(2));
				//交换y方向速度
				var tempy = this.ys;
				
				this.ys = parseFloat((sb*bollArr[i].ys).toFixed(2));
				bollArr[i].ys = parseFloat((tempy/sb).toFixed(2));
				
				break;
				
			}else if(enterDis >= -3 && enterDis <= 3){
				//速度交换系数s
				var sb = parseFloat(((bollArr[i].r/this.r)*(bollArr[i].r/this.r)).toFixed(2));
				console.log("速度交换系数",sb);
				//交换x方向速度
				var tempx = this.xs;
				
				this.xs =  parseFloat((sb*bollArr[i].xs).toFixed(2));
				
				bollArr[i].xs =  parseFloat((tempx/sb).toFixed(2));
				//交换y方向速度
				var tempy = this.ys;
				
				this.ys = parseFloat((sb*bollArr[i].ys).toFixed(2));
				bollArr[i].ys = parseFloat((tempy/sb).toFixed(2));
				break;
			}
			
		}
		
	  	//console.log(111);
	  	/* if(this.x<=this.r || this.x >= canWidth-this.r){
	 		this.xs=-this.xs;
		 } 
	 	
	 
	 	if(this.y<=this.r ||this.y>=canHeight-this.r){
	 		this.ys=-this.ys;
		 }*/
		
		if(this.x<=this.r){
			this.x = this.r;
			this.xs = -this.xs;
		}else if(this.x >= canWidth-this.r){
			this.x = canWidth-this.r;
			this.xs = -this.xs;
		}
		
		if(this.y <=this.r){
			this.y = this.r;
			this.ys = -this.ys;
		}else if(this.y>=canHeight-this.r){
			this.y = canHeight-this.r;
			this.ys = -this.ys;
		}
	 	
	 	
	 	
		
		
	 	this.x =this.x+ this.xs ;
	 	this.y = this.y + this.ys;
	 	//console.log(this.x,this.y);
	 	
}






