$(document).ready(function(){
	var canvasObject= new CanvasObject("myCanvas", "2d");
	canvasObject.drawSquare({
		y:10,
		x:10,
		height:100,
		lineWidth:20,
		width:200,
	});
	canvasObject.drawSquare({
		y:200,
		x:10,
		height:100,
		lineWidth:1,
		width:200,
	}).drawText({y:10,x:10,text:"First text", fillStyle:"fill"});
});