"use strict";
/*
Class: Square

Knows how to draw himself. It is actually a canvas rectangle 

Parameters:

	options - an object with the options to draw the square. Square properties will be initialized based on this object	
			options.x {required} - x position of the square object
			options.y {required} - x position of the square object		
			options.height {required} - height the square object		
			options.width {required} - width the square object		
			options.context {required} - canvas context to draw this
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

// Determine if a point is inside the shape's bounds
Square.prototype.contains = function(mx, my) {
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the shape's X and (X + Height) and its Y and (Y + Height)
  return  (this.x <= mx) && (this.x + this.width >= mx) &&
          (this.y <= my) && (this.y + this.height >= my);
}
/*
Function: getProperties
Returns all the object properties
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
/*
Function: draw
Draws a rectangle in the canvas or another rectangle(Square object)
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
		if(typeof(options)=="object" && typeof(options.replace)!="undefined"){
			this.parent.children[this.parent.children.indexOf(this)]=this;
		}else{
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
/*
Function: redraw 

Redraw the object and it's childrens
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

}
/*
Function: fillText
Returns: {boolean}
Parameters: 
	text {required} - {string}
	x {relative} {required} - {integer} will add to x position of square
	y {relative} {required} - {integer }will add to y position of square
	fillStyle {required} - {string} will determine the text function to use
*/
Square.prototype.drawText = function(options){
	return new TextObject({
		x:this.x+options.x,
		y:this.y+options.y,
		text:options.text,
		fillStyle:options.fillStyle,		
		parent:this
	}).draw();
}


/*
Function: ideas
Create a function to draw inside objects.


IDEA 1)Have something like :

	function drawInside (callback){ 
		//do stuff 
		callback(self.x,self.y);
	} 

IDEA 2) Items get a drawTo optional parameter, which is an instance of the object we want to render this item inside

	function draw(options, drawTo){
		if (drawTo){
			self.x=drawTo.x;
			self.y=drawTo.y;
		}
	}

First one looks better, I think, but I am not sure why so I am leaving it open for now
*/
function ideas(){};