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
	LIB_LIGERUI;
?>




<style>
.l-table-edit {}
.l-table-edit-td{ padding:4px;}
.l-button-submit,.l-button-test{width:80px; float:left; margin-left:10px; padding-bottom:2px;}
.l-verify-tip{ left:230px; top:120px;}
</style>
</head>

<body>
<table>
	<thead>
    	<tr>
        	<th>asd</th><th>asd</th><th>asd</th>
        </tr>
    </thead>
    <tbody>
    	<?php
        foreach($rs as $key => $value){
		?>
    	<tr>
        	<td><?php echo $value["id"];?></td>
            <td><?php echo $value["param_key"];?></td>
            <td><?php echo $value["param_value"];?></td>
            <td><a href="param_manage_action.php?action=del&id=<?php echo $value["id"];?>" >删除</a> <a href="param_manage_modi.php?id=<?php echo $value["id"];?>" >修改</a></td>
        </tr>
        <?php
        }//foreach
		?>
    </tbody>
</table>

<div id="pager"></div>
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

$(function() {	
	$.PAGER.init(pagerCfg);
	});


</script>