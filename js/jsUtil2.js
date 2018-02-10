/**
 * @author zhuima
 * @version v2.0
 * 这是一个常用的方法库
 * 封装了一些常用的方法
 * 	思路：
 * 		首先创建一个对象，在该对象的属性中申明方法。。。
 * */

var zhuima = {
	
	 
	/*
	 * 获取当前时间的方法，返回封装时间数据的对象。
	 */
	getNowTime : function(){
		//1、创建日期对象
		var date = new Date();
		//获取当前的年月日等时间
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		var h = date.getHours();//小时
		var min = date.getMinutes();//分钟
		var s = date.getSeconds();//秒
		//将数据封装到一个对象中
		var obj = {
			y:y,
			m:m,
			d:d,
			h:h,
			min:min,
			s:s
		};
		return obj;
	},
	
	/*
	 * 获取两个数之间的随机数
	 */
	getRandomNum : function(min,max){
		return Math.round(Math.random()*(max-min)+min);
		
	},
	/**
	 * 求任意数字之和
	 */
	getSum: function(){
		var sum = 0;
		for(var i = 0; i<arguments.length;i++){
			sum += arguments[i]; 
		}
		return sum;
	},
	
	/*
	 * 替换一个字符串中指定的字符
	 * 该方法适用于将包含旧字符串的新字符串来替换旧字符串，因为会造成死循环
	 * */
	replaceAll: function(str,oldStr,newStr){
		while(str.indexOf(oldStr)!==-1){
			//进行替换
			str = str.replace(oldStr,newStr);
		}
		return str;
	},
	
	/*将字符串提取其中的数字，可用来将像素(px)字符串转换为数字
	 */
	parseFloat : function(str,old){
		var s = zhuima.replaceAll(str,old,"");
		return parseFloat(s);		//此处的parseFloat调用的是原生的js中的方法
	},
	
	/**
	 * 功能：  把序列化的字符串（a=23&b=89）转换成一个对象；
		参数：  接受的是一个序列化的字符串
		返回：  返回一个对象；
	 */
	dealStr:function (href){
		var arr=href.split('&');
		// console.log(arr);
		/*
			
			创建一个空对象，然后，在循环的时候，给对象添加属性

		*/
		var empty={};//这个对象是要存放这些数据的；
		for(var i=0;i<arr.length;i++){
			var newArr=arr[i].split('=');
			// console.log(newArr);
			empty[newArr[0]]=newArr[1];
		}
		// console.log(empty);
		return empty;
	},
	
	/**
	 * 通过ID获取对象或者通过类名获取，还有【某节点对象】
	 * 
	 * */
	$:function(str,dom){
		var node = null;
		//1.通过Id名字获取
		if(str[0] ==="#"){
			str = str.slice(1);
			node = document.getElementById(str);
		//通过Classname
		}else if(str[0]==="."){
			str = str.slice(1);
			//判断有没有节点对象
			if(dom){
		 	node = dom.getElementsByClassName(str);
			}else{
				node = document.getElementsByClassName(str);
			}
			//通过标签名
		}else{
			if(dom){
				node = dom.getElementsByTagName(str);
			}else{
				node = document.getElementsByTagName(str);
			}
		}
		return node;
		
	},
	/*求两点之间的距离
	 */
	getDis : function (x1,y1,x2,y2){
		//计算
		var res=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
		//返回
		return res;
	},
	
	  /**
		 * 分页代码的实现
		 * dom:要分页的地方的节点对象
		 * pageNums : 总页数
		 * nums:页面中显示的页面数
		 * 
	 	*/
	showPages : function (dom,pageNums,nums){
			var listr='<ul id = "fy-list"><li>上一页</li><li>首页</li>';
		// 循环创建页码
		for(var i=0;i<pageNums;i++){
			listr+='<li>'+(i+1)+'</li>';
		}
		// console.log(listr);
		listr+='<li>尾页</li><li>下一页</li></ul>';
		// console.log(listr);
		// 添加到ul中
		dom.innerHTML=listr;
		//获取所有的li元素
		var aLi=zhuima.$('li',dom);
			
			
			// 给指定的元素加类名
		function setClass(start,end,str){
			for(var i=start;i<=end;i++){
				aLi[i].className=str;
			}
		}
		// 页面跳转函数
		function showPage(iNow){
			iNowPage=iNow;
			//当前页前面的页数
			var leftNums = Math.floor((nums-1)/2); 
			//当前页后面的页数
			var rightNums = Math.ceil((nums-1)/2);
			// 请空所有元素的类名
				setClass(2,aLi.length-3,'');
				
				// 1.让选中的元素编程选中状态；
				aLi[iNow].className='active';
				// console.log(iNow);
				// 2.让当前选中的元素的的前三个和后四个保留下来
				// 让除过上述的元素添加off类名
				//当点击的页面靠前时
				if(iNow-leftNums<2){
					// 隐藏后边的；
					setClass(nums+2,aLi.length-3,'off');
				}else{
					//当点击的页面靠后面时
					if(iNow+4>aLi.length-3){
						//将前面的隐藏
						setClass(2,aLi.length-3-nums,'off');
					}else{
						// 完全在正常的 情况；
						setClass(2,iNow-leftNums-1,'off');
						setClass(iNow+rightNums+1,aLi.length-3,'off');
					}
				}
				
				//当点击第一页和最后一页隐藏首页上一页或者末尾页和下一页
				if(iNow==2){
					aLi[0].className="off";
					aLi[1].className="off";
				}else if(iNow == aLi.length-3){
					aLi[aLi.length-2].className="off";
					aLi[aLi.length-1].className="off";
				}else{
					aLi[0].className="";
					aLi[1].className="";
					aLi[aLi.length-2].className="";
					aLi[aLi.length-1].className="";
				}
				
				
				
				
		}
		// 页面加载的时候，默认显示第一个
		var iNowPage=2;
		showPage(2);
		// 给所有的页码加点击事件
		for(var j=2;j<=aLi.length-3;j++){
			// 没每个元素的索引记录下来
			aLi[j].index=j;
			aLi[j].onclick=function(){
				showPage(this.index);
			}	
		}
		// 给首页加点击事件
		aLi[1].onclick=function(){
			showPage(2);
		}
		// 给尾页加 点击事件
		aLi[aLi.length-2].onclick=function(){
			showPage(aLi.length-3);
		}
		// 给上一页加点击事件
		aLi[0].onclick=function(){
			iNowPage--;
			if(iNowPage<2){
				alert('已经是第一页了');
				return;
			}
			showPage(iNowPage);
		}
		// 给下一页加 点击事件
		aLi[aLi.length-1].onclick=function(){
			iNowPage++;
			if(iNowPage>(aLi.length-3)){
				alert('已经是最后一页了');
				return;
			}
			showPage(iNowPage);
		}
			
			
			
			
		},
		
		/*鼠标拖动效果的实现
		 * dom:拖动的元素对象
		 * x1:元素可拖动区域的左边边界x坐标
		 * x2:元素可拖动区域的右边界x坐标
		 * y1：元素可拖动区域的  上边边界
		 * y2:元素可拖动区域的的下边界。
		 *
		 */
		drag : function(dom,x1,x2,y1,y2){
			
			dom.onmousedown = function(e){
				//获取鼠标相对元素上边和左边框的位置
				var disx = e.clientX - this.offsetLeft;
				var disy = e.clientY - this.offsetTop;
				
				//鼠标移动事件
				document.onmousemove = function(e){
					//console.log(getBollxy());
					
					//获取元素的左边和上边的位置
					var px = e.clientX - disx;
					var py = e.clientY - disy;
					
					if(px<x1){
						px=x1;
					}
					if(px>x2-dom.offsetWidth){
						px=x2-dom.offsetWidth;
					}
					if(py<y1){
						py=y1;
					}
					if(py>y2-dom.offsetHeight){
						py=y2-dom.offsetHeight;
					}
					
					dom.style.left =px+"px";
					dom.style.top = py+"px";
				}
				//鼠标释放事件
				document.onmouseup = function(){
					
					document.onmousemove = null;
					document.onmouseup = null;
				}
			}
			
		},
		
		/* 清除拖拽效果
		 */
		clearDrag : function(dom){
			document.onmousemove = null;
			document.onmouseup = null;
			dom.onmousedown = null;
		},
		
		/* 获取Jquery对象的边框的宽度
		 * jNode : jquery 节点对象
		 *  borderStr : 可以是 border-width、border-right-width、border-left-width......
		 * 返回数值型的边框宽度
		 */
		borderWidth:function(jNode,borderStr){
			return zhuima.parseFloat(jNode.css(borderStr),'px');	
		},
		
		/*方法：
		 * 封装了实现当鼠标进入一片区域，区域内的一个元素中心跟着鼠标位置，但是元素不会超出
		 * 这片区域
		 * jtnode : 要操作的元素，需要是绝对定位
		 * jfnode : 活动区域元素，不能是定位。
		 * 这样的话，最好在html中jtnode不在jfnode中
		 */
		 followMouse : function(jtnode,jfnode){
		 	
		 	var jtwidth = jtnode.width();		//目标元素的宽
			var jtheight = jtnode.height();		//目标元素的高
			//获取jfnode的边框宽度 
			var border = zhuima.borderWidth(jfnode,'border-width');
			/*边界坐标*/
			var x1 = jfnode.offset().left + border;
			 
			var x2 = x1 + jfnode.width();
			 
			var y1 = jfnode.offset().top + border;
			 
			var y2 = y1+jfnode.height();
			/*鼠标坐标*/
			 $(document).mousemove(function(e){
			 	//console.log(111);
			 	var mx = e.clientX;
			 	var my = e.clientY;
			 	
			  	if(mx < x1 + jtwidth/2){
			  		mx = x1 + jtwidth/2;
			  	}else if(mx > x2 - jtwidth/2){
			  		mx = x2- jtwidth/2;
			  	}
			  	
			  	if(my < y1 + jtheight/2){
			  		my = y1 + jtheight/2;
			  	}else if(my > y2 - jtnode.height()/2){
			  		my = y2 - jtheight/2;
			  	}
			  
			 	jtnode.css({
			 		left:mx - jtwidth/2,
			 		top:my  - jtheight/2
			 	});
			 	
			 });
		 	
		 },
		 
		 
		
		
		/*动画函数的简单封装
		 * dom:操作的节点对象
		 * attr:操作的属性
		 * start:开始的属性值
		 * end：最后的属性值
		 * speed:速度
		 * fn：传入的函数
		 */
		fnMove : function(dom,attr,start,end,speed,fn){
			if(start == end){
				return;
			}else{
				var timer = setInterval(function(){
					if(start<end){
						start += speed;
						if(start >end){
							clearInterval(timer);
							start =end;
							fn&&fn();
						}
						 
					}else{
						start -= speed;
						if(start <end){
							clearInterval(timer);
							start = end;
							fn&&fn();
						}
					}
					dom.style[attr] = start+'px';
					
				},30);
			}
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
}


