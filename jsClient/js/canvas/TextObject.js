"use strict";
/*
Class: TextObject

	Parameters:
		options - object with all options for the text object
			options.x {required} - x position of the text object
			options.y {required} - x position of the text object		
			options.fillStyle {required} - fillStyle can be "stoke" or "fill". 
										   1.stroke will convert to strokeText function
										   2.fill will convert to fillText function
*/
function TextObject(options){
	/*
	Required options are set explicitly so we know they are required.
	*/
	if (typeof(options)=="undefined"){
		options={};
	}
	this.y=null;
	this.x=null;
	this.text=null;
	this.fillStyle =typeof(options.fillStyle)!="undefined"?options.fillStyle.toLowerCase():"fill"; // would use a simple callback type parameter, but it would be hell to mantain if the canvas API changes (which it wont... but still,you know?)	
	this.parent=null;
	/*
	simple initialization method for text objects
	*/
	for (var o in options) {
		if(options.hasOwnProperty(o)){
			this[o]=options[o];
		}
	};
	return this;
}
/*
Function: draw

Draws text in a canvas. 
Can write with two text fill functions, strokeText or  fillText.
*/
TextObject.prototype.draw = function(options){	
	var fillFunctions = {
		"stroke": function(object){
			object.parent.context.strokeText(object.text, object.x,object.y);
		},
		"fill": function(object){
			object.parent.context.fillText(object.text,object.x,object.y);
		}
	}
	try{
		if (typeof(fillFunctions[this.fillStyle])=="function"){
			fillFunctions[this.fillStyle](this);
		}
		if(typeof(options)=="object" && typeof(options.replace)!="undefined"){
			this.parent.children[this.parent.children.indexOf(this)]=this;
		}else{
			this.parent.children.push(this);	
		}
		return this;
	}catch (e){
		if (Configuration.debug===true){
			alert("Error"+e.message);
		}else{
			console.log("Error"+e.message);
		}
	}
};

TextObject.prototype.redraw = function(){
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