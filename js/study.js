document.write("Hello JS!<br />");

//更改标题
function fun1()
{
	var a=document.getElementById('a');
	a.innerHTML="Hello world!";
}

//更改图像源
function light()
{
	var b=document.getElementById('light1');
	if (b.src.match("off"))
	{
		b.src="photo/on.jpg";
	}
	else
	{
		b.src="photo/off.jpg";
	}
}

//更改标题颜色
function ChangeColor()
{
	var c=document.getElementById('a');
	c.style.color="#4CD964";
}

//显示确定框
function DialogBox()
{
	alert("This is a dialog box.");
}

//验证输入是否为数字
function IsNum()
{
	var d=document.getElementById('num').value;
	if(d == "" || isNaN(d))
	{
		alert("它不是数字");
	}
	else
	{
		alert("它是数字");
	}
}

//显示变量
function PrintValue()
{
	var value=document.getElementById("value").value;
	if(value != "")
	{
		document.getElementById("output").innerHTML=value;	
	}
	else
	{
		alert("内容为空，请重新输入");
	}
}

//显示数组
{
	var Name = new Array("Bob","Mary","Luke");
	document.write(Name);
}
//转换大小写
{
	var letter="hello world";
	document.write("<br />"+letter.toUpperCase());
}

//带参数的函数
function ShowName(name)
{
	alert("My name is "+name);
}

//带返回值的函数
function Product(num1,num2)
{
	num1=parseFloat(num1);
	num2=parseFloat(num2);
	return num1*num2;
}

//一个简单的四则运算函数
function EasyCalc(num1,num2)
{
	var result;
	var operator=document.getElementById("options");
	num1=parseFloat(num1);
	num2=parseFloat(num2);
	if(operator.options[operator.selectedIndex].value == "+")
	{
		//alert(operator.options[operator.selectedIndex].value);
		result=num1+num2; 
	}
	else if(operator.options[operator.selectedIndex].value == "-")
	{
		result=num1-num2;
	}
	else if(operator.options[operator.selectedIndex].value == "*")
	{
		result=num1*num2;
	}
	else
	{
		result=num1/num2;
	}
	return result;
}

//遍历对象属性
function fun2()
{
	var app = {
		appName:"eater",
		appVersion:"1.0.0",
		appCompany:"Shadows"
	};
	var n;
	var txt = "";
	for (x in app) 
	{
		txt = txt + app[x];
	}
	
	document.getElementById('output2').innerHTML = txt;
}

//处理错误
function error()
{
	try
	{
		alert("没有错误");
		
	}
	catch(e)
	{
		var txt="";
		txt = "出现错误，\n";
		txt = txt + "错误为：" + e.message + "\n";
		alert(txt);
	}
}

function throwError()
{
	try
	{
		var n = document.getElementById('error').value;
		if(n < 50) throw "数字小于50";
		if(n > 50) throw "数字大于50";
		alert("数字等于50");
	}
	catch(e)
	{
		alert("错误" + e);
	}
}
