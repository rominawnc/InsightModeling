<?php

class m131027_210344_createDB extends CDbMigration
{
	public function safeUp()
	{
		$sql="CREATE TABLE db_data (id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT, 
				database_name VARCHAR(250) NOT NULL,
				description VARCHAR(250) NULL,
				json_object TEXT NULL,
				PRIMARY KEY (id)
			) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
		$this->execute($sql);
	}

	public function safeDown()
	{
		$sql="DROP TABLE db_data;";
		$this->execute($sql);
		return false;
	}
}