function Vector(x,y){
	this.x = x || 0;
	this.y = y || 0;
}
Vector.prototype.magnitude = 
	function(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};
Vector.prototype.mult = 
	function(alpha){
		return new Vector(alpha * this.x, alpha * this.y);
	};
Vector.prototype.add = 
	function(vec){
		return new Vector (vec.x + this.x, vec.y + this.y);
	};