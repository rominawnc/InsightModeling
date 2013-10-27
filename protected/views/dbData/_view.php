<?php
/* @var $this DbDataController */
/* @var $data DbData */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('database_name')); ?>:</b>
	<?php echo CHtml::encode($data->database_name); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('description')); ?>:</b>
	<?php echo CHtml::encode($data->description); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('json_object')); ?>:</b>
	<?php echo CHtml::encode($data->json_object); ?>
	<br />


</div>