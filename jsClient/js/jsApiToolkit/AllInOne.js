/**
 * AllInOne attempts to map objects that come from a complete json structure into javascript hierarchical structure 
 * @return {AllInOne}
 */
function AllInOne(){

	this.children = [];
	this.drawingArea =null;
	this.canvasElementId="ermCanvas";
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
	var self=this;
        var database=null;
        var erm=null;
        var ermObject=null;
	/**
	 * get all data
	 */
	this.load(function(response){		
                database=response.database;
                erm=response.erm;
		/**
		 * draw a canvas
		 * @type {CanvasObject}
		 */
		self.drawingArea = new CanvasObject(self.canvasElementId, self.canvasContextType);
		/**
		 * For each table we will create : 
		 * ->a square (tblContainer) with a text object  (tblName)
		 * 	->per each tblContainer, we will create as many textObjects as there are fields in the table
		 * 
		 * i just the counter
		 * @type {integer}
		 */
		for (var i = database.length - 1; i >= 0; i--) {
                        ermObject=_.findWhere(erm,{dbObject:database[i].table});
                        if (!ermObject){
                            ermObject={};
                            ermObject.y=10;
                            ermObject.x=10;
                            ermObject.height=100;
                            ermObject.lineWidth=1;
                            ermObject.width=200;
                        }
			self.drawingArea.drawSquare({
				y:ermObject.x,
				x:ermObject.y,
				height:ermObject.height,
				lineWidth:ermObject.lineWidth,
				width:ermObject.width,
                                dbObject:database[i].table
			}).drawText({y:10,x:10,text:database[i].table, fillStyle:"fill"});;			
		};
		
	});
	/**
	 * return this object so we can chain 
	*/
	
	return this;
};

/**
 * draw create the canvasObject
 * @return {AllInOne} this
 */
AllInOne.prototype.saveERM = function(data){
	var self=this;
	/**
	 * get all data
	 */
	this.save(data,function(response){		
		/**
		 * draw a canvas
		 * @type {CanvasObject}
		 */
		self.drawingArea = new CanvasObject(self.canvasElementId, self.canvasContextType);
		/**
		 * For each table we will create : 
		 * ->a square (tblContainer) with a text object  (tblName)
		 * 	->per each tblContainer, we will create as many textObjects as there are fields in the table
		 * 
		 * i just the counter
		 * @type {integer}
		 */
		for (var i = response.length - 1; i >= 0; i--) {
			self.drawingArea.drawSquare({
				y:10,
				x:10,
				height:100,
				lineWidth:1,
				width:200,
			}).drawText({y:10,x:10,text:response[i].table, fillStyle:"fill"});;			
		};
		
	});
	/**
	 * return this object so we can chain 
	*/
	
	return this;
};
