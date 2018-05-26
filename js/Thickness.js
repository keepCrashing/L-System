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
	for(let i = 0; i < this.pointList.length-1;i+=1){
		let p1 = new Points (this.pointList[i].data,this.pointList[i].x, this.pointList[i].y, this.pointList[i].angle);
		let p2 = new Points (this.pointList[i+1].data,this.pointList[i+1].x, this.pointList[i+1].y, this.pointList[i+1].angle);
		for(let x = 0; x < pathAngle.length; x++){
			for(let y = 0; y < pathAngle[x].length; y++){
				if(p2.angle == pathAngle[x][y]){
					let np1 = new Points (p1.data,p1.x+Math.cos(angle[x]*Math.PI/180)*thickness[x],p1.y+Math.sin(angle[x]*Math.PI/180)*thickness[x],p1.angle);
					let np2 = new Points (p2.data,p2.x+Math.cos(angle[x]*Math.PI/180)*thickness[x],p2.y+Math.sin(angle[x]*Math.PI/180)*thickness[x],p2.angle);
						npointList.push(np1);
						if(i==this.pointList.length-2){
							npointList.push(np2);
						}
					if(this.pointList[i+1].data == "M")continue;
						d3.select("#g"+ this.count)
							.append("polygon")
							.attr("id","polygon"+this.polyCount)
							.attr("points",p1.x+","+p1.y+" " + np1.x+","+np1.y+" " + np2.x+","+np2.y+" " + p2.x+","+ p2.y+" ")
							.attr("fill",color[x])
							.attr("stroke",color[x])
							.attr("stroke-linecap","round")
							.attr("stroke-linejoin","round");
							this.polyCount++;
				}
			}
		}
	}
	this.pointList = npointList;
	this.count++;
}
