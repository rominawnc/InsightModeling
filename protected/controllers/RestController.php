<?php 
class RestController extends Controller{
	public function actionIndex(){
		$dbDescriptor=new DBDescriptor();
		echo $dbDescriptor->describeDatabase();
	}

}