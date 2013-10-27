/**
 * Model base object to create model. Defines properties and methods that all model objects will have
 */
function Model(){
	/**
	 * uuid generate unique ID
	 * @type {number}
	 */
	this.uuid = _.uuid();
	this.className = this.constructor.name;
	this.tableName = this.className;

}

Model.prototype.getTableName = function(){
	return this.tableName;
}

Model.prototype.draw = function(){
	return new Square().draw();
}