/*
 * 总调用函数
 */
function main() {
	draw1();
	rectangular();
	triangle();
	faceSmiley();
	triangle2();
	myMap();
	drawArc();
	mydialogbox();
	myheart();
}
/*
 * 重叠的矩形
 */
function draw1() //300px*150px
{
	var canvas = document.getElementById('canvas1');
	if(canvas.getContext) {
		var ctx = canvas.getContext('2d');

		//一个长方形
		ctx.fillStyle = "rgb(200,0,0)"; //风格
		ctx.fillRect(10, 10, 55, 40); //绘图 x,y(位置) w,h（大小）
		//另一个长方形
		ctx.fillStyle = "rgba(0,250,0,0.5)";
		ctx.fillRect(35, 35, 55, 40);
	}
}

/*
 * 绘制矩形
 */
function rectangular() {
	var canvas = document.getElementById('canvas2');
	if(canvas.getContext) {
		var ctx = canvas.getContext('2d');

		ctx.fillStyle = "#FF9456";

		//三种矩形画法
		ctx.fillRect(10, 10, 180, 180); //填充矩形
		ctx.clearRect(25, 25, 150, 150); //清除矩形区域
		ctx.strokeRect(30, 30, 140, 140); //画矩形框
	}
}

/*
 * 绘制三角形
 */
function triangle() {
	var canvas = document.getElementById('canvas3');
	if(canvas.getContext) {
		var ctx = canvas.getContext('2d');

		ctx.beginPath(); //开始绘制路径
		ctx.moveTo(60, 30); //开始点
		ctx.lineTo(40, 40); //向坐标画线
		ctx.lineTo(80, 40);
		ctx.closePath(); //闭合路径 非必需
		ctx.fillStyle = "darkcyan";
		ctx.fill();
	}
}

/*
 * 绘制笑脸
 * 不连续的路径
 */
function faceSmiley() {
	var canvas = document.getElementById('canvas4');
	if(canvas.getContext) {
		var ctx = canvas.getContext('2d');

		ctx.beginPath();
		ctx.arc(75, 75, 50, 0, Math.PI * 2, true); //画脸
		ctx.moveTo(110, 75);
		ctx.arc(75, 75, 35, 0, Math.PI, false); //画嘴
		ctx.moveTo(65, 65);
		ctx.arc(60, 65, 5, 0, Math.PI * 2, true); //左眼
		ctx.moveTo(95, 65);
		ctx.arc(90, 65, 5, 0, Math.PI * 2, true); //右眼
		ctx.strokeStyle = "cadetblue";
		ctx.stroke();

	}
}

/*
 * 绘制直线
 * 以“两个三角形”为例
 */
function triangle2() {
	var canvas = document.getElementById('canvas5');
	if(canvas.getContext) {
		var ctx = canvas.getContext('2d');

		//实心三角形
		ctx.beginPath();
		ctx.moveTo(25, 25);
		ctx.lineTo(125, 25);
		ctx.lineTo(25, 125);
		ctx.fillStyle = "palevioletred";
		ctx.fill();

		//空心三角形
		ctx.beginPath();
		ctx.moveTo(175, 25);
		ctx.lineTo(275, 25);
		ctx.lineTo(275, 125);
		ctx.closePath();
		ctx.strokeStyle = "gold";
		ctx.stroke();
	}
}

/*
 * 生成一个地图
 * 宽：390，高：290
 * 围墙宽：5 隔板宽：10 隔板长：200
 * 道路宽：48 圆形半径：24-7=17
 */
function myMap() {
	var ctx = document.getElementById("canvas6").getContext("2d");
	//绘制主地图
	ctx.fillStyle = "#DEB887";
	ctx.fillRect(5, 5, 390, 290);
	//构建移动区域
	for(y = 10; y < 290; y += 58) {
		ctx.clearRect(10, y, 380, 48);
	}
	//绘制通道
	for(y = 58; y < 290; y += 58 * 2) {
		ctx.clearRect(310, y, 80, 10);
	}
	for(y = 58 * 2; y < 290; y += 58 * 2) {
		ctx.clearRect(10, y, 80, 10);
	}
	//绘制出发点
	ctx.beginPath();
	ctx.arc(34, 34, 27 - 7, 0, Math.PI * 2, true);
	ctx.fillStyle = "darkcyan";
	ctx.fill();
	ctx.fillStyle = "ghostwhite";
}

/*
 * 绘制圆弧
 */
function drawArc() {
	var ctx = document.getElementById("canvas7").getContext("2d");
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 3; j++) {
			ctx.beginPath();
			var x = 30 + j * 60;
			var y = 30 + i * 60;
			var radius = 25;
			var startAngle = 0;
			var endAngle = Math.PI + (Math.PI * j) / 2;
			var anticlockwise = i % 2 == 0 ? false : true;

			ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

			if(i > 1) {
				ctx.fillStyle = "darkcyan";
				ctx.fill();
			} else {
				ctx.strokeStyle = "darkgreen";
				ctx.stroke();
			}
		}

	}
}

function mydialogbox() {
	var canvas = document.getElementById('canvas8');
	if(canvas.getContext) {
		var ctx = canvas.getContext('2d');

		//利用贝塞尔曲线绘制对话框
		ctx.beginPath();
		ctx.moveTo(75, 25);
		ctx.quadraticCurveTo(25, 25, 25, 62.5);
		ctx.quadraticCurveTo(25, 100, 50, 100);
		ctx.quadraticCurveTo(50, 120, 30, 125);
		ctx.quadraticCurveTo(60, 120, 65, 100);
		ctx.quadraticCurveTo(125, 100, 150, 62.5);
		ctx.quadraticCurveTo(125, 25, 75, 25);
		ctx.stroke();
	} else {

	}
}

function myheart()
{
	var canvas = document.getElementById('canvas8');
	    if(canvas.getContext) 
	    {
	        var ctx = canvas.getContext('2d');
	        ctx.beginPath();
	        ctx.bezierCurveTo(150+75,37,150+70,25,150+50,25);
	        ctx.bezierCurveTo(150+20,25,150+20,62.5,150+20,62.5);
	        ctx.bezierCurveTo(150+20,80,150+40,102,150+75,120);
	        ctx.bezierCurveTo(150+110,102,150+130,80,150+130,62.5);
	        ctx.bezierCurveTo(150+130,62.5,150+130,25,150+100,25);
	        ctx.bezierCurveTo(150+85,25,150+75,37,150+75,40);
	        ctx.fillStyle = "palevioletred";
	        ctx.fill();
	    }
}
