<?php
class index{
	
	/*
		获取首页置顶消息
			@prama $t 置顶死亡时间
	*/
	public function getIndexMsg($t=""){
		$t = empty($t) ? date("Y-m-d H:i:s", time()) : $t;
		$SQL = "select content, nid, addTime, stopTime from lbw_index_msg where stopTime >= '{$t}' and stopTime !='' limit 1";
		return sqlCount($SQL) == 0 ? 0 : sqlArray($SQL);
		}
	/*
		获取TOP NAV 滚动消息
			@prama $t TOP NAV 滚动消息死亡时间	
	*/	
	public function getTopMsg($t=""){
		$t = empty($t) ? date("Y-m-d H:i:s", time()) : $t;
		$SQL = "select content, nid, addTime, stopTime from lbw_top_msg where stopTime >= '{$t}' and stopTime !='' limit 1";
		return sqlCount($SQL) == 0 ? 0 : sqlArray($SQL);
		}	
	/*
		获取TOP NAV 滚动消息
			@prama $t	
	*/	
	public function getIndexSlideImages($t=0){
		$t = $t == 0 ? 1 : $t;
		$SQL = "select imagePath, href, id from lbw_index_slide_images limit {$t}";
		return sqlArray($SQL);
		}		
	
	}
?>