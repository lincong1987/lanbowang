<?php
/**
 *	ActionSupport
 *
 *	@Author		lincong
 *
 *	@Date		2011/10/09
 *
 */
class ActionSupport{
	public $mysqlConfig = array();
	
	//定义成员变量
	const ERROR = "error";
	const SUCCESS = "success"; //默认
	const INPUT = "input";
	const NONE = "none";
	
	protected $ACTION_ERRORS = array();
	
	public function __construct(){
		//获取数据库信息
		global $mysqlConfig;
		$this->mysqlConfig = $mysqlConfig;
		}

	public function getActionError(){
		return $this->ACTION_ERRORS;
		}
	
	public function addActionError($key, $value){
		$this->ACTION_ERRORS += array(
			$key => $value
			);
		}
	//
	public function hasErrors(){
		return !empty($this->ACTION_ERRORS);
		}
			
	public function execute(){
		return self :: SUCCESS;
		}
	}



























?>