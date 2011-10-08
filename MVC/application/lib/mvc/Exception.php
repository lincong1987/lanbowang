<?php


class RequestPathException extends Exception {
	public function __construct($message = '您所访问的路径不存在', $code = 0) {
		parent :: __construct($message, $code);
	}
	public function __toString() {
		return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
	}

}

class IntercepterPathException extends Exception {
	public function __construct($message = '', $code = 0) {
		if (empty ($message)) {
			$message = '此请求所需的拦截器不存在';
		} else {
			$message = "此请求所需的拦截器:<font color=red><b>{$message}</b></font>不存在";
		}

		parent :: __construct($message, $code);
	}
	public function __toString() {
		return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
	}

}

class ResultException extends Exception {
	public function __construct($message = '', $code = 0) {
		if (empty ($message)) {
			$message = '无此请求所需的返回结果的配置信息';
		} else {
			$message = "无此请求所需的返回结果:<font color=red><b>{$message}</b></font>的配置信息";
		}

		parent :: __construct($message, $code);
	}
	public function __toString() {
		return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
	}

}

class PhpIncludeException extends Exception {
	public function __construct($message = '', $code = 0) {
		if (empty ($message)) {
			$message = '此请求所需的PHP文件不存在';
		} else {
			$message = "此请求所需的PHP文件:<font color=red><b>{$message}</b></font>不存在";
		}

		parent :: __construct($message, $code);
	}
	public function __toString() {
		return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
	}

}
class ClassLoadException extends Exception {
	public function __construct($message = '', $code = 0) {
		if (empty ($message)) {
			$message = '此请求所需的类不存在';
		} else {
			$message = "此请求所需的类:<font color=red><b>{$message}</b></font>不存在";
		}

		parent :: __construct($message, $code);
	}
	public function __toString() {
		return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
	}

}
class FileLoadException extends Exception {
	public function __construct($message = '', $code = 0) {
		if (empty ($message)) {
			$message = '此请求所需的资源文件不存在';
		} else {
			$message = "此请求所需的资源文件:<font color=red><b>{$message}</b></font>不存在";
		}

		parent :: __construct($message, $code);
	}
	public function __toString() {
		return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
	}
}

class DirLoadException extends Exception {
	public function __construct($message = '', $code = 0) {
		if (empty ($message)) {
			$message = '此请求所需的资源文件目录不存在';
		} else {
			$message = "此请求所需的资源文件目录:<font color=red><b>{$message}</b></font>不存在";
		}

		parent :: __construct($message, $code);
	}
	public function __toString() {
		return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
	}
}

class XMLPrermissValidateException extends Exception {
	public function __construct($message = '', $code = 0) {
		if (empty ($message)) {
			$message = '此XML校验的前置条件不存在';
		} else {
			$message = "<font color=red>$message[0]</font>此XML校验的前置条件:<font color=red><b>{$message[1]}</b></font>不存在";
		}

		parent :: __construct($message, $code);
	}
	public function __toString() {
		return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
	}
}
?>
