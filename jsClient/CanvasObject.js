/**
** Creates a cnavas element in the dom element passed by id (elementId)
** @param Context:2d,webgl
** @param any canvas element id
**/
function CanvasObject(elementId,context){
	this.canvasElement=this.canvasElement=document.getElementById(elementId);
	this.context = this.canvasElement.getContext(context)
}

CanvasObject.prototype.drawSquare = function(options){
	var square = new Square();
	square.x = options.x;
	square.y =options.y;
	square.height= options.height;
	square.width=options.width;
	square.context=this.context;
	square.draw();	
}