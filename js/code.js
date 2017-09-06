//var Axoim = "A";
//var List = Axoim;

//var Rule1 = "A=B-A-B";
//var Rule2 = "B=A+B+A";
var List="";
var Rule1="";
var Rule2="";
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
	List = Axoim;
	go(Iterations);
	
	
	document.querySelector('svg').innerHTML = '';
	var turtle = new Turtle();
	//turtle.path = "M 100 100"
	for(i=0;i<List.length;i++){
		if(List[i] == '+'){
			turtle.turn(parseFloat(Angle));
		}
		else if(List[i] == '-')
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
				turtle.move(20);
			}
		}
	}
	 d3.select("svg")
	.append("path")
	.attr("id","path1")
	.attr("d",turtle.getPathAttributes().d)
	.attr("stroke",turtle.getPathAttributes().stroke)
	.attr("fill",turtle.getPathAttributes().fill);
	var path = document.querySelector("#path1");
	var obbox = path.getBBox();
	d3.select("svg")
	.attr("viewBox",obbox.x +","+ obbox.y +","+ obbox.width +","+ obbox.height)
	.attr("preserveAspectRatio","xMinYMin meet");
}