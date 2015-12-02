var canvas = document.getElementById("ball");
var cxt = canvas.getContext("2d");
var cxt2 = canvas.getContext("2d");
var cxt3 = canvas.getContext("2d");
var r=20;
var maxNum=9;
var ballArray=new Array();
var gamestart = true;
var maxX=canvas.width;
var maxY=canvas.height;
			function getRandomColor(){
  				return (function(m,s,c){
    					return (c ? arguments.callee(m,s,c-1) : '#')  + s[m.floor(m.random() * 16)]
  				})(Math,'0123456789abcde',5)
 			}
 			function getRandomNumber(min, max) {
            			return (min + Math.floor(Math.random() * (max - min + 1)))
       			 }
			for(var n=0;n<maxNum;n++){
				var x={
					x:getRandomNumber(r, maxX-r),
					y:getRandomNumber(r, maxY-r),
					r:r,
					vX:getRandomNumber(0.5, 1)*15,
					 vY:getRandomNumber(0.5,1)*15,
					color:getRandomColor(),
				}
				ballArray.push(x);
			}
			
 			function drawWall(){
 				//alert("test2");
 				cxt.fillStyle = "#000";
 				cxt.fillRect(0,0,canvas.width,canvas.height);
 			}
 			
 var p_ballX = 200;
var p_ballY = 300;
var p_ballR = 25;
		      	function drawp_ball(){
		        		cxt2.fillStyle = "white";
		        		cxt2.beginPath();
		        		cxt2.arc(p_ballX,p_ballY,p_ballR,0,2*Math.PI);
		        		cxt2.closePath();
		        		cxt2.fill();
		      	}
		     	var p_unit_x = 10;
		      	var p_unit_y = 10;
		      	function btn_up(){
		       		move_p_ball(0,-p_unit_y);
		      	}
		      	function btn_down(){
		        		move_p_ball(0,p_unit_y);
		      	}
		      	function btn_right(){
		       		 move_p_ball(p_unit_x,0);
		      	}
		      	function btn_left(){
		        		move_p_ball(-p_unit_x,0);
		      	}
      			function move_p_ball(unit_x,unit_y){
				
					if(gamestart == true){
							p_ballX = p_ballX + unit_x;
						if(p_ballX <= r){
								p_ballX = r
						}else if(p_ballX >= maxX-r){
								p_ballX = maxX-r;
						}
						p_ballY = p_ballY + unit_y;
						if(p_ballY <= r){
								p_ballY = r
							 }else if(p_ballY >= maxY-r){
								p_ballY = maxY-r;
						}
							 drawp_ball();
					}
        				//cxt.clearRect(p_ballX - p_ballR,p_ballY - p_ballR,p_ballR*2,p_ballR*2);
          			
      			}
      			var life
 			function drawBall(){
 				//alert("test3");
				if(gamestart == true){
					drawWall();
					drawp_ball();
					for (i in ballArray){
						var x=i;		
						ballArray[i].x+=ballArray[i].vX;
						ballArray[i].y+=ballArray[i].vY;
						
						if(ballArray[i].x>=maxX-r){
							ballArray[i].x=maxX-r;
							ballArray[i].vX=-ballArray[i].vX;
						}
						if(ballArray[i].x<=r){
							ballArray[i].x=r;
							ballArray[i].vX=-ballArray[i].vX;
						}			
						if(ballArray[i].y>=maxY-r){
							ballArray[i].y=maxY-r;
							ballArray[i].vY=-ballArray[i].vY;
						}
						if(ballArray[i].y<=r){
							ballArray[i].y=r;
							ballArray[i].vY=-	ballArray[i].vY;
						}
						for(var j=0;j<maxNum;j++)
							if(j!==x){
								if(Math.round(Math.pow(ballArray[x].x-ballArray[j].x,2)+
									Math.pow(ballArray[x].y-ballArray[j].y,2)) <= 
									 Math.round(Math.pow(r+r,2)))	                         	                    
								{
													
									var tempX=ballArray[x].vX;
									var tempY=ballArray[x].vY;
									 ballArray[x].vX=ballArray[j].vX;
									 ballArray[j].vX=tempX;
									ballArray[x].vY=ballArray[j].vY;
									ballArray[j].vY=tempY;
								}
							}
						for(var k = 0;k<maxNum;k++){
							if(Math.round(Math.pow(ballArray[k].x-p_ballX,2) + 
								Math.pow(ballArray[k].y-p_ballY,2)) <= Math.round(Math.pow(p_ballR+r,2))){
								//alert("you lose!!!!");
								cxt3.font="100px Arial";
								cxt3.fillStyle="#FF0000";
								cxt3.fillText("You Lose!!!",250,600);
								gamestart = false;
								continue;
							}
						}
						cxt.beginPath();		
						cxt.fillStyle=ballArray[i].color;
							//drawp_ball();	
						cxt.arc(ballArray[i].x,ballArray[i].y,ballArray[i].r,0,Math.PI*2,true);
						cxt.closePath();
						cxt.fill();
					}
					setTimeout(function(){drawBall();},1);
				}
				
 				
 			}
			
			
			
			function handleOrientation(event) {
			  var x = event.beta;  // In degree in the range [-180,180]
			  var y = event.gamma; // In degree in the range [-90,90]

			
			  if(x > 20){
				//p_ballY = p_ballY + 5;
				move_p_ball(0,10);
				//drawp_ball();
			  }
			  if(x < -3){
				//p_ballY = p_ballY - 5;
				move_p_ball(0,-10);
				//drawp_ball();
			  }
			  if(y >10){
				//p_ballX = p_ballX + 5;
				move_p_ball(10,0);
				//drawp_ball();
			  }
			  if(y < -5){
				//p_ballX = p_ballX - 5;
				move_p_ball(-10,0);
				
			  }

			  // Because we don't want to have the device upside down
			  // We constrain the x value to the range [-90,90]
			  if (x >  90) { x =  90};
			  if (x < -90) { x = -90};

			  // To make computation easier we shift the range of 
			  // x and y to [0,180]
			  x += 90;
			  y += 90;
			  
			  
			  
			}
			function reload(){
				location.reload();
			}
 			window.addEventListener('deviceorientation', handleOrientation);
 			drawWall();
 			drawBall();