"use strict";

/**
 * @class Square Knows how to draw himself. It is actually a canvas rectangle 
 * @param {object} options - an object with the options to draw the square. Square properties will be initialized based on this object	
 * @param	options.x {required} - x position of the square object
 * @param	options.y {required} - x position of the square object		
 * @param	options.height {required} - height the square object		
 * @param	options.width {required} - width the square object		
 * @param	options.context {required} - canvas context to draw this
 */
function Square(options){	
	/*
	Required options are explicitly initialized
	*/
	if (typeof(options)=="undefined"){
		options={};
	}
	this.height=null;
	this.width=null;
	this.x=null;
	this.y=null;	
	this.parent=null;
	this.children=new Array();
	/*
	simple initialization method for squares.
	*/
	for (var o in options) {
		if(options.hasOwnProperty(o)){
			this[o]=options[o];
		}
	};
	return this;
};

/**
 * contains Determine if a point is inside the shape's bounds
 * @param  {float} mx Mouse X coordinate
 * @param  {float} my Mouse Y coordinate
 * @return {boolean}    is the mouse contained in this object?
 */
Square.prototype.contains = function(mx, my) {
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the shape's X and (X + Height) and its Y and (Y + Height)
  // 
  var parentX=this.parent.x?this.parent.x:0;
  var parentY=this.parent.y?this.parent.y:0;
  return  (parentX+this.x <= mx) && (parentX+this.x + this.width >= mx) &&
          (parentY+this.y <= my) && (parentY+this.y + this.height >= my);
}
/**
 * getProperties Returns all the object properties
 * @return {object} the properties of this object
 */
Square.prototype.getProperties = function(){
	var returnObject={};
	for(var prop in this){
		if (this.hasOwnProperty(prop)){
			returnObject[prop]= this[prop];
		}
	}
	return returnObject;
}
/**
 * draw Draws a rectangle in the canvas or another rectangle(Square object)
 * @param  {object} options : 
 *                          options.replace will replace an object in the children array of the parent
 *                          options can contain functions to execute 
 * @return {object}         a Square object
 */
Square.prototype.draw=function(options){
	try{
		var rectFunctions = {
			"strokeStyle": function(object){
				object.parent.context.strokeStyle=object.strokeStyle;				
			},
			"lineWidth": function(object){
				object.parent.context.lineWidth=object.lineWidth;
			}
		}
		/*
		 execute a function for each found index. 
		*/
		for (var option in this) {
			if (this.hasOwnProperty(option) && typeof(rectFunctions[option])=="function"){
				rectFunctions[option](this);
			}
		};
		this.parent.context.rect(this.x,this.y, this.width,this.height);
		this.parent.context.stroke();
		if((typeof(this.includeInStructure)=="undefined"||this.includeInStructure==true) && typeof(options)=="object" && typeof(options.replace)!="undefined"){
			this.parent.children[this.parent.children.indexOf(this)]=this;
		}else if(typeof(this.includeInStructure)=="undefined"||this.includeInStructure==true){
			this.parent.children.push(this);	
		}		
		return this;
	}catch(e){
		if (Configuration.debug===true){
			alert("Error"+e.message);
		}else{
			console.log("Error"+e.message);
		}
	}
};

/**
 * redraw Redraw the object and its' childrens
 * @return {undefined} 
 */
Square.prototype.redraw= function(){
	try{			

		this.draw({replace:this});
		for(var childKey in this.children){
			if (this.children.hasOwnProperty(childKey)){
				this.children[childKey].redraw();
			}
		}
	}catch(e){
		if (Configuration.debug===true){
			alert("Error"+e.message);
		}else{
			console.log("Error"+e.message);
		}	
	}
};

/**
 * [drawText description]
 * @param  {object} options
 * @param options.text {required} - {string}
 * @param options.x {relative} {required} - {integer} will add to x position of square
 * @param options.y {relative} {required} - {integer }will add to y position of square
 * @param options.fillStyle {required} - {string} will determine the text function to use
 * @return {boolean}
 */
Square.prototype.drawText = function(options){
	return new TextObject({
		x:options.x,
		y:options.y,
		text:options.text,
		fillStyle:options.fillStyle,		
		parent:this
	}).draw();
};

/**
 * erase Erases the object from the structure and redraws the canvas so the change is reflected
 * @return {object} parent
 */
Square.prototype.erase = function(){
	for(var childKey in this.parent.children){
		if (this.parent.children.hasOwnProperty(childKey) && this.parent.children[childKey]==this){
			this.parent.children[childKey]=undefined;
			this.parent.redraw();
		}
	}
	this.parent.children = _.filter(this.parent.children, function(val){ return typeof(val)!="undefined" && val !==null ; });
	return this.parent;
};