ERMRuntime.start = function start(){
	var cleanParents=function cleanParents(tmpArray,current){
		if(_.truthy(current.parent)){
			current.parent=null;
		}
		if(_.truthy(current.context)){
			current.context=null;
		}
		
		if(_.isArray(current)||_.isObject(current)){
			if (_.isArray(current.children)){
				current=current.children;
			}
			for (var i in current){
				if(i.match(/^[0-9]+$/)!==null && current.hasOwnProperty(i)){
					cleanParents(tmpArray,current[i]);	
				}
			}
			
		}
		return tmpArray; 
	};
	var self=this;
	var aio=new AllInOne();
	aio.action="dbData/describeDb/"+this.id;
	aio.setup();
	$("#saveERM").on("click", function(){
		event.preventDefault();
		var tmp = jQuery.extend(true, {}, aio.drawingArea.children);
		var drawingAreaJSON=cleanParents(tmp,tmp);	
		aio.action="dbData/updateERM/"+self.id;
		aio.saveERM({"DbData":{"json_object":JSON.stringify(drawingAreaJSON)}});
	});
}
ERMRuntime.start();