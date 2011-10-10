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
	JS_COMMON.
	LIB_LIGERUI;
?>



<script>
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
			$("form .l-text,.l-textarea").ligerHideTip(); 
            form.submit();
		}
	});
	
	$("form").ligerForm();
});


</script>
<style>
.l-table-edit {}
.l-table-edit-td{ padding:4px;}
.l-button-submit,.l-button-test{width:80px; float:left; margin-left:10px; padding-bottom:2px;}
.l-verify-tip{ left:230px; top:120px;}
</style>
</head>

<body>


<form name="form1" method="post" action="user_manage_action.php?action=add"
id="form1">
  <div>
    </div>
    <table cellpadding="0" cellspacing="0" class="l-table-edit">
        <tr>
            <td align="right" class="l-table-edit-td">
                用户id:
            </td>
            <td align="left" class="l-table-edit-td">
                <input name="uid" type="text" id="uid" ltype="text" validate="{required:true,minlength:3,maxlength:12,uid:true}"
                />
            </td>
            <td align="left">
            </td>
        </tr>
        <tr>
            <td align="right" class="l-table-edit-td">
                名字:
            </td>
            <td align="left" class="l-table-edit-td">
                <input name="nid" type="text" id="nid" ltype="text" validate="{required:true,minlength:1,maxlength:16}"
                />
            </td>
            <td align="left">
            </td>
        </tr>
        <tr>
            <td align="right" class="l-table-edit-td">
                密码:
            </td>
            <td align="left" class="l-table-edit-td">
                <input name="pwd" type="password" id="pwd" ltype="password" validate="{required:true,minlength:3,maxlength:12}"
                />
            </td>
            <td align="left">
            </td>
        </tr>
        <tr>
            <td align="right" class="l-table-edit-td">
                再次输入密码:
            </td>
            <td align="left" class="l-table-edit-td">
                <input name="pwd2" type="password" id="pwd2" ltype="password" validate="{required:true,minlength:3,maxlength:12,equalTo:'#pwd'}"
                />
            </td>
            <td align="left">
            </td>
        </tr>
        <tr>
          <td align="right" class="l-table-edit-td" valign="top">管理员:</td>
          <td align="left" class="l-table-edit-td">
          <input id="isAdmin_0" type="radio" name="isAdmin" value="0" checked="checked" />
          <label for="isAdmin_0">否</label>
          <input id="isAdmin_1" type="radio" name="isAdmin" value="1" />
          <label for="isAdmin_1">是</label>
          </td>
          <td align="left"></td>
        </tr>
        <tr>
          <td align="right" class="l-table-edit-td" valign="top">身份证:</td>
          <td align="left" class="l-table-edit-td">
          <input name="idNumber" type="text" id="idNumber" ltype="text" /></td>
          <td align="left"></td>
        </tr>
        <tr>
            <td align="right" class="l-table-edit-td" valign="top">
                性别:
            </td>
            <td align="left" class="l-table-edit-td">
                <input id="rbtnl_0" type="radio" name="sex" value="1" checked="checked"
                />
                <label for="rbtnl_0">
                    男
                </label>
                <input id="rbtnl_1" type="radio" name="sex" value="2" />
                <label for="rbtnl_1">
                    女
                </label>
            </td>
            <td align="left">
            </td>
        </tr>
        <tr>
          <td align="right" class="l-table-edit-td">电话:</td>
          <td align="left" class="l-table-edit-td"><input name="tel" type="text" id="tel" ltype="text" /></td>
          <td align="left"></td>
        </tr>
        <tr>
          <td align="right" class="l-table-edit-td">手机:</td>
          <td align="left" class="l-table-edit-td"><input name="mob" type="text" id="mob" ltype="text" /></td>
          <td align="left"></td>
        </tr>
        <tr>
          <td align="right" class="l-table-edit-td">联系电话:</td>
          <td align="left" class="l-table-edit-td"><input name="tel2" type="text" id="tel2" ltype="text" /></td>
          <td align="left"></td>
        </tr>
        <tr>
          <td align="right" class="l-table-edit-td">QQ:</td>
          <td align="left" class="l-table-edit-td"><input name="qq" ligerui="{type:'int'}" type="text" id="qq" ltype="text" /></td>
          <td align="left"></td>
        </tr>
        <tr>
          <td align="right" class="l-table-edit-td">MSN:</td>
          <td align="left" class="l-table-edit-td"><input name="msn" type="text" id="msn" ltype="text" /></td>
          <td align="left"></td>
        </tr>
        <tr>
            <td align="right" class="l-table-edit-td">
                Email:
            </td>
            <td align="left" class="l-table-edit-td">
                <input name="email" type="text" id="email" ltype="text" validate="{required:true,email:true}"
                />
            </td>
            <td align="left">
            </td>
        </tr>
        <tr>
            <td align="right" class="l-table-edit-td">
                入职日期:
            </td>
            <td align="left" class="l-table-edit-td">
                <input name="entryDate" type="text" id="entryDate" ltype="date" validate="{required:true}"
                />
            </td>
            <td align="left">
            </td>
        </tr>
        <tr>
            <td align="right" class="l-table-edit-td">
                年龄:
            </td>
            <td align="left" class="l-table-edit-td">
                <input name="age" type="text" id="address" ltype='spinner' ligerui="{type:'int'}"
                value="20" class="required" validate="{digits:true,min:1,max:100}" />
            </td>
            <td align="left">
            </td>
        </tr>
        <tr>
            <td align="right" class="l-table-edit-td">
                部门:
            </td>
            <td align="left" class="l-table-edit-td">
                <select name="depart" id="depart" ltype="select">
                    <option value="2">研发中心</option>
                    <option value="3">销售部</option>
                    <option value="4">市场部</option>
                    <option value="5">顾问组</option>
                </select>
            </td>
        </tr>
        <tr>
            <td align="right" class="l-table-edit-td">
                地址:
            </td>
            <td align="left" class="l-table-edit-td">
                <textarea cols="100" rows="4" class="l-textarea" name="address" id="address" style="width:400px"
                validate="{required:true}"></textarea>
            </td>
            <td align="left">
            </td>
        </tr>
    </table>
<br />

    <input type="submit" value="提交" id="Button1" class="l-button l-button-submit"
    />
</form>


</body>
</html>