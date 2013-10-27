_.mixin({
	existy : function(val){
		return val != null;
	},
	truthy: function(val){
		return _.existy(val) && (val !== false);
	},
	falsy : function (val){
		return !_.truthy(val);
	},
	uuid: function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
	}

})