<?php
include("ActionSupport.php");

/**
 *	首页初始化
 *	@Author lincong
 *	@Date	2011/10/09
 */
class index extends ActionSupport{
	
	/**
	 *	获取首页置顶消息
	 *		@prama datatime $t 置顶死亡时间
	 */
	public function getIndexMsg($t=""){
		$t = empty($t) ? date("Y-m-d H:i:s", time()) : $t;
		$SQL = "select content, nid, addTime, stopTime from ".$this->mysqlConfig["db_perfix"]."index_msg where stopTime >= '{$t}' and stopTime !='' limit 1";
		return sqlCount($SQL) == 0 ? 0 : sqlArray($SQL);
		}
		
	/**
	 *	获取TOP NAV 滚动消息
	 *		@prama datatime $t TOP marquee 滚动消息死亡时间
	 *		@param int $index TOP marquee 滚动消息条数，默认为1
	 */	
	public function getTopMsg($t="", $index=0){
		$index = $index == 0 ? 1 : $index;
		$t = empty($t) ? date("Y-m-d H:i:s", time()) : $t;
		$SQL = "select content, href, nid, addTime, stopTime from ".$this->mysqlConfig["db_perfix"]."index_top_msg where stopTime >= '{$t}' and stopTime !='' limit {$index}";
		return sqlCount($SQL) == 0 ? 0 : sqlArray($SQL);
		}
		
	/**
	 *	获取滚动焦点图
	 *		@prama int $t 条数
	 */	
	public function getIndexSlideImages($t=0){
		$t = $t == 0 ? 1 : $t;
		$SQL = "select imagePath, href, id, content from ".$this->mysqlConfig["db_perfix"]."index_slide_images limit {$t}";
		return sqlArray($SQL);
		}		
	
	public function execute(){
		return parent :: SUCCESS;
		}
	}


class login extends ActionSupport{
	
	/**
	 *	获取登陆状态
	 *	@return boolean
	 */	
	public function isLogin(){
		return isset($_SESSION["user_arr"]) ? true : false;
		}

	/**
	 *	登录
	 *	@return String 后台地址
	 */		
	public function loginIn(){
		$uid = isset($_REQUEST["uid"]) ? trim($_REQUEST["uid"]) : "";
		if(empty($uid)){
			$this->addActionError("loginIn", "用户名为空");
			return  $this->ERROR;
			}
		$pwd = isset($_REQUEST["pwd"]) ? $_REQUEST["pwd"] : "";
		if(empty($uid)){
			parent :: addActionError("loginIn", "密码为空");
			return  $this->ERROR;
			}	
		
		$sql = "select * from ".$this->mysqlConfig["db_perfix"]."user where uid = '{$uid}' limit 1";
		if(sqlCount($sql) == 0){
			$this->addActionError("loginIn", "没有找到此用户");
			return  $this->ERROR;
			}
			
		//获取一行数据
		$rs = sqlRow($sql);
		if($rs["pwd"] != md5($pwd)){
			error("密码错误", "alertGoBack");
			}
		//存入SESSION	
		$_SESSION["user_arr"] = array(
			"uid" => $rs["uid"],
			"id" => $rs["id"],
			"nid" => $rs["nid"],
			"isAdmin" => $rs["isAdmin"] == 1 ? true : false
			);
		//return ($_SESSION["user_arr"]["isAdmin"] ? "admin/index.php" : "user/index.php");			
		return parent :: SUCCESS;
		}

	/**
	 *	登出
	 *	@return boolean
	 */		
	public function loginOut(){
		return session_unset() ? 
			(session_destroy() ? parent :: SUCCESS : parent :: ERROR) 
			: parent :: ERROR;
		}


	public function execute(){
		return parent ::  SUCCESS;
		}	
	}
	
	
class user extends ActionSupport{

	/**
	 *	获取登陆状态
	 *	@return boolean
	 */	
	public function isLogin(){
		return isset($_SESSION["user_arr"]) ? true : false;
		}

	/**
	 *	获取管理员状态
	 *	@return boolean
	 */	
	public function isAdmin(){
		//die(print_r($_SESSION["user_arr"]));
		return ($_SESSION["user_arr"]["isAdmin"]) ? (isset($_SESSION["user_arr"]) ? true : false) : false;
		}

	/**
	 *	获取用户信息
	 *	@return boolean
	 */		
	public function getUserSession(){
		return isset($_SESSION["user_arr"]) ? $_SESSION["user_arr"] : 0;
		}
	
	/**
	 *	获取用户信息
	 *	@return boolean
	 */		
	public function add(){
		
		//定义user对象
		$user = array(
			"uid" => isset($_POST["uid"]) ? trim($_POST["uid"]) : "",
			"nid" => isset($_POST["nid"]) ? trim($_POST["nid"]) : "",
			"pwd" => isset($_POST["pwd"]) ? md5(trim($_POST["pwd"])) : "",
			"pwd2" => isset($_POST["pwd2"]) ? md5(($_POST["pwd2"])) : "",
			"idNumber" => isset($_POST["idNumber"]) ? md5(($_POST["idNumber"])) : "",
			"sex" => isset($_POST["sex"]) ? trim($_POST["sex"]) : 1,
			"tel" => isset($_POST["tel"]) ? trim($_POST["tel"]) : "",
			"tel2" => isset($_POST["tel2"]) ? trim($_POST["tel2"]) : "",
			"mob" => isset($_POST["mob"]) ? trim($_POST["mob"]) : "",
			"qq" => isset($_POST["qq"]) ? trim($_POST["qq"]) : "",
			"msn" => isset($_POST["msn"]) ? trim($_POST["msn"]) : "",
			"email" => isset($_POST["email"]) ? trim($_POST["email"]) : "",
			"entryDate" => isset($_POST["entryDate"]) ? trim($_POST["entryDate"]) : date("Y-m-d", time()),
			"age" => isset($_POST["age"]) ? trim($_POST["age"]) : 20,
			"depart" => isset($_POST["depart"]) ? trim($_POST["depart"]) : 2,
			"isAdmin" => isset($_POST["isAdmin"]) ? trim($_POST["isAdmin"]) : 0,
			"address" => isset($_POST["address"]) ? trim($_POST["address"]) : "未填写"	
			);
		
		if(empty($user["uid"])){
			parent :: addActionError("add", "用户名为空");
			return  parent :: ERROR;			
			}
			
		if(empty($user["pwd"])){
			parent :: addActionError("add", "密码为空");
			return  parent :: ERROR;			
			}
			
		if($user["pwd"] != $user["pwd2"]){
			parent :: addActionError("add", "密码不一致");
			return  parent :: ERROR;			
			}
		
		if(!is_array($user)){
			parent :: addActionError("add", "用户类型不是数组");
			return  parent :: ERROR;
			}			
				
		$sql = "INSERT INTO ".$this->mysqlConfig["db_perfix"]."user SET 
				`uid`='{$user["uid"]}',
				`nid`='{$user["nid"]}',
				`pwd`='{$user["pwd"]}',
				`sex`='{$user["sex"]}',
				`tel`='{$user["tel"]}',
				`mob`='{$user["mob"]}',
				`qq`='{$user["qq"]}',
				`msn`='{$user["msn"]}',
				`tel2`='{$user["tel2"]}',
				`email`='{$user["email"]}',
				`entryDate`='{$user["entryDate"]}',
				`age`='{$user["age"]}',
				`depart`='{$user["depart"]}',
				`address`='{$user["address"]}',
				`isAdmin`='{$user["isAdmin"]}',
				`idNumber`='{$user["idNumber"]}';";
		
		$rs = sqlExecute($sql);
		return $rs ? $this->SUCCESS : $this->ERROR;	
		}	
	
	public function ModiPassword(){
		if(!$this->isLogin()){
			$this->addActionError("ModiPassword", "用户没有登录");
			return parent::ERROR;
			}
		$oldPwd = isset($_REQUEST['oldPwd']) ? $_REQUEST['oldPwd'] : "";
		if(empty($oldPwd)){
			$this->addActionError("ModiPassword", "旧密码没有填写");
			return parent::ERROR;
			}
		$newPwd = isset($_REQUEST['newPwd']) ? $_REQUEST['newPwd'] : "";
		$newPwd_1 = isset($_REQUEST['newPwd_1']) ? $_REQUEST['newPwd_1'] : "";
		if(empty($newPwd_1) || empty($newPwd) || ($newPwd_1 != $newPwd)){
			$this->addActionError("ModiPassword", "新密码可能没有填写");
			$this->addActionError("ModiPassword", "两次填写的新密码可能不一致");
			return parent::ERROR;
			}
		if($oldPwd == $newPwd){
			$this->addActionError("ModiPassword", "你填写的新密码与就密码一致");
			return parent::ERROR;
			}
		$sql = "select id, pwd from ".$this->mysqlConfig["db_perfix"]."user where id = '{$_SESSION["user_arr"]["id"]}'";
		$rs = sqlRow($sql);
		if($rs["pwd"] != md5($oldPwd)){
			$this->addActionError("ModiPassword", "旧密码填写错误");
			return parent::ERROR;			
			}
		$sql = "update ".$this->mysqlConfig["db_perfix"]."user set pwd = '".md5($newPwd)."' where id = '{$rs["id"]}'";	
		$rs = sqlExecute($sql);
		return $rs ? parent::SUCCESS : parent::ERROR;	
		}

	public function execute(){
		return  $this->SUCCESS;
		}	
	}	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

?>