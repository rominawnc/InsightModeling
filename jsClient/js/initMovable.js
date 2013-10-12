$(document).ready(function(){
	var canvasObject= new CanvasObject("myCanvas", "2d");
	canvasObject.drawSquare({
		y:10,
		x:10,
		height:100,
		lineWidth:20,
		width:200,
	});

});