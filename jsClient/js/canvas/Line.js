/*
 * @class Line
 * Line should act as a way to conect two squares. 
 * @param options {object} list of line options.
 * @param options.parent {CanvasObject} {required}
 * @param options.from {Square}  where does this line start
 * @param options.to {Square}  where does this line end
 */
function Line(options){

	if (_.falsy(options)){
		options={};
	}
	this.parent=null;
	this.to=null;
	this.from=null;

	/*
	simple initialization method for squares.
	*/
	for (var o in options) {
		if(options.hasOwnProperty(o)){
			this[o]=options[o];
		}
	};
	return this;
}
/**
 * draw draws a line from the x,y coordinates of this.from to the x,y coordinates of this.to
 * @return {Line} the drawn line 
 */
Line.prototype.draw = function(options){
	var context=this.parent.context;
	context.beginPath();
	context.moveTo(this.from.x, this.from.y);
	context.lineTo(this.to.x, this.to.y);
	context.stroke();
	if((typeof(this.includeInStructure)=="undefined"||this.includeInStructure==true) && typeof(options)=="object" && typeof(options.replace)!="undefined"){
		this.parent.children[this.parent.children.indexOf(this)]=this;
	}else if(typeof(this.includeInStructure)=="undefined"||this.includeInStructure==true){
		this.parent.children.push(this);	
	}		

	return this;	
}


/**
 * draw draws a line from the x,y coordinates of this.from to the x,y coordinates of this.to
 * @return {Line} the drawn line 
 */
Line.prototype.redraw = function(){
	try{			
		this.draw({replace:this});
	}catch(e){
		if (Configuration.debug===true){
			alert("Error"+e.message);
		}else{
			console.log("Error"+e.message);
		}	
	}
};

/**
 * contains Determine if a point is inside the shape's bounds
 * @param  {float} mx Mouse X coordinate
 * @param  {float} my Mouse Y coordinate
 * @return {boolean}    is the mouse contained in this object?
 */
Line.prototype.contains = function(mx, my) {
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the shape's X and (X + Height) and its Y and (Y + Height)
  // 
  var parentX=this.parent.x?this.parent.x:0;
  var parentY=this.parent.y?this.parent.y:0;
  return  (parentX+this.x <= mx) && (parentX+this.x + this.width >= mx) &&
          (parentY+this.y <= my) && (parentY+this.y + this.height >= my);
}