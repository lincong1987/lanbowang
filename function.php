<?php
include("inc/config.php");
include("fn/m.class.php");
$mysqlError = mysql_error();


/**
* 输出json
*
* @param string $state
* @param string $msg
* @param string $error
* @param string $type
* @return string | json
*/
function error($str = "", $type = "die", $href=""){
	//global $debug;
	$str = !empty($str) ? $str : "未定义的错误";
	$ACTION_ERRORS = $str;

	if(is_array($str)){
		$ACTION_ERRORS = "";
		foreach($str as $k => $v){
			$ACTION_ERRORS = "<B>[".$k."]</B>".$v."<BR>";
			}
		}

	$href = !empty($href) ? $href : "#";
	$err_img = WEB_PATH."src/img/icon_error.gif";
	$debug = debug_backtrace();
	$debug = $debug[0];
	//print_r($debug);
	$d = array(
		"file" => $debug["file"],
		"line" => $debug["line"],
		"function" => $debug["function"],
		"args" => $debug["args"]
		);
	$_d = "";	
	if(debug){
		$_d = "trace:
			<br>&nbsp;&nbsp;&nbsp;&nbsp;<b>[file:]</b>{$d["file"]}
			<br>&nbsp;&nbsp;&nbsp;&nbsp;<b>[line:]</b>{$d["line"]}
			<br>&nbsp;&nbsp;&nbsp;&nbsp;<b>[function:]</b>{$d["function"]}
			";
		}	
	switch($type){
		/*
			goBack 
		*/			
		case "goBack" :
			die("<html><body><script>
			setTimeout('history.back()', 2000);			
			</script><div style='font-size:12px; font-family:Verdana;background:url({$err_img}) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px; border:1px solid #8cb7d7; margin:10px; color:#369'><br>错误:{$ACTION_ERRORS}<br>".$_d."<br>正在返回...</div></body></html>");
			break;
		/*
			alertGoBack 
		*/				
		case "alertGoBack" :
			die("<html><body><script>
			var str = ".json_encode($str).";
			alert(str);
			history.back();
			</script><div style='font-size:12px; font-family:Verdana;background:url({$err_img}) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px; border:1px solid #8cb7d7; margin:10px; color:#369'><br>错误:{$ACTION_ERRORS}<br>".$_d."</div></body></html>");
			break;
		/*
			alert 
		*/	
		case "alert" :
			die("<html><body><script>
			var str = ".json_encode($str).";
			alert(str);
			</script><div style='font-size:12px; font-family:Verdana;background:url({$err_img}) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px; border:1px solid #8cb7d7; margin:10px; color:#369'><br>错误:{$ACTION_ERRORS}<br>".$_d."</div></body></html>");
			break;
		/*
			-1 
		*/	
		case "-1" :
			die("<html><body><script>
			//var str = ".json_encode($str).";
			//alert(str);
			history.go(-1);
			</script><div style='font-size:12px; font-family:Verdana;background:url({$err_img}) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px; border:1px solid #8cb7d7; margin:10px; color:#369'><br>错误:{$ACTION_ERRORS}<br>".$_d."</div></body></html>");
			break;
		/*
			alertGoTo 
		*/			
		case "alertGoTo" :
			die("<html><body><script>
			var _href = ".json_encode($href).", str = ".json_encode($str).";
			alert(str);
			location.href = _href;
			</script><div style='font-size:12px; font-family:Verdana;background:url({$err_img}) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px; border:1px solid #8cb7d7; margin:10px; color:#369'><br>错误:{$ACTION_ERRORS}<br>".$_d."</div></body></html>");
			break;
		/*
			goTo 
		*/			
		case "goTo" :
			die("<html><body><script>
			var _href = ".json_encode($href).", str = ".json_encode($str).";
			//alert(str);
			location.href = _href;
			</script><div style='font-size:12px; font-family:Verdana;background:url({$err_img}) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px; border:1px solid #8cb7d7; margin:10px; color:#369'><br>错误:{$ACTION_ERRORS}<br>".$_d."</div></body></html>");
			break;

		case "die" :
			die("<html><body><div style='font-size:12px; font-family:Verdana;background:url({$err_img}) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px; border:1px solid #8cb7d7; margin:10px; color:#369'><br>错误:{$ACTION_ERRORS}<br>".$_d."</div></body></html>");
			break;
		case "json" :
			jsonError("fail", $str);
			break;
		default:
			echo "<!--error info --><div style='font-size:12px; font-family:Verdana;background:url({$err_img}) #F6FBFF no-repeat 0px 0px; height:117px; width:550px; overflow-x: hidden; overflow-y: auto; padding-left:140px; border:1px solid #8cb7d7; margin:10px; color:#369'><br>错误:{$ACTION_ERRORS}<br>".$_d."</div><!--error info -->";
			break;		
		}
	}

/**
* 输出json
*
* @param string $state
* @param string $msg
* @param string $error
* @param string $type
* @return string | json
*/
function jsonError($state="undefined",$msg="undefined",$error="undefined", $type='json'){
		
	$tmp = array("state" => $state, "msg" => $msg, "error" => $error);
	switch($type){		
		case "easyui" : 
		$tmp = array("rows" => $msg, "total" => $state, "debug" => $error);
		header('Content-type: application/json; charset=UTF-8');
		die(json_encode($tmp));
		exit();
		break;
		case "return" : 
		//$tmp = array("state" => $state, "msg" => $msg, "error" => $error);
		return (json_encode($tmp));
		break;		
		}
	header('Content-type: application/json; charset=UTF-8');	
	$jsoncallback = isset($_GET["jsoncallback"]) ? $_GET["jsoncallback"] : "";
	if(empty($jsoncallback)){die(json_encode($tmp));}else{die($jsoncallback."(".json_encode($tmp).")");}
	}




/**
* 执行SQL
*
* @param string $sql
* @param string $msg
* @param string $type
* @return bolean
*/
function getResult($sql,$msg = "",$type = "html"){
	global $system;
	global $mysqlConfig;
	$msg = !empty($msg) ? $msg : "";
	mysql_query("set names {$mysqlConfig["db_charset"]}");
	$result = mysql_query($sql) or error("getResult Filed<br><span style='font-size:12px; font-family:Verdana;'>{$msg}<br>{$sql}<br>".mysql_error()."<BR>PROJECT_VER:{$system["version"]}</span>",$msg,$type);
	//$result=mysql_query($sql) or error("getResult Filed<br>{$msg}<br>PROJECT_VER:{$_SESSION["version"]}</span>");
	return $result;
	@mysql_free_result($result);
		  //mysql_close($conn);
	}
	
/**
* 执行SQL
*
* @param string $sql
* @param string $msg
* @param string $type
* @return bolean
*/
function sqlExecute($sql,$msg="",$type="html"){
	global $system;
	global $mysqlConfig;	
	$msg = empty($msg) ? "" : $msg;
	mysql_query("set names {$mysqlConfig["db_charset"]}");
	$bool=mysql_query($sql) or error("sqlExecute Filed<br><span style='font-size:12px; font-family:Verdana;'>{$msg}<br>{$sql}<br>".mysql_error()."<BR>PROJECT_VER:{$system["version"]}</span>",$msg,$type);
	return $bool;
}

/**
* 执行SQL
*
* @param string $sql
* @param string $msg
* @param string $type
* @return array
*/
function sqlArray($sql,$msg="",$type="html"){
	$record = array();
	$result=getResult($sql,"sqlArray_Err,Message:{$msg}",$type);		
	while ($tmp_info = mysql_fetch_array($result, MYSQL_ASSOC)){
		$record[] = $tmp_info;
	}
	return $record;
	//@mysql_free_result($result);
}	

/**
* 执行SQL
*
* @param string $sql
* @param string $msg
* @param string $type
* @param string $countField
* @return array
*/
function sqlRow($sql,$msg="",$type="html"){
	$res=getResult($sql,$msg,$type);	
	$row=mysql_fetch_array($res, MYSQL_ASSOC);
	return $row;
}

/**
* 执行SQL
*
* @param string $sql
* @param string $msg
* @param string $type
* @param string $countField
* @return int
*/
function sqlCount($sql,$msg="",$type="html",$countField='*'){
	$sql = $countField != "" ? @stristr($sql,"select t.* from") == false ? "select count(*) from (".@str_ireplace("select * from","select {$countField} from",$sql).") as _count_" : "select count(*) from (".@str_ireplace("select t.* from","select {$countField} from",$sql).") as _count_" :$sql ;
	$res = getResult($sql,$msg,$type);	
	$row = mysql_fetch_row($res);
	$row = $row[0];	
	return $row;
}


function clearHtml($str){  
	$str = trim($str);  
	$str = strip_tags($str,"");  
	$str = ereg_replace("\t","",$str);  
	$str = ereg_replace("\r\n","",$str);  
	$str = ereg_replace("\r","",$str);  
	$str = ereg_replace("\n","",$str);  
	$str = ereg_replace(" "," ",$str);  
	return trim($str);  
}







?>