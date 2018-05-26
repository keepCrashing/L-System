function Thickness(pointList){
	this.pointList = pointList;
	this.color = "none";
	this.thickness = 0;
	this.angle = 135;
	this.polyCount = 0;
	this.count = 0;
}
Thickness.prototype.exec = function(color,thickness,angle,pathAngle){
	let npointList = [];
	d3.select("#gMain")
	.append("g")
	.attr("id","g" + this.count);
	for(var i = 0; i < this.pointList.length-1;i+=1){
		let p1 = new Points (this.pointList[i].data,this.pointList[i].x, this.pointList[i].y, this.pointList[i].angle);
		let p2 = new Points (this.pointList[i+1].data,this.pointList[i+1].x, this.pointList[i+1].y, this.pointList[i+1].angle);
		let np1 = new Points (p1.data,p1.x+Math.cos(angle*Math.PI/180)*thickness,p1.y+Math.sin(angle*Math.PI/180)*thickness,p1.angle);
		let np2 = new Points (p2.data,p2.x+Math.cos(angle*Math.PI/180)*thickness,p2.y+Math.sin(angle*Math.PI/180)*thickness,p2.angle);
		npointList.push(np1);
		if(i==this.pointList.length-2){
			npointList.push(np2);
		}
		if(this.pointList[i+1].data == "M")continue;
		for(var j = 0; j < pathAngle.length; j++){
			if(p2.angle == pathAngle[j]){
				d3.select("#g"+ this.count)
				.append("polygon")
				.attr("id","polygon"+this.polyCount)
				.attr("points",p1.x+","+p1.y+" " + np1.x+","+np1.y+" " + np2.x+","+np2.y+" " + p2.x+","+ p2.y+" ")
				.attr("fill",color)
				.attr("stroke",color)
				.attr("stroke-linecap","round")
				.attr("stroke-linejoin","round");
				this.polyCount++;
			}
		}

	}
	this.pointList = npointList;
	this.count++;
}
