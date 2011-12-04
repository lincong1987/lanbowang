<?php
include("function.php");
//$userSelf = new ser();

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<?php
//导入meta数据及js库
echo $systemHead["meta"].
	$systemHead["title"].
	CSS_BASE.
	JS_JQUERY.
	JS_DIALOG.
	JS_COMMON.
	LIB_LIGERUI;
?>
<script>

var columns = [
			{display : "ssss", name: 'id'},
			{display : "ssss", name: 'entMemberName', editor: { type: 'text' }, format:"asd"},
			{display:"entMemberCertCode", name:"entMemberCertCode", totalSummary: { type: 'sum,max' , render : function(s){console.log(s); return "<span>总计："+s.sum+"</span>";}}, },
			{ display:"entMemberCertCode", name:"entMemberCertCode", render: function (row) { 
				var html = '<a href="#" onclick="onedit(' + row.id + ')">编辑</a>';
				return html;
				}}
			];

 $(function()	{
        $("#grid").ligerGrid({
            columns: columns,
            url: "a.json",
            root: 'appStuffList',
            pageParmName :'page', 
            pagesizeParmName:'pagesize',
			record:"total",
			enabledEdit: true,
			fixedCellHeight : true,
			onSuccess : function(){
				alert(1)
				},
			onError : function(){
				alert(2);
				}
        });
		
		
        $("#grid2").ligerGrid({
            columns: columns,
            url: "a.json",
            root: 'appStuffList',
            pageParmName :'page', 
            pagesizeParmName:'pagesize',
			record:"total",
			enabledEdit: true,
			fixedCellHeight : true,
			onSuccess : function(){
				alert(1)
				},
			onError : function(){
				alert(2);
				}
        });		
		
		
    });



        function save(){
            var manager = $("#grid").ligerGetGridManager();
            var data = manager.getData();
			
			console.log(data);
			$.post("a",{data:data},function(result){
				console.log(result);
				
				if(result.state == "fail"){
					alert();
					}
				if(result.state == "succ"){
					alert("保存成功");
					manager.loadData(true);				
					}
				
				},"json")
//            $.post("../../service/EmpDataHandler.ashx?Action=save", [{ name: 'data', value: data}]
//            , function (result){
//                if (result == "Y"){
//                    $.ligerMessageBox.success('提示', '保存成功!', function (){
//                        manager.loadData(true);
//                    });
//                		}else{
//                    $.ligerMessageBox.error('提示', result);
//                		}
//            });

        }

        function deleteRow()

        {

            var manager = $("#grid").ligerGetGridManager();

            manager.deleteSelectedRow();

        }

        function addNewRow(){
            var manager = $("#grid").ligerGetGridManager();
            manager.addRow();
        } 

        function getSelected()

        {

            var manager = $("#grid").ligerGetGridManager();

            var row = manager.getSelectedRow();

            alert(JSON.stringify(row));

        }

        function getData()

        {

            var manager = $("#grid").ligerGetGridManager();

            var data = manager.getData();

            alert(JSON.stringify(data));

        }


</script>
<style>
body{ }
#pavgeloading{position:absolute; left:0px; top:0px; background:white url(../src/img/loading.gif) no-repeat center; width:100%; height:100%; height:700px; z-index:99999;}
.l-link{ display:block; height:26px; line-height:26px; padding-left:10px; text-decoration:underline; color:#333;}

.headerNav  { background-color:#030b1d; }
.headerNav .logo { background:url(../src/flash/logo_1.png) no-repeat; float:left; height:50px; text-indent:-1000px; width:250px;}
.headerNav .nav{ height:21px; position:absolute; right:0; top:8px; z-index:31;	 display:block; }
.headerNav .nav li { float:left; margin-left:1px; padding:0 8px; line-height:11px; background:url(../src/img/listLine.png) no-repeat; }
.headerNav .nav li a { color:#b9ccda;}
.headerNav .nav ul{ margin:0; padding:0}

</style>
</head>

<body>


<div id="grid"></div>
<div id="grid2"></div>
<a id='save' onclick="save()">save</a> <a id='addNew' onclick="addNewRow()">addNewRow</a> <a id='deleteRow' onclick="deleteRow()">deleteRow</a> <a id='addNew' onclick="addNewRow()">addNewRow</a>
</body>
</html>