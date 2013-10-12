/*
Class: CanvasObject

Creates a canvas element in the dom element passed by id (elementId)

Parameters: 
	elementId - any canvas element id
	context - 2d,webgl

*/
function CanvasObject(elementId,context){
	this.canvasElement=this.canvasElement=document.getElementById(elementId);
	this.context = this.canvasElement.getContext(context)
}


/*
Function: drawSquare

Draws a square in this canvas

Parameters:

	options - Object with the canvas rect() parameters. 

	Options object properties:
		options.x - numeric
		options.y - numeric
		options.height -  numeric
		options.width - numeric
Returns:
	boolean
*/
CanvasObject.prototype.drawSquare = function(options){
	var square = new Square();
	square.x = options.x;
	square.y =options.y;
	square.height= options.height;
	square.width=options.width;
	square.context=this.context;
	square.draw();	
}