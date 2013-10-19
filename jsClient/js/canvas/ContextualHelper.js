/**
 * @class  ContextualHelper Creates a context menu or toolbar for an object 
 * @param {object} target object to put the menu
 * @param {object} canvasObject where to draw this (canvas element)
 * @param {object} options      contains all parameters for the class
 */
function ContextualHelper(target,canvasObject,options){
	this.target=target;
	this.canvasObject=canvasObject;	
	this.type=options.type;
	this.clickAction=function(){
		alert("Clicked");
	}
	if (this[this.type]!="undefined"){
		this.element=this[this.type]();
	}
	return this;
}
/**
 * deleteBar Renders a very concise toolbar with only 2 buttons right now. Delete and close.
 * @return {Square}  Square with the delete button
 */
ContextualHelper.prototype.deleteBar = function(){
	var self=this;
	this.clickAction= function(){
		self.target.erase();
	};
	//includeInStructure is used to mark those object that are not supposed to be in the structure of the canvas object.This is particulary useful if you do not want the objects to reappear on redraw
	return this.canvasObject.drawSquare({includeInStructure:false,height:50, width:50,y:this.target.y,x:this.target.x+this.target.width-50}).drawText({x:10,y:10,text:"Delete",fillStyle:"fill"});
}
ContextualHelper.prototype.executeClickAction = function (){
	this.clickAction();
}