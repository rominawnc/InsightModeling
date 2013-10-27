<?php
/* @var $this DbDataController */
/* @var $model DbData */


Yii::app()->clientScript->registerScript("dbName","ERMRuntime={dbname:'".$model->database_name."',id:".$model->id."};
	",CClientScript::POS_HEAD);

Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl.'/jsClient/js/erm.js',CClientScript::POS_END);
$this->breadcrumbs=array(
	'Db Datas'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List DbData', 'url'=>array('index')),
	array('label'=>'Manage DbData', 'url'=>array('admin')),
);
?>

<h1><?php echo $model->database_name;?></h1>

<canvas id="ermCanvas" width="500px" height="500px"></canvas>
