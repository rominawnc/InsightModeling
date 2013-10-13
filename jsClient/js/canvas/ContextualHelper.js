/*
Class: ContextualHelper

Creates a context menu or toolbar for an object 

Parameters:
	options - contains all parameters for the class
		options.object - the object for which we will render a contextual menu or toolbar
		options.type - the type of helper to render. Possible options are :
					   * objectBar

*/
function ContextualHelper(target,canvasObject,options){
	this.target=target;
	this.canvasObject=canvasObject;	
	this.type=options.type;
	if (this[this.type]!="undefined"){
		this[this.type]();
	}
}
ContextualHelper.prototype.draw = function(){

}

/*
Function: objectBar
Renders a very concise toolbar with only 2 buttons right now. Delete and close.
	-> Delete will erase the object <br/>
	-> Cancel will only erase the objectBar
*/
ContextualHelper.prototype.deleteBar = function(){
	this.canvasObject.drawSquare({height:50, width:50,y:this.target.y,x:this.target.x+this.target.width-50}).drawText({x:10,y:10,text:"Delete",fillStyle:"fill"});
}
