<?php   /* @var $this Controller */ ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="en" />

	<!-- blueprint CSS framework -->
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/screen.css" media="screen, projection" />
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/print.css" media="print" />
	<!--[if lt IE 8]>
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/ie.css" media="screen, projection" />
	<![endif]-->

	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/main.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/form.css" />


	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/config.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/lang/en.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-2.0.3.js"></script>	
	<script src="http://underscorejs.org/underscore.js" type="text/javascript"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/utils/UnderscorePlugins.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/libs/pnotify/jquery.pnotify.js"></script>
	<link rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/libs/pnotify/jquery.pnotify.default.css" />
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/libs/select2/select2.js"></script>
	<link rel="stylesheet" href="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/libs/select2/select2.css" />
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/canvas/ContextualHelper.js"></script>	
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/canvas/TextObject.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/canvas/ParamHandler.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/canvas/Square.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/canvas/Line.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/canvas/CanvasObject.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/jsApiToolkit/DataMapper.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/jsApiToolkit/DataLoader.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/jsApiToolkit/AllInOne.js"></script>
	<script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl; ?>/jsClient/js/init.js"></script>	
	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
</head>

<body>

<div class="container" id="page">

	<div id="header">
		<div id="logo"><?php echo CHtml::encode(Yii::app()->name); ?></div>
	</div><!-- header -->

	<div id="mainmenu">
		<?php $this->widget('zii.widgets.CMenu',array(
			'items'=>array(
				array('label'=>'New ERM', 'url'=>array('/dbData/create')),
			),
		)); ?>
	</div><!-- mainmenu -->
	<?php if(isset($this->breadcrumbs)):?>
		<?php $this->widget('zii.widgets.CBreadcrumbs', array(
			'links'=>$this->breadcrumbs,
		)); ?><!-- breadcrumbs -->
	<?php endif?>

	<?php echo $content; ?>

	<div class="clear"></div>

	<div id="footer">
		Copyright &copy; <?php echo date('Y'); ?> by My Company.<br/>
		All Rights Reserved.<br/>
		<?php echo Yii::powered(); ?>
	</div><!-- footer -->

</div><!-- page -->

</body>
</html>
