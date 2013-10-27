$(document).ready(function(){
	try{
		$("#DbData_database_name").select2({
			 width: 'resolve' ,
			query: function (query) {
				var data={results:[]};
				var dl= new DataLoader();
				dl.action="dbData/listDatabases?partial="+query.term;
				dl.load(function(result){
					for (var i = result.length - 1; i >= 0; i--) {
						data.results.push({id:result[i],text:result[i]});
					};
					query.callback(data);
				});
			}
		});

		
	}catch(e){
	}
});