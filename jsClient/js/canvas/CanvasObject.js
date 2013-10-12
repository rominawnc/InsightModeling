"use strict";
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
	return this;
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
	return square.draw();	

}
/*
Function: fillText
Returns: {boolean}
Parameters: 
	text {required} - {string}
	x {absolute} {required} - {integer} x position of text
	y {absolute} {required} - {integer } y position of text
	fillStyle {required} - {string} will determine the text function to use
*/
CanvasObject.prototype.drawText = function(options){
	var text = new TextObject({
		x:options.x,
		y:options.y,
		text:options.text,
		fillStyle:options.fillStyle,
		context: this.context
	});
	return text.draw();

}
