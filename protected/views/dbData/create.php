<?php
/* @var $this DbDataController */
/* @var $model DbData */

$this->breadcrumbs=array(
	'Db Datas'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List DbData', 'url'=>array('index')),
	array('label'=>'Manage DbData', 'url'=>array('admin')),
);
?>

<h1>Create DbData</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>