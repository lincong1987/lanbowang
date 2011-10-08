<?php
require_once DISK_ROOT.'/lib/mvc/IValidateCheckerSupport.php';
class EmptyChecker implements IValidateCheckerSupport {
	public function check($fieldName='',$fieldValue, $arrParams = array (),$arrayRequestData=array()) {

		if (in_array('trim', $arrParams)) {
			$trim = $arrParams['trim'];
			if ($trim == 'true') {
				$fieldValue = trim($fieldValue);
			}
			elseif ($trim == 'ltrim') {
				$fieldValue = ltrim($fieldValue);
			}
			elseif ($trim == 'rtrim') {
				$fieldValue = rtrim($fieldValue);
			}else{}

		}
return !empty($fieldValue);
	}

}