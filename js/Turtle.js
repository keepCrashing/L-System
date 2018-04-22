function Turtle(){
	this.x = 0;
	this.y = 0;
	this.angle = 0;
	this.draw = true;
	this.path = "M 0 0";
	this.pointList = [new Points(Object,0,0)];
}
Turtle.prototype.penUp = function(){
	this.draw = false;
}
Turtle.prototype.penDown = function(){
	this.draw = true;
}
Turtle.prototype.turn = function(angle){
	this.angle += angle;
}
Turtle.prototype.move = function(distance){
	this.path += (this.draw ? "L" : "M") + " ";
	var offset = new Vector(
		Math.cos(this.angle * Math.PI / 180),
		Math.sin(this.angle * Math.PI / 180)
	).mult(distance);
	this.x = this.x + offset.x;
	this.y = this.y + offset.y;
	this.path += this.x + " " + this.y + " ";
	this.pointList.push(new Points("L",this.x,this.y));
}
Turtle.prototype.moveTo = function(x,y,angle){
	this.path += "M " + x + " " + y + " ";
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.pointList.push(new Points("M",this.x,this.y));

}
Turtle.prototype.getPathAttributes = function(){
	return{
		"d" : this.path,
		"stroke" : "black",
		"fill" : "none"
	};
}
Turtle.prototype.getPointList = function(){
	return this.pointList;
}