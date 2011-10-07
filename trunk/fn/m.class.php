<?php
class index{
	
	/**
	 *	获取首页置顶消息
	 *		@prama datatime $t 置顶死亡时间
	 */
	public function getIndexMsg($t=""){
		global $mysqlConfig;
		$t = empty($t) ? date("Y-m-d H:i:s", time()) : $t;
		$SQL = "select content, nid, addTime, stopTime from {$mysqlConfig["db_perfix"]}index_msg where stopTime >= '{$t}' and stopTime !='' limit 1";
		return sqlCount($SQL) == 0 ? 0 : sqlArray($SQL);
		}
		
	/**
	 *	获取TOP NAV 滚动消息
	 *		@prama datatime $t TOP marquee 滚动消息死亡时间
	 *		@param int $index TOP marquee 滚动消息条数，默认为1
	 */	
	public function getTopMsg($t="", $index=0){
		global $mysqlConfig;
		$index = $index == 0 ? 1 : $index;
		$t = empty($t) ? date("Y-m-d H:i:s", time()) : $t;
		$SQL = "select content, href, nid, addTime, stopTime from {$mysqlConfig["db_perfix"]}index_top_msg where stopTime >= '{$t}' and stopTime !='' limit {$index}";
		return sqlCount($SQL) == 0 ? 0 : sqlArray($SQL);
		}
		
	/**
	 *	获取滚动焦点图
	 *		@prama int $t 条数
	 */	
	public function getIndexSlideImages($t=0){
		global $mysqlConfig;
		$t = $t == 0 ? 1 : $t;
		$SQL = "select imagePath, href, id, content from {$mysqlConfig["db_perfix"]}index_slide_images limit {$t}";
		return sqlArray($SQL);
		}		
	
	}


class login{
	
	/**
	 *	获取登陆状态
	 *	@return boolean
	 */	
	public function isLogin(){
		return isset($_SESSION["user"]) ? true : false;
		}

	/**
	 *	登录
	 *	@param String $uid 用户名
	 *	@param String $pwd 密码
	 *	@return String 后台地址
	 */		
	public function loginIn($uid, $pwd){
		global $mysqlConfig;
		$sql = "select * from {$mysqlConfig["db_perfix"]}user where uid = '{$uid}' limit 1";
		if(sqlCount($sql) == 0){
			error("没有找到此用户", "alertGoBack");
			}
		$rs = sqlRow($sql);
		if($rs["pwd"] != md5($pwd)){
			error("密码错误", "alertGoBack");
			}
		//存入SESSION	
		$_SESSION["user"] = array(
			"uid" => $rs["uid"],
			"id" => $rs["id"],
			"nid" => $rs["nid"],
			"isAdmin" => $rs["isAdmin"] == 1 ? true : false
			);
		//return ($_SESSION["user"]["isAdmin"] ? "admin/index.php" : "user/index.php");			
		return true;
		}

	/**
	 *	登出
	 *	@return boolean
	 */		
	public function loginOut(){
		return session_unset() ? (session_destroy()?true:false) : false;
		}
	
	}
	
	
class user{

	/**
	 *	获取登陆状态
	 *	@return boolean
	 */	
	public function isLogin(){
		return isset($_SESSION["user"]) ? true : false;
		}

	/**
	 *	获取管理员状态
	 *	@return boolean
	 */	
	public function isAdmin(){
		return isset($_SESSION["user"]) ? ($_SESSION["user"]["isAdmin"]?true:false) : false;
		}
			
	/**
	 *	获取用户信息
	 *	@return boolean
	 */		
	public function getUserSession(){
		return isset($_SESSION["user"]) ? $_SESSION["user"] : 0;		
		}
	
	/**
	 *	获取用户信息
	 *	@return boolean
	 */		
	public function add($user){
		global $mysqlConfig;
		if(is_object($user)){
			error("用户不是对象", "alertGoBack");
			}			
				
		$sql = "INSERT INTO {$mysqlConfig["db_perfix"]}user SET 
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
				`idNumber`='{$user["idNumber"]}';";				
		
		return sqlExecute($sql);		
		}	
	}	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

?>