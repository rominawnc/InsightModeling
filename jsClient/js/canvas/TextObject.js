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
	this.y=typeof(options.y)!="undefined"?options.y:null;
	this.x=typeof(options.x!="undefined")?options.x:null;
	this.context=typeof(options.context)!="undefined"?options.context:null;
	this.text=typeof(options.text)!="undefined"?options.text:null;
	this.fillStyle =typeof(options.fillStyle)!="undefined"?options.fillStyle.toLowerCase():"fill"; // would use a simple callback type parameter, but it would be hell to mantain if the canvas API changes (which it wont... but still,you know?)	
	this.parent=typeof(options.parent)!="undefined"?options.parent:null;
	/*
	simple initialization method for squares. Only sets properties that do not exist in the current object
	*/
	for (var o in options) {
		if(options.hasOwnProperty(o) && !this.hasOwnProperty(o) ){
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
TextObject.prototype.draw = function(){	
	var fillFunctions = {
		"stroke": function(object){
			object.context.strokeText(object.text, object.x,object.y);
		},
		"fill": function(object){
			object.context.fillText(object.text,object.x,object.y);
		}
	}
	try{
		if (typeof(fillFunctions[this.fillStyle])=="function"){
			fillFunctions[this.fillStyle](this);
		}
		this.parent.children.push(this);	
		return this;
	}catch (e){
		if (Configuration.debug===true){
			alert("Error"+e.message);
		}else{
			console.log("Error"+e.message);
		}
	}
	
}
