//var Axoim = "A";
//var List = Axoim;

//var Rule1 = "A=B-A-B";
//var Rule2 = "B=A+B+A";
var List="";
var Rule1="";
var Rule2="";
var Rule3="";
var Rule4="";
var Rule5="";
var Rule6="";
var stack=[];
var polygonList=[];
function go(depth){
	var List2 = "";
	if(depth == 0)
	{
		return;
	}
	else if(depth > 0)
	{
		for(i=0;i<List.length;i++)
		{
			if(List[i] == Rule1.substr(0,1) )
			{
				List2 = List2 + Rule1.substr(2,Rule1.length);
			}
			else if(List[i] == Rule2.substr(0,1) )
			{
				List2 = List2 + Rule2.substr(2,Rule2.length);
			}
			else if(List[i] == Rule3.substr(0,1) )
			{
				List2 = List2 + Rule3.substr(2,Rule3.length);
			}
			else if(List[i] == Rule4.substr(0,1) )
			{
				List2 = List2 + Rule4.substr(2,Rule4.length);
			}
			else if(List[i] == Rule5.substr(0,1) )
			{
				List2 = List2 + Rule5.substr(2,Rule5.length);
			}
			else if(List[i] == Rule6.substr(0,1) )
			{
				List2 = List2 + Rule6.substr(2,Rule6.length);
			}
			else if(List[i] == "+")
			{
				List2 = List2 + "+";
			}
			else if(List[i] == "-")
			{
				List2 = List2 + "-";
			}else
			{
				List2 = List2 + List[i];
			}
		}
	}
	console.log(List2);
	List = List2;
	go(depth - 1);
}
function exec(){
	var Iterations = document.getElementById("Iterations").value;//6
	var Alphabet = document.getElementById("Alphabet").value;
	var Angle = document.getElementById("Angle").value;//60
	var Axoim = document.getElementById("Axoim").value;//A
	Rule1 = document.getElementById("Rule1").value;//A=B-A-B
	Rule2 = document.getElementById("Rule2").value;//B=A+B+A
	Rule3 = document.getElementById("Rule3").value;
	Rule4 = document.getElementById("Rule4").value;
	Rule5 = document.getElementById("Rule5").value;
	Rule6 = document.getElementById("Rule6").value;
	List = Axoim;
	go(Iterations);
	
	
	document.querySelector('svg').innerHTML = '';
	var turtle = new Turtle();
	//turtle.path = "M 100 100"
	for(i=0;i<List.length;i++){
		if(List[i] == '-'){
			turtle.turn(parseFloat(Angle));
		}
		else if(List[i] == '+')
		{
			turtle.turn(parseFloat(Angle)*-1);
		}
		else if(List[i] == '[')
		{
			let p1 = new Object;
			p1.x = turtle.x;
			p1.y = turtle.y;
			p1.angle = turtle.angle;
			stack.push(p1);
		}
		else if(List[i] == ']')
		{
			let t1 = stack.pop();
			//turtle.penUp();
			turtle.moveTo(t1.x,t1.y,t1.angle);
		}
		else{
			let flag = false;
			for(j=0; j < Alphabet.length; j++){
				if(List[i] == Alphabet[j]){
					flag = true;
				}
			}
			if(flag == false){
				turtle.move(15);
			}
		}
	}
	 d3.select("svg")
	.append("path")
	.attr("id","path1")
	.attr("d",turtle.getPathAttributes().d)
	.attr("stroke",turtle.getPathAttributes().stroke)
	.attr("fill",turtle.getPathAttributes().fill)
	.attr("stroke-linecap",turtle.getPathAttributes().strokeLinecap)
	.attr("stroke-linejoin",turtle.getPathAttributes().strokeLinejoin);
	d3.select("svg")
	.append("g")
	.attr("id","gMain");
	var thickness = new Thickness(turtle.getPointList());
	thickness.exec("#1F1B3D",5, -45);
	thickness.exec("#2C2D86",5, -45);
	thickness.exec("#97AECF",5, -45);
	//thickness.exec("#97AECF",5, 135);
	//thickness.exec("#2C2D86",5, 135);
	//thickness.exec("#1F1B3D",5, 135);
	d3.select("svg")
	.append("path")
	.attr("id","path2")
	.attr("d",function(){
		let ret = "";
		ret = "M " + thickness.pointList[0].x + " " + thickness.pointList[0].y;
		for(i = 1; i < thickness.pointList.length; i++){
			ret += "L " + thickness.pointList[i].x + " " + thickness.pointList[i].y;
		}
		return ret;
	})
	.attr("stroke",turtle.getPathAttributes().stroke)
	.attr("fill",turtle.getPathAttributes().fill)
	.attr("stroke-linecap",turtle.getPathAttributes().strokeLinecap)
	.attr("stroke-linejoin",turtle.getPathAttributes().strokeLinejoin);
	d3.selectAll("polygon")
		.on("click", function() {
			if(this.getAttribute("stroke") == 'red'){
				this.setAttribute('stroke',this.getAttribute("fill"));
				let index = polygonList.indexOf(this.id);
				polygonList.splice(index,1);
			}else{
				this.setAttribute('stroke','red');
				polygonList.push(this.id);
			}
		});
	var g = document.querySelector("#gMain");
	var obbox = g.getBBox();
	d3.select("svg")
	.attr("viewBox",obbox.x +","+ obbox.y +","+ obbox.width +","+ obbox.height)
	.attr("preserveAspectRatio","xMinYMin meet");
	d3.select("#btnColorChanging")
	.attr("onclick","changeColor(); svgDownload();");

}

function changeColor(){
	var x = document.getElementById("colorChanging").value;
	//let x = d3.select("#colorChanging").attr("value");

	console.log(x);
	for(i = 0; i < polygonList.length; i++){
		d3.select("#" + polygonList[i])
		.attr("fill",x)
		.attr("stroke",x);
	}
	polygonList = [];
}