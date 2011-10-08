<?php

/*
 * Created on 2011-3-9
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
require_once DISK_ROOT . './lib/MVC/ActionSupport.php';
class LoginAction extends ActionSupport {
	private $username;
	private $password;
	private $flag;
	public function getUsername() {
		return $this->username;
	}
	public function setUsername($username) {
		$this->username = $username;
	}
	public function getPassword() {
		return $this->password;
	}
	public function setPassword($password) {
		$this->password = $password;
	}
	public function login() {
		if ($this->username == "admin" && $this->password == "admin") {
			$this->flag = true;
			return parent :: SUCCESS;
		} else {
			$this->flag = false;
			$this->addErrMsg('action', '用户名或密码错误');
			return parent :: ERROR;
		}

	}
	public function validateLogin() {
		if (empty ($this->username)) {
			$this->addErrMsg('username', $this->getText('is_empty', $this->getText('username')));
		}
		if (empty ($this->password)) {
			$this->addErrMsg('password', '密码不能为空');
		}
	}

	public function getFlag() {
		return $this->flag;
	}
}
?>
