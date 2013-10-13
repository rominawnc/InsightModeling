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
	this.moving=false;
	this.dragging=false;
	this.dragoffx=false;
	this.dragoffy=false;
	this.selectionColor = '#CC0000';
	this.selectionWidth = 2;  
	this.selection = null;  
	this.interval = 30;

	// Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
	// They will mess up mouse coordinates and this fixes that
	var html = document.body.parentNode;
	this.htmlTop = html.offsetTop;
	this.htmlLeft = html.offsetLeft;

	var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
	if (document.defaultView && document.defaultView.getComputedStyle) {
		this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(this.canvasElement, null)['paddingLeft'], 10)      || 0;
		this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(this.canvasElement, null)['paddingTop'], 10)       || 0;
		this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(this.canvasElement, null)['borderLeftWidth'], 10)  || 0;
		this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(this.canvasElement, null)['borderTopWidth'], 10)   || 0;
	}


	this.startMouseListeners(); 
	return this;
}
/*
Function: startMouseListeners
Starts listeners for mousedown, mouseup and mousemove, making it possible to move rects around
*/
CanvasObject.prototype.startMouseListeners=function(){
	var self=this;
	this.mouseDownEvent();
	this.mouseUpEvent();

	this.mouseMoveEvent();
}
/*
Function: mouseDownEvent

When mouse is down, we will initialize the variables we need to move it as long as the mouse is over an object 
*/
CanvasObject.prototype.mouseDownEvent=function(){
	var self=this;
	/*
	Avoid the bug of text being selected on mousedown
	*/
	$(self.canvasElement).on('selectstart', function(e) { event.preventDefault(); return false; });
	/*
	Canvas element now listens to mousedown
	*/
	$(self.canvasElement).on('mousedown', function(e) {		
		var mouse=self.getMouse();
		var currentChild=self.findMouseEventObject(mouse);			
		// havent returned means we have failed to select anything.
	    // If there was an object selected, we deselect it	  
		if (currentChild===null){
			self.selection = null;		
		}else{
			self.dragoffx=mouse.x-currentChild.x;
			self.dragoffy=mouse.y-currentChild.y
			self.dragging=true;
			currentChild.moving=true;
			self.selection=currentChild;			
		}
	});
};
/*
Function: findMouseEventObject
Find the object interacting with the pointer
*/
CanvasObject.prototype.findMouseEventObject = function(mouse){
	
	var currentChild=null;
	for(var childKey in this.children){
		if(this.children.hasOwnProperty(childKey)){
			currentChild=this.children[childKey];
			if(currentChild.contains(mouse.x,mouse.y)){
				
				return currentChild;
			}
		}
	}
	return null;
}
/*
Function: contains
 Determine if a point is inside the shape's bounds
*/
CanvasObject.prototype.contains = function(mx, my) {
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the shape's X and (X + Height) and its Y and (Y + Height)
  return  (this.x <= mx) && (this.x + this.width >= mx) &&
          (this.y <= my) && (this.y + this.height >= my);
}
/*
Function: mouseMoveEvent

When mouse moves, redraw the canvas elements to reflect the change
*/
CanvasObject.prototype.mouseMoveEvent = function(){
	var self=this;
	$(self.canvasElement).on('mousemove', function(e) {
		var mouse=self.getMouse();	
		if (self.dragging){
		  // We don't want to drag the object by its top-left corner,
		  // we want to drag from where we clicked.
		  // Thats why we saved the offset and use it here
		  self.selection.x = mouse.x - self.dragoffx;
		  self.selection.y = mouse.y - self.dragoffy;   
		  self.redraw();
		}else{

			var currentChild=self.findMouseEventObject(mouse);
			if (currentChild){
				new ContextualHelper(currentChild, self,{type:"deleteBar"}).draw();
			}
		}
	});
};
/*
Function: mouseUpEvent
.
When mouse is up, set dragging to false
*/
CanvasObject.prototype.mouseUpEvent = function(){
	var self=this;
	$(self.canvasElement).on("mouseup", function(e){
		self.dragging=false;
	});
};
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
	options.context=this.context;
	options.parent=this;
	return new Square(options).draw();
};
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

};
CanvasObject.prototype.clear = function(){
	//this.context.clearRect(0,0,this.canvasElement.width,this.canvasElement.height);
	this.canvasElement.width=this.canvasElement.width;
};
/*
Function: redraw 

Redraws the canvas and all its children. Children will redraw themselves and their children as well.
Text position will be kept relative to parents
*/
CanvasObject.prototype.redraw = function(){	
	this.clear();
	var child=null;
	for (var childKey in this.children){
		child=this.children[childKey];
		if (!(child.x>this.width || child.y > this.height||child.x+child.width<0 || child.y+child.height<0)){
			child.redraw(this.context);
		}
	}
};
/*
Function: getMouse

Creates an object with x and y defined, set to the mouse position relative to the state's canvas
If you wanna be super-correct this can be tricky, we have to worry about padding and borders
*/
CanvasObject.prototype.getMouse = function(e) {
  var element = this.canvasElement, offsetX = 0, offsetY = 0, mx, my;
  
  // Compute the total offset
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar
  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

  mx = event.pageX - offsetX;
  my = event.pageY - offsetY;
  
  // We return a simple javascript object (a hash) with x and y defined
  return {x: mx, y: my};
}

 
