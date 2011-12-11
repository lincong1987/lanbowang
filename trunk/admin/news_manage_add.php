<?php include("../function.php");
$news = new news();
$newTypeArray = $news->getNewsType();
$user = new user();
$userSession = $user->getUserSession();
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
	JS_COMMON.
	KINDEDITOR.
	LIB_LIGERUI;
?>
<script>
var editor;
$(function() {	
	$.metadata.setType("attr", "validate");
	var v = $("form").validate({
		debug: false,
		errorPlacement: function(lable, element) {
			if (element.hasClass("l-textarea")) element.ligerTip({
				content: lable.html(),
				appendIdTo: lable
			});
			else if (element.hasClass("l-text-field")) element.parent().ligerTip({
				content: lable.html(),
				appendIdTo: lable
			});
			else lable.appendTo(element.parents("td:first").next("td"))
		},
		success: function(lable) {
			lable.ligerHideTip();
		},
		submitHandler: function() {
			
			if(editor.count('text')<1){
				$.ligerDialog.error('内容不得为空');
				return false;}
			$("form .l-text,.l-textarea").ligerHideTip(); 
            form.submit();
		}
	});

	
	

});


KindEditor.ready(function(K) {
	$("form").ligerForm();
	editor = K.create('textarea[name="news_content"]', {
		allowFileManager : true,
		height : 600,
		width : 600
	});
	
	
});	
</script>
<style type="text/css">
.l-button-submit {width:80px; float:left; margin-left:10px; padding-bottom:2px;}
.l-button-test {width:80px; float:left; margin-left:10px; padding-bottom:2px;}
.l-table-edit {}
.l-table-edit-td {padding:4px;}

.w200{ width:500px}
</style>
</head>

<body>
<form name="form1" method="post" action="news_manage_action.php?action=add"
id="form1">
  <div></div>
  <table cellpadding="0" cellspacing="0" class="l-table-edit">
    <tr>
      <td align="right" class="l-table-edit-td"> 新闻标题: </td>
      <td align="left" class="l-table-edit-td"><input name="news_title" type="text" id="news_title" ltype="text" ligerui="{width:'500'}" validate="{required:true,minlength:3,maxlength:32}" /></td>
      <td align="left"></td>
    </tr>
    <tr>
      <td align="right" class="l-table-edit-td"> 是否发布: </td>
      <td align="left" class="l-table-edit-td">
        <input id="isPublish_1" type="radio" name="isPublish" value="1" checked="checked" />
      	<label for="isPublish_1">是</label>      
     	<input id="isPublish_2" type="radio" name="isPublish" value="0" />
        <label for="isPublish_2">否</label></td>
      <td align="left"></td>
    </tr>
    <tr>
      <td align="right" class="l-table-edit-td"> 发布时间: </td>
      <td align="left" class="l-table-edit-td"><input name="news_post_time" type="text" id="news_post_time" ltype="date" ligerui="{showTime: true, format:'yyyy-MM-dd hh:mm:ss', width:'200'}" validate=""
                /></td>
      <td align="left"></td>
    </tr>
    <tr>
      <td align="right" class="l-table-edit-td"> 作者: </td>
      <td align="left" class="l-table-edit-td"><input readonly="readonly" disabled="disabled" name="nid" type="text" id="nid" ltype='text' value="<?php echo $userSession["nid"];?>"  />
      <input name="uid" type="hidden" id="uid" value="<?php echo $userSession["uid"];?>"  /></td>
      <td align="left"></td>
    </tr>
    <tr>
      <td align="right" class="l-table-edit-td"> 分类: </td>
      <td align="left" class="l-table-edit-td"><select name="news_type" id="news_type" ltype="select">
      	<?php
			foreach($newTypeArray as $key=>$value){
				echo "<option value='{$value["id"]}'>{$value["name"]}</option>";
				}
		?>

      </select></td>
    </tr>
    <tr>
      <td align="right" class="l-table-edit-td"> 内容: </td>
      <td align="left" class="l-table-edit-td"><textarea cols="100" rows="4" class="l-textarea" name="news_content" id="news_content" style="" validate="{}"></textarea></td>
      <td align="left"></td>
    </tr>
  </table>
  <br />
  <input type="submit" value="提交" id="Button1" class="l-button l-button-submit"
    />
</form>
</body>
</html>