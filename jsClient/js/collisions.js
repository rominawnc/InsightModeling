$(document).ready(function(){
	var canvasObject= new CanvasObject("myCanvas", "2d");
	var sqOne=canvasObject.drawSquare({
		y:10,
		x:10,
		height:100,
		lineWidth:1,
		width:200,
		forbidOverlap:["Square"]
	});
	var sqTwo=canvasObject.drawSquare({
		y:200,
		x:10,
		height:100,
		lineWidth:1,
		width:200,
		forbidOverlap:["Square"]
	});
	canvasObject.drawLine({
		from:sqOne,
		to:sqTwo
	});
});