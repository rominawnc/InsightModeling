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
/*
Lends: ParamHandler

Useful so the Square can validate itself
*/
Square.prototype = new ParamHandler();

/*
Function: draw
Allows to either draw or redraw a square, since it will take old object  parameters if the options param is not set. 
@NOTE > What happens if we have differential parameters ? Think about this case ASAP
Still learning prototype, so I could be screwing this up :(
*/
Square.prototype.draw=function(options){
	try{
		
		/*
		this object has all keys that we can expect and what to do when we find them
		*/
		this.checkAgainst={strokeStyle:function(){this.context.strokeStyle=this.stokeStyle},lineWidth:function(){this.context.lineWidth=this.lineWidth}};
		this.paramOptions=options;
		/*
		 execute a function for each found index. 
		*/
		if(typeof(this.paramOptions)!="undefined"){
			this.doIfKeyExists(options);	
		}
		
		this.context.rect(this.x,this.y, this.height,this.width);
		this.context.stroke();
		return this;
	}catch(e){
		alert("Error");
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
	var text = new TextObject({
		x:this.x+options.x,
		y:this.y+options.y,
		text:options.text,
		fillStyle:options.fillStyle,
		context: this.context
	});
	return text.draw();

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