function Square(options){	
	this.height=null;
	this.width=null;
	this.x=null;
	this.y=null;	
	this.context=null;
	/**
	** simple initialization method for squares.
	**/
	for (var o in options) {
		if(options.hasOwnProperty(o) && this.hasOwnProperty(o)){
			this[o]=options[o];
		}
	};
}
Square.prototype = new ParamHandler();
Square.prototype.setHeight= function(height){
	this.height=height;
};
Square.prototype.setWidth = function(width){
	this.width=width;
};
Square.prototype.changeColor = function(colorCode){

};
/**
** Allows to either draw or redraw a square, since it will take old object  parameters if the options param is not set. 
** @NOTE > What happens if we have differential parameters ? Think about this case ASAP
** Still learning prototype, so I could be screwing this up :(
*/
Square.prototype.draw=function(options){
	try{
		if (typeof(options)=="undefined"){
			options=this.paramOptions;
		}
		/**
		** this object has all keys that we can expect and what to do when we find them
		**/
		this.checkAgainst={strokeStyle:function(){this.context.strokeStyle=options.stokeStyle},lineWidth:function(){this.context.lineWidth=options.lineWidth}};
		this.paramOptions=options;
		/**
		** execute a function for each found index. 
		**/
		this.doIfKeyExists(options);
		this.context.rect(this.x,this.y, this.height,this.width);
		this.context.stroke();
	}catch(e){
		alert("Error");
	}
};