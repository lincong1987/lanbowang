<?php
require_once DISK_ROOT.'/lib/mvc/config.php';
require_once DISK_ROOT.'/lib/mvc/IResultSupport.php';
class ActionChainResult implements IResultSupport {
	function doResult($objAction,$arrResultParams,$arrData=array(),$objEngine=null) {
		$nextPackageName = $arrResultParams["package"];
		if (empty ($nextPackageName)) {
			$nextPackageName = $arrResultParams['currentPackage'];
		} else {
		}
		$nextActionName = $arrResultParams['value'];
		$objEngine->doAction($nextPackageName, $nextActionName, $arrData, $objAction);
	}
}