ERMRuntime.start = function start(){
	var aio=new AllInOne();
	aio.action="dbData/describeDb/"+this.id;
	aio.setup();
}
ERMRuntime.start();