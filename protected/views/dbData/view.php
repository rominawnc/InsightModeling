<?php
/* @var $this DbDataController */
/* @var $model DbData */

$this->breadcrumbs=array(
	'Db Datas'=>array('index'),
	$model->id,
);

$this->menu=array(
	array('label'=>'List DbData', 'url'=>array('index')),
	array('label'=>'Create DbData', 'url'=>array('create')),
	array('label'=>'Update DbData', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete DbData', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage DbData', 'url'=>array('admin')),
);
?>

<h1>View DbData #<?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'database_name',
		'description',
		'json_object',
	),
)); ?>
