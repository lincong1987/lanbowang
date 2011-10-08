<?php

require_once 'Util.php';
require_once 'Properties.php';
$configProperties = new Properties(realpath('.').'/config/project.cfg');
$arrConfigDatas = $configProperties->loadProperties();
foreach($arrConfigDatas as $paramName=> $configData){

	$paramName=strtoupper(trim($paramName));
	$configData=trim($configData);
	define($paramName,$configData);
}




