<?php include("../function.php");

$url = "?page=";
$page = isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1;
$pagesize = 20;
$sql = "select t.*, s.name as web_news_type from ".$mysqlConfig["db_perfix"]."web_news t, ".$mysqlConfig["db_perfix"]."web_news_type s where t.news_type_id = s.id order by t.id desc";

//获取总数
$totalCount = sqlCount($sql,"","","t.id");
$pageCount = ceil($totalCount/$pagesize);	
$limit=" limit ".($page - 1) * $pagesize." , ".$pagesize;
$rs = sqlArray($sql.$limit);


?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php
//导入meta数据及js库
echo $systemHead["meta"].
	$systemHead["title"].
	CSS_BASE.
	JS_JQUERY.
	JS_DIALOG.
	JS_BASE.
	JS_COMMON.
	KINDEDITOR.
	LIB_LIGERUI;
?>
<script>
function doRm(id){
	if(!confirm("真的要删除?")){
		$.post("news_manage_action.php",{action: "doRm", id:id},function(json){
			if(json){
				if(json.state == "succ"){
					alert("删除成功!");
					location.reload();
					}
				if(json.state == "fail"){
					alert("删除失败！"+ json.msg);
					}
				}
			}, "json");
		}
	}
	


 



</script>
<style>
body{ background:#FFF}
.grid tr{ height:30px; border-bottom:1px #999 dotted}
.grid th{ text-align:center; background:#F2F2F2; font-weight:bold; border-right:1px #999 dotted }
.grid td a{text-decoration:none}
.grid td{ border-right: 1px #999 dotted }
.l-table-edit {}
.l-table-edit-td{ padding:4px;}
.l-button-submit,.l-button-test{width:80px; float:left; margin-left:10px; padding-bottom:2px;}
.l-verify-tip{ left:230px; top:120px;}
.toolbar{ height:30px; line-height:30px; padding-top:1em}
.toolbar a{ text-decoration:none}
.trHoverClass{ background:#EEF7FF}
</style>
</head>

<body>
<table width="100%" class="grid">
	<thead>
    	<tr>
        	<th width="60">序号</th>
            <th width="60">类型</th>
            
            <th width="150">标题</th>
            <th width="150">时间</th>
            <th width="150">作者</th>
            <th width="0">内容</th>
            <th width="200">操作<a href="javascript:location.reload();">[刷新]</a></th>
        </tr>
    </thead>
    <tbody>
    	<?php
        foreach($rs as $key => $value){
		?>
    	<tr height="30">
        	<td><?php echo $value["id"];?></td>
            <td relid="<?php echo $value["id"];?>" rel="web_news_type"><?php echo $value["web_news_type"];?></td>
            <td relid="<?php echo $value["id"];?>" rel="news_title"><a target="_blank" href="../news.php?id=<?php echo $value["id"];?>"><?php echo $value["news_title"];?></a></td>            
            <td relid="<?php echo $value["id"];?>" rel="news_content_short"><?php echo $value["news_post_time"];?></td>
            <td relid="<?php echo $value["id"];?>" rel="uid"><?php echo $value["uid"];?></td>
            <td relid="<?php echo $value["id"];?>" rel="paramValue"><?php echo $value["news_content_short"];?></td>
            <td>
            	<a class="l-button l-button-submit" href="news_modi.php?id=<?php echo $value["id"];?>" >修改</a>
            	<a class="l-button l-button-submit" href="javascript:void(0);" onclick="doRm('<?php echo $value["id"];?>');" >删除</a>
            </td>
        </tr>
        <?php
        }//foreach
		?>
    </tbody>
</table>

<div id="pager"></div>

</body>
</html><script>
var trHoverClass = "trHoverClass";

$(function() {			
	$.PAGER.init({
		page : <?php echo json_encode($page);?>,
		pageCount : <?php echo json_encode($pageCount);?>,
		totalCount : <?php echo json_encode($totalCount);?>,
		url : <?php echo json_encode($url);?>,
		obj : $("#pager")
	});
	$(".grid tbody tr").hover(function(){
		$(this).addClass(trHoverClass);
		}, function(){
			$(this).removeClass(trHoverClass);
			});
	});
</script>