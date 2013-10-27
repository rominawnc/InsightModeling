<?php
/* @var $this DbDataController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Db Datas',
);

$this->menu=array(
	array('label'=>'Create DbData', 'url'=>array('create')),
	array('label'=>'Manage DbData', 'url'=>array('admin')),
);
?>

<h1>Db Datas</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
