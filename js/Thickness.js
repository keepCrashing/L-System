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
	let npoint2 ;
	let right = [];
	let left = [];
	d3.select("#gMain")
	.append("g")
	.attr("id","g" + this.count);
	for(let i = 0; i < this.pointList.length-1;i+=1){
		let p1 = new Points (this.pointList[i].data,this.pointList[i].x, this.pointList[i].y, this.pointList[i].angle);
		let p2 = new Points (this.pointList[i+1].data,this.pointList[i+1].x, this.pointList[i+1].y, this.pointList[i+1].angle);
		for(let x = 0; x < pathAngle.length; x++){
			for(let y = 0; y < pathAngle[x].length; y++){
				if(p2.angle == pathAngle[x][y]){
					if(thickness[x] == 0)break;
					let np1;
					let o = Math.sqrt(Math.pow(Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2)),2)+Math.pow(thickness[x],2));
					console.log(o);
					if(npoint2 == undefined){
						np1 = new Points (p1.data,p1.x+Math.cos(angle[x]*Math.PI/180)*thickness[x],p1.y+Math.sin(angle[x]*Math.PI/180)*thickness[x],p1.angle);
					}else{
						np1 = npoint2;
					}
					let np2 = new Points (p2.data,p2.x+Math.cos(angle[x]*Math.PI/180)*thickness[x],p2.y+Math.sin(angle[x]*Math.PI/180)*thickness[x],p2.angle);
					npoint2 = np2;
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
					let a1 = this.pointList[i].angle;
					let a2 = this.pointList[i+1].angle;
					let polygonA = angle[x];
					let c = this.polyCount;
					//if(a1 == 0 && angle[x] > 180)a1=360;
					//if(a2 == 0 && angle[x] > 180)a2=360;
					if(a1 > 180)a1 = a1 - 360;
					if(a2 > 180)a2 = a2 - 360;
					if(polygonA > 180)polygonA = polygonA - 360;
		
					if(i != 0 && a2 < polygonA && a1 > polygonA && Math.abs(a1-a2)<180){
						right.push("polygon"+(c-1));
						console.log(a1);
						console.log(a2);
						console.log("polygon"+(c-1));
					}
					if(i != 0 && a1 < polygonA && a2 > polygonA && Math.abs(a1-a2)<180){
						right.push("polygon"+(c-1));
						console.log(a1);
						console.log(a2);
						console.log("polygon"+(c-1));
					}
					if(i==this.pointList.length-2){
						left.push("polygon"+(c));
						console.log(c);
					}
					this.polyCount++;
				}
			}
		}
	}
	//removeAppendPolygon(left,this.count);
	removeAppendPolygon(right,this.count);
	removeAppendPolygon(left,this.count);
		
	/*for(let i = 0; i < left.length; i++){
		let p = document.getElementById(left[i]);
		d3.select("#" + left[i]).remove();
		d3.select("#g"+this.count)
		.append("polygon")
		.attr("id",p.getAttribute("id"))
		.attr("points",p.getAttribute("points"))
		.attr("fill",p.getAttribute("fill"))
		.attr("stroke",p.getAttribute("stroke"))
		.attr("stroke-linecap",p.getAttribute("stroke-linecap"))
		.attr("stroke-linejoin",p.getAttribute("stroke-linejoin"));
	}
	for(let i = 0; i < right.length; i++){
		let p = document.getElementById(right[i]);
		d3.select("#" + right[i]).remove();
		d3.select("#g"+this.count)
		.append("polygon")
		.attr("id",p.getAttribute("id"))
		.attr("points",p.getAttribute("points"))
		.attr("fill",p.getAttribute("fill"))
		.attr("stroke",p.getAttribute("stroke"))
		.attr("stroke-linecap",p.getAttribute("stroke-linecap"))
		.attr("stroke-linejoin",p.getAttribute("stroke-linejoin"));
	}*/
	this.pointList = npointList;
	this.count++;

}
function removeAppendPolygon(arr,count){
	for(let i = arr.length-1; i >= 0; i--){
		let p = document.getElementById(arr[i]);
		d3.select("#" + arr[i]).remove();
		d3.select("#g"+count)
		.append("polygon")
		.attr("id",p.getAttribute("id"))
		.attr("points",p.getAttribute("points"))
		.attr("fill",p.getAttribute("fill"))
		.attr("stroke",p.getAttribute("stroke"))
		.attr("stroke-linecap",p.getAttribute("stroke-linecap"))
		.attr("stroke-linejoin",p.getAttribute("stroke-linejoin"));
	}
}