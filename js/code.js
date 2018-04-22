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
	.attr("fill",turtle.getPathAttributes().fill);
	let thickness = new Thickness(turtle.getPointList());
	thickness.exec("#1F1B3D",5,-45);
	thickness.exec("#2C2D86",5,-45);
	thickness.exec("#97AECF",5,-45);

	/*d3.select("svg")
	.append("g")
	
	for(i = 0; i < turtle.getPointList().length-1;i+=1){
		console.log(turtle.getPointList()[i]);
		let p1 = new Points (Object,turtle.getPointList()[i].x, turtle.getPointList()[i].y);
		let p2 = new Points (Object,turtle.getPointList()[i+1].x, turtle.getPointList()[i+1].y);
		let np1 = new Points (Object,p1.x+Math.cos(135*Math.PI/180)*5,p1.y+Math.sin(135*Math.PI/180)*5);
		let np2 = new Points (Object,p2.x+Math.cos(135*Math.PI/180)*5,p2.y+Math.sin(135*Math.PI/180)*);
		//console.log(p1);
		//console.log(p1.y);
		//console.log(np1.x);
		//console.log(np1.y);
		d3.select("g")
		.append("polygon")
		.attr("id","polygon"+i)
		.attr("points",p1.x+","+p1.y+" " + np1.x+","+np1.y+" " + np2.x+","+np2.y+" " + p2.x+","+ p2.y+" ")
		.attr("fill","green")
		.attr("stroke","none")
		.on("click", function() {
			console.log(this.id);
			if(this.getAttribute("stroke") == 'red'){
				this.setAttribute('stroke','none');
			}else{
				this.setAttribute('stroke','red');
				console.log(this.stroke);
			}
		});
	}*/
	var g = document.querySelector("g");
	var obbox = g.getBBox();
	d3.select("svg")
	.attr("viewBox",obbox.x +","+ obbox.y +","+ obbox.width +","+ obbox.height)
	.attr("preserveAspectRatio","xMinYMin meet");
}