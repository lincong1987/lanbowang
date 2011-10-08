<?php
class Util {
	static function traversalDir($dir = ".") {
		$arrFileNames = array ();
		if ($handle = opendir($dir)) {
			while (false !== ($file = readdir($handle))) {
				if ($file != "." && $file != ".." && strpos($file, ".") !== false) {
					$arrFileNames[] = $file;
				}
			}
			closedir($handle);
		}
		return $arrFileNames;
	}
	static function strLastPos($haystack, $needle) {
		$lastPos = false;
		$pos = strpos($haystack, $needle);
		if ($pos == strlen($haystack)) {
			return $pos;
		}
		while ($pos !== false) {
			$lastPos += $pos+1;
			$haystack = substr($haystack, $pos +1);
			$pos = strpos($haystack, $needle);
		}
		return $lastPos-1;
	}
	static function strStartWith($haystack, $needle) {
	return strpos($haystack,$needle)===0;
	}
	static function strEndWith($haystack, $needle) {
	return self::strLastPos($haystack,$needle)===strlen($haystack)-strlen($needle);
	}
}

