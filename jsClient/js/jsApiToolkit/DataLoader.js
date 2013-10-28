function DataLoader (){
	this.response = {};
	this.success = null;
	this.dbname=null;
	this.action=null;
}

/**
 * setupData $_GET request to the selected endPoint
 * @param  {function} callbackSuccess what to do if everything goes well
 * @param  {function} callbackError   what to do if something fails
 * @return {DataLoader}	this
 */
DataLoader.prototype.load  = function (callbackSuccess, callbackError){
	var _url=Configuration.baseURL;
	_url+=this.action;
	$.ajax({
		url: _url,		
		method:"get",
		context:this
	}).done(function(data){
		this.response = JSON.parse(data);
		this.success=true;
		if (_.isFunction(callbackSuccess)){
			callbackSuccess(this.response);
		}else{
			$.pnotify({type:"success", text:LANG['request.success.data.loaded']});
		}
	}).fail(function(){		
		this.success=false;
		if (_.isFunction(callbackError)){
			callbackError(this.response);
		}else{
			$.pnotify({type:"error", text:LANG['request.error.generic']});
		}
	});
	return this;
};


/**
 * saveData $_POST request to the selected endPoint
 * @param  {function} callbackSuccess what to do if everything goes well
 * @param  {function} callbackError   what to do if something fails
 * @return {DataLoader}	this
 */
DataLoader.prototype.save   = function (data,callbackSuccess, callbackError){
	var _url=Configuration.baseURL;
	_url+=this.action;
	$.ajax({
		url: _url,		
		method:"post",
		context:this,
		data:data
	}).done(function(data){
		this.response = JSON.parse(data);
		this.success=true;
		if (_.isFunction(callbackSuccess)){
			callbackSuccess(this.response);
		}else{
			$.pnotify({type:"success", text:LANG['request.success.data.loaded']});
		}
	}).fail(function(){		
		this.success=false;
		if (_.isFunction(callbackError)){
			callbackError(this.response);
		}else{
			$.pnotify({type:"error", text:LANG['request.error.generic']});
		}
	});
	return this;
};
/**
 * @param {function} 
 */