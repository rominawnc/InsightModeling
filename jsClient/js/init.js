$(document).ready(function(){
	var canvasObject= new CanvasObject("myCanvas", "2d");
	canvasObject.drawSquare({
		y:10,
		x:10,
		height:100,
		width:200,
	});

	canvasObject.drawSquare({
		y:10,
		x:250,
		height:100,
		width:200
	});

	canvasObject.drawSquare({
		y:250,
		x:10,
		height:100,
		width:200
	});

	canvasObject.drawSquare({
		y:250,
		x:250,
		height:100,
		width:200
	}).drawText({y:10,x:10,text:"Relative text", fillStyle:"fill"});

	canvasObject.drawText({y:10,x:200,text:"Relative text", fillStyle:"fill"});
});