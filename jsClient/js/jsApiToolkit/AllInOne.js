/**
 * AllInOne attempts to map objects that come from a complete json structure into javascript hierarchical structure 
 * @return {AllInOne}
 */
function AllInOne(){
	this.children = [];
	this.drawingArea =null;
	this.canvasElementId="myCanvas";
	this.canvasContextType="2d";
}

AllInOne.prototype=new DataLoader();
/**
 * add add child to the AIO object
 * @param {object} obj any model object
 */
AllInOne.prototype.add = function(obj){
	/**
	 * @TODO check if it inherits from base Model
	 */
	this.children.push(obj);
}
/**
 * draw create the canvasObject
 * @return {AllInOne} this
 */
AllInOne.prototype.setup = function(){
	/**
	 * get all data
	 */
	this.setupData();
	
	/**
	 * draw a canvas
	 * @type {CanvasObject}
	 */
	this.drawingArea = new CanvasObject(this.canvasElementId, this.canvasContextType);

	/**
	 * return this object so we can chain 
	*/
	return this;
}