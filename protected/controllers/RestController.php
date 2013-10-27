<?php 
class RestController extends Controller{
	/**
	 * @param  $dbname [optional]. Will use default db if not provided
	 * @return full db description
	 */
	public function actionIndex($dbname=null){
		$dbDescriptor=new DBDescriptor($dbname);
		echo $dbDescriptor->describeDatabase();
	}
	public function actionListDBs(){
		$dbDescriptor= new DBDescriptor();
		echo json_encode($dbDescriptor->listDatabases());
	}


}