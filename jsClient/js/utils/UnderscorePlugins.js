_.mixin({
	existy : function(val){
		return val != null;
	},
	truthy: function(val){
		return _.existy(val) && (val !== false);
	},
	falsy : function (val){
		return !_.truthy(val);
	}

})