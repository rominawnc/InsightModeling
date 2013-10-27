<?php
/* @var $this DbDataController */
/* @var $model DbData */

$this->breadcrumbs=array(
	'Db Datas'=>array('index'),
	$model->id=>array('view','id'=>$model->id),
	'Update',
);

$this->menu=array(
	array('label'=>'List DbData', 'url'=>array('index')),
	array('label'=>'Create DbData', 'url'=>array('create')),
	array('label'=>'View DbData', 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>'Manage DbData', 'url'=>array('admin')),
);
?>

<h1>Update DbData <?php echo $model->id; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>