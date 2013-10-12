function ParamHandler(){
	this.paramOptions={};
	this.checkAgainst={};
}
/**
** Options should not be undefined, and should have the properties defined in the "checkAgainst" object
*/
ParamHandler.prototype.validateParams=function(){
	var isValid=true;
	for (var property in this.checkAgainst){
		if (isValid && this.checkAgainst.hasOwnProperty(property)){
			/**
			** only compare if they are not prototype properties
			**/
			isValid=this.paramOptions.hasOwnProperty(property);			
		}
	}	
	return typeof(this.paramOptions)!="undefined"	&& isValid;
}
/**\
** Options should not be undefined, and should have the properties defined in the "checkAgainst" object
*/
ParamHandler.prototype.doIfKeyExists=function(){
	for (var property in this.checkAgainst){
		if (this.checkAgainst.hasOwnProperty(property) && this.paramOptions.hasOwnProperty(property)){
			/**
			**execute callback for this property
			**/
			if (typeof(this.paramOptions.property).trim().toLowerCase()=="function"){
				this.paramOptions.property();
			}			
		}
	}	
	return typeof(this.paramOptions)!="undefined";
}
