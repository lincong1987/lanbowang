<?php include("../function.php");

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php
//导入meta数据及js库
echo $systemHead["meta"].
	$systemHead["title"].
	JS_JQUERY.
	JS_DIALOG.
	LIB_LIGERUI;
?>
<script>
$(document).ready(function(){
	$("#layout1").ligerLayout({topHeight:50});
	
	
	});
</script>
</head>

<body>
	<div>
    
    </div>
</body>
</html>