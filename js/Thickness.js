function Thickness(pointList){
	this.pointList = pointList;
	this.color = "none";
	this.thickness = 0;
	this.angle = 135;
	this.polyCount = 0;
	this.count = 0;
}
Thickness.prototype.exec = function(color,thickness,angle){
	let npointList = [];
	d3.select("#gMain")
	.append("g")
	.attr("id","g" + this.count);
	for(i = 0; i < this.pointList.length-1;i+=1){
		let p1 = new Points (Object,this.pointList[i].x, this.pointList[i].y);
		let p2 = new Points (Object,this.pointList[i+1].x, this.pointList[i+1].y);
		let np1 = new Points (Object,p1.x+Math.cos(angle*Math.PI/180)*thickness,p1.y+Math.sin(angle*Math.PI/180)*thickness);
		let np2 = new Points (Object,p2.x+Math.cos(angle*Math.PI/180)*thickness,p2.y+Math.sin(angle*Math.PI/180)*thickness);
		d3.select("#g"+ this.count)
		.append("polygon")
		.attr("id","polygon"+this.polyCount)
		.attr("points",p1.x+","+p1.y+" " + np1.x+","+np1.y+" " + np2.x+","+np2.y+" " + p2.x+","+ p2.y+" ")
		.attr("fill",color)
		.attr("stroke",color)
		.attr("stroke-linecap","round")
		.attr("stroke-linejoin","round");
		this.polyCount++;
		npointList.push(np1);
		if(i==this.pointList.length-2){
			npointList.push(np2);
		}
	}
	this.pointList = npointList;
	this.count++;

}
