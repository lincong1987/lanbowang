<?php
class IntercepterSupport {
	protected $doFunctionName;
	public  function beforeDoAction($action,$arrData) {
	}

	public function afterDoAction($action,$arrData,$result) {
	}
	public function __construct($doFunctionName="index"){
		$this->doFunctionName=$doFunctionName;
	}
}