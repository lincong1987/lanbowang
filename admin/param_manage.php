<?php
include("../function.php");


$url = "?page=";
$page = isset($_REQUEST["page"]) ? intval($_REQUEST["page"]) : 1;
$pagesize = 20;
$sql = "select t.param_key, t.param_value, t.id from ".$mysqlConfig["db_perfix"]."param t order by t.id desc";

//获取总数
$totalCount = sqlCount($sql,"","","t.id");
$pageCount = ceil($totalCount/$pagesize);	
$limit=" limit ".($page - 1) * $pagesize." , ".$pagesize;
$rs = sqlArray($sql.$limit);





?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
            <th width="150">键</th>
            <th width="0">值</th>
            <th width="200">操作</th>
        </tr>
    </thead>
    <tbody>
    	<?php
        foreach($rs as $key => $value){
		?>
    	<tr height="30">
        	<td><?php echo $value["id"];?></td>
            <td relid="<?php echo $value["id"];?>" rel="paramKey"><?php echo $value["param_key"];?></td>
            <td relid="<?php echo $value["id"];?>" rel="paramValue"><?php echo $value["param_value"];?></td>
            <td>
            	<a class="l-button l-button-submit"  href="javascript:void(0);" onclick="doMod('<?php echo $value["id"];?>')" >修改</a>
            	<a href="javascript:void(0);" onclick="doRm('<?php echo $value["id"];?>');" class="l-button l-button-submit"   >删除</a>
            </td>
        </tr>
        <?php
        }//foreach
		?>
    </tbody>
</table>
<div class="toolbar"><a href="javascript:void(0);" onclick="doAdd();"  class="l-button l-button-submit" >添加</a></div>
<div id="pager"></div>

<div id="dialogTemp">
    <table width="500">
    	<tr><td width="60">key</td><td width="0"><input id="paramKey" name="paramKey" /></td></tr>
        <tr><td>value</td><td><textarea id="paramValue" name="paramValue"></textarea></td></tr>
        <tr><td colspan="2"><a>提交</a></td></tr>
    </table>
</div>
</body>
</html>
<script>

var pagerCfg = {
		page : <?php echo json_encode($page);?>,
		pageCount : <?php echo json_encode($pageCount);?>,
		totalCount : <?php echo json_encode($totalCount);?>,
		url : <?php echo json_encode($url);?>,
		obj : $("#pager")
	}
	
var trHoverClass = "trHoverClass";

var editor = null;

var paramKey;

var paramValue;

$(function() {	
	$.PAGER.init(pagerCfg);
	$(".grid tbody tr").hover(function(){
		$(this).addClass(trHoverClass);
		}, function(){
			$(this).removeClass(trHoverClass);
			});
	});

function doMod(id){
	$.dialog({
		title : "修改",
		content : document.getElementById("dialogTemp"),
		init : function(){
			$("#paramKey").val($("td:[rel=paramKey][relid="+id+"]").html());
			$("#paramValue").val($("td:[rel=paramValue][relid="+id+"]").html());
			alert(2)
			editor = KindEditor.create('textarea[name="paramValue"]', {
				allowFileManager : true,
				height : 300,
				width : 500
			});			
			},
		ok : function(){
			paramValue = editor.html();
			$.post("news_manage_action.php?action=doMod", {id:id, paramKey:paramKey, paramValue:paramValue}, function(json){
				if(json.state == "fail"){
					$.ligerDialog.error('修改失败，'+json.msg);
					}
				if(json.state == "succ"){
					$.ligerDialog.success('修改成功');
					location.reload();
					}
				}, "josn");
			},
		cancel : function(){
			editor.remove();
			editor = null;			
			}		
		});
	}
	
function doRm(id){
	$.post("news_manage_action.php?action=doRm", {id:id}, function(json){
		if(json.state == "fail"){
			$.ligerDialog.error('删除失败，'+json.msg);
			}
		if(json.state == "succ"){
			$.ligerDialog.success('删除成功');
			location.reload();
			}
		}, "josn");
	}
	
function doAdd(){
	$.post("news_manage_action.php?action=doRm", {id:id}, function(json){
		if(json.state == "fail"){
			$.ligerDialog.error('删除失败，'+json.msg);
			}
		if(json.state == "succ"){
			$.ligerDialog.success('删除成功');
			location.reload();
			}
		}, "josn");	
	}		
</script>