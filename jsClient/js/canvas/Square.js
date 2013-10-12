"use strict;"
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
	this.height=typeof(options.height)!="undefined"?options.height:null;
	this.width=typeof(options.width)!="undefined"?options.width:null;
	this.x=typeof(options.x)!="undefined"?options.x:null;
	this.y=typeof(options.y)!="undefined"?options.y:null;	
	this.context=typeof(options.context)!="undefined"?options.context:null;
	this.parent=typeof(options.parent)!="undefined"?options.parent:null;
	this.children=new Array();
	/*
	simple initialization method for squares. Only sets properties that do not exist in the current object
	*/
	for (var o in options) {
		if(options.hasOwnProperty(o)  && !this.hasOwnProperty(o) ){
			this[o]=options[o];
		}
	};
	return this;
};
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
Square.prototype.draw=function(){
	try{
		var rectFunctions = {
			"strokeStyle": function(object){
				object.context.strokeStyle=object.strokeStyle;				
			},
			"lineWidth": function(object){
				object.context.lineWidth=object.lineWidth;
			}
		}
		/*
		 execute a function for each found index. 
		*/
		for (var option in this.options) {
			if (this.hasOwnProperty(option) && typeof(rectFunctions[options])=="function"){
				rectFunctions[option](this);
			}
		};
		this.context.rect(this.x,this.y, this.width,this.height);
		this.context.stroke();
		this.parent.children.push(this);
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
		context: this.context,
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