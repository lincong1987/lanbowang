<?php
require_once DISK_ROOT.'/lib/mvc/config.php';
require_once DISK_ROOT.'/lib/mvc/IResultSupport.php';
class JSONResult implements IResultSupport {
	function doResult($objAction,$arrResultParams,$arrData=array(),$objEngine=null) {
		$attrName=$arrResultParams['arrtibute'];
		if(empty($attrName)){
			$attrName='JSONData';
		}
		$functionName='get'.ucfirst($attrName);
		$JSONData=$objAction->$functionName();
		echo json_encode($JSONData);
	}
}