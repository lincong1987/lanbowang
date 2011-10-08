<?php
class ActionSupport {
	private $chainData = array ();
	const SUCCESS = "success";
	const ERROR = "error";
	const INDEX = "index";
	const VALIDATE_ERROR = "validateError";
	private $arrLanguagePacks = array ();
	private $arrPageInfo = array ();
	protected $errMsg=array();
	public function __construct(){

	}
	public function addChainData($arrData) {
		$this->chainData += $arrData;
	}
	public function getChainData($key = "") {
		if ($key == "") {
			return $this->chainData;
		} else {
		}
		return $this->chainData[$key];
	}
	public function index() {
		return self :: INDEX;
	}
	public function hasErrMsg() {
		return !empty($this->errMsg);
	}
	public  function addErrMsg($field, $msg) {
		$this->errMsg += array (
		$field => $msg
		);
	}
	public  function getErrMsg() {
		return $this->errMsg ;
	}
	public function validate() {
	}
	public final function __call($Key, $Arg) {
		if (!preg_match("/^(get|set).*/", $Key)) {
		} else {
			return null;
		}

	}
	public function getParam($name) {
		if ($_SERVER['REQUEST_METHOD'] == GET) {
			return $_GET[$name];
		} else {
			return $_POST[$name];
		}
	}
	public function addLanguagePack($languagePack) {
		$this->arrLanguagePacks += $languagePack;
	}
	public function getText($key, $pattern = array ()) {
		$userLangusge = $this->getSessionParam('userLanguage');
		if (empty ($userLangusge)) {
			$userLangusge = 'cn_zh';
		}
		$text = false;
		$text = $this->findText($key, 'class_' . $userLangusge);
		if ($text === false) {
			$text = $this->findText($key, 'class_');
		}
		if ($text === false) {
			$text = $this->findText($key, 'package_' . $userLangusge);
		}
		if ($text === false) {
			$text = $this->findText($key, 'package_');
		}
		if ($text === false) {
			$text = $this->findText($key, 'global_' . $userLangusge);
		}
		if ($text === false) {
			$text = $this->findText($key, 'global_');
		}
		if ($text !== false&&!empty($pattern)) {
			if(is_string($pattern)){
				$pattern=(array)$pattern;
			}
			$text = preg_replace('/{\s*/', '{', $text);
			$text = preg_replace('/\s*}/', '}', $text);
			$size=count($pattern);
			for ($i = 0; $i < $size; $i++) {
				$m = '{' . $i . '}';
				if (strpos($text, $m) !== false) {
					$text = str_replace($m, $pattern[$i], $text);
				}
			}
		}
		return $text;
	}
	protected function getSessionParam($key) {
		return $_SESSION[$key];
	}
	public function getL() {
		return $this->arrLanguagePacks;
	}
	private function findText($msgKey, $packFlag) {
		$languagePack = $this->arrLanguagePacks[$packFlag];
		if (!empty ($languagePack)) {
			if (array_key_exists($msgKey, $languagePack)) {
				return $languagePack[$msgKey];
			}
		}
		return false;
	}
	protected function addPageInfo($key, $text) {
		$this->arrPageInfo += array (
		$key => $text
		);
	}
	public function getPageInfo() {
		return $this->arrPageInfo;

	}
}