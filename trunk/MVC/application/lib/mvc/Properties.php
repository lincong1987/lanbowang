<?php
require_once 'Util.php';
class Properties {
	private $filePath = '';
	private $inCharset;
	private $outCharset;
	function __construct($filePath, $inCharset = "utf-8", $outCharset = 'utf-8') {
		$this->filePath = $filePath;
		$this->inCharset = $inCharset;
		$this->outCharset = $outCharset;
	}

	function loadProperties() {
		$file_handle = fopen($this->filePath, "r");
		$arrData = array ();
		while (!feof($file_handle)) {
			$line = fgets($file_handle);
			$line = trim($line);
			if(Util::strStartWith($line,'#')||empty($line)){
				continue;
			}
			$line = iconv($this->inCharset, $this->outCharset, $line);
			$arrTemp = explode('=', $line);
			$arrData[$arrTemp[0]] = $arrTemp[1];
		}
		fclose($file_handle);
		return $arrData;
	}
}