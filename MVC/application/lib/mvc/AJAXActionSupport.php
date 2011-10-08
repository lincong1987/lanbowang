<?php
require_once 'ActionSupport.php';
class AJAXActionSupport extends  ActionSupport{
	protected $JSONData = array ();
	public function addJSONData($arrData) {
		$this->JSONData += $arrData;
	}
	public function getJSONData(){
		return $this->JSONData;
	}
}