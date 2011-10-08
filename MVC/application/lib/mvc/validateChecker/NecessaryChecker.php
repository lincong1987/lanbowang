<?php
require_once DISK_ROOT.'/lib/mvc/IValidateCheckerSupport.php';
class NecessaryChecker implements IValidateCheckerSupport {
	public function check($fieldName='',$fieldValue, $arrParams = array (),$arrayRequestData=array()) {
			return in_array($fieldName,$arrayRequestData);
		}

	}

