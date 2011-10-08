<?php
require_once 'config.php';
require_once 'Exception.php';
function slefExceptionHandler($exception) {
	if (true) {
		echo '<font color=red><br>异常信息</font>:<br>' . $exception->__toString();
	}

}
class Common {

	static function parseURI($uri) {
		if (!Util :: strEndWith($uri, '/')) {
			$uri = $uri . "/";
		}

		if (strpos($uri, REQUEST_SUFIX) === false) {
			throw new RequestPathException();
		} else {
		}

		if (Util :: strLastPos($uri, REQUEST_SUFIX) !== strpos($uri, REQUEST_SUFIX)) {
			throw new RequestPathException();
		}
		$pattern = REQUEST_SUFIX;
		$pattern1 = "/^(\/.+\/)*([^\.]+\\$pattern\/){1}.*/X";
		$pattern2 = "/^(\/.+\/)*([^\.]+\\$pattern\?){1}.*/X";
		if (!preg_match($pattern1, $uri)) {
			if (!preg_match($pattern2, $uri)) {
				throw new RequestPathException();
			}

		} else {
		}
		$arrTemp = explode(REQUEST_SUFIX, $uri);
		$packageName = "";
		$actionName = "";
		$arrResult = array ();
		$arrDatas = array ();
		$arrRequestPath = explode('/', $arrTemp[0]);
		$arrDatasTemp = explode('/', $arrTemp[1]);
		$pathLeavel = count($arrRequestPath);
		$count = count($arrRequestPath);
		$actionName = $arrRequestPath[$count -1];
		if ($count == 0) {
			throw new RequestPathException();
		}

		if ($count -2 >= 0) {
			$packageName = $arrRequestPath[$count -2];
		} else {
			$packageName = '';
		}
		$dataCount = count($arrDatasTemp);
		for ($i = 1; $i < $dataCount -1; $i = $i +2) {
			$arrDatas[$arrDatasTemp[$i]] = $arrDatasTemp[$i +1];
		}

		$arrResult["packageName"] = $packageName;
		$arrResult["actionName"] = $actionName;
		$arrResult["data"] = $arrDatas;

		return $arrResult;
	}

}