


/*
 * 创建弹动的球类
 * 参数依次是  球心 x  y坐标  半径  ，x坐标速度 ，y坐标速度，画笔 
 * 
 * */
function Ball(index,x,y,r,xs,ys,color){
	this.index = index;			//
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
	
		
		
		var obj = getBollxy()			//求出玩家球的坐标
		//玩家控制球的坐标
		var px = obj.x;
		var py = obj.y;
		//该球与玩家球之间的距离
		var dis = zhuima.getDis(px,py,this.x,this.y);
//		console.log(dis);	
		//当玩家球与这个小球相撞
		if(dis <=this.r+pbr){
			//console.log(dis);
			return -1;
		}
		
		
		
		
		//判断边界小球是不是到达边界
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
	 	
	 	
	 	
		
		//算出此次球心坐标
	 	this.x =this.x+ this.xs ;
	 	this.y = this.y + this.ys;
	 	
	 	//console.log(this.x,this.y);
	 	this.drawBall();	//画球
}






