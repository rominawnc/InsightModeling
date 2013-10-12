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
	this.context = this.canvasElement.getContext(context);
	this.children= new Array();
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
	return new Square({
		x:options.x,
		y:options.y,
		height:options.height,
		width:options.width,
		context:this.context,
		parent:this
	}).draw();
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
	return new TextObject({
		x:options.x,
		y:options.y,
		text:options.text,
		fillStyle:options.fillStyle,
		context: this.context,
		parent:this
	}).draw();

}
