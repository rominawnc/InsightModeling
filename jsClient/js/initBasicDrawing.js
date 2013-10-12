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


	/*
	======================================================================
	================Drawing inside another square is easy=================
	======================================================================
	*/
	var square=canvasObject.drawSquare({
		y:250,
		x:10,
		height:100,
		width:200
	});
	var sqProperties=square.getProperties();
	sqProperties.x=sqProperties.x+10;
	sqProperties.y=sqProperties.y+10;
	sqProperties.height=sqProperties.height/2;
	var sqInside=new Square(sqProperties).draw().drawText({y:10,x:10,text:"First text", fillStyle:"fill"});
	canvasObject.drawSquare({
		y:250,
		x:250,
		height:100,
		width:200
	}).drawText({y:10,x:10,text:"Relative text", fillStyle:"fill"});
	/*
	======================================================================
	======================================================================
	======================================================================
	*/
	canvasObject.drawText({y:10,x:200,text:"Absolute text", fillStyle:"stroke"});
});