<?php
class DBDescriptor{
	public function describeDatabase(){
		$return=array();		
		$showTablesSQL="show tables;";
		$showTables=Yii::app()->db->createCommand($showTablesSQL)->queryAll();
		foreach ($showTables as $key => $tableValue) {					
			$tableValue=array_values($tableValue);
			if (is_array($tableValue) && isset($tableValue[0])){
				$tableName=$tableValue[0];
				$tableDescription=$this->describeTable($tableName);
				$return[]=array('table'=>$tableName,'showCreate'=>$tableDescription,'relationships'=>$this->findBelongsToRelationships($tableName));
			}
		}

		return json_encode($return);
	}

	public function describeTable($tableName){
		$showTableSQL="show create table `$tableName`";
		$showTable=Yii::app()->db->createCommand($showTableSQL)->queryAll();
		if(!is_array($showTable))
			return null;
		if(!isset($showTable[0]))
			return null;
		return $showTable[0]["Create Table"];
	}
/**
+-----------------------------------------------------------------------------+
| list_of_fks  for sippsAssessment DB       (partial example)                 |
+-----------------------------------------------------------------------------+
| answer.id_questionitem -> question_item.id                                  |
| answer.id_test -> test.id                                                   |
| card.id_cardtype -> card_type.id                                            |
+-----------------------------------------------------------------------------+
**@return table_name         | column_name                | referenced_table_name   | column_name
**@return answer             | id_questionitem            | question_item           | id          
**/
	public function findBelongsToRelationships($tableName){
		$curdb  = explode('dbname=', Yii::app()->db->connectionString);
		$dbName=$curdb[1];
		$sql="SELECT table_name,column_name,referenced_table_name,referenced_column_name
			  FROM INFORMATION_SCHEMA.key_column_usage  WHERE table_name=:tableName AND referenced_table_schema = :dbName
			  AND referenced_table_name IS NOT NULL  ORDER BY table_name, column_name;";
		$relationships=Yii::app()->db->createCommand($sql)->bindParam("dbName",$dbName)->bindParam("tableName",$tableName)->queryAll();
		return $relationships;

	}
}