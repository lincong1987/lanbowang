{[include file="{[$basePath]}/lib/templates/header.tpl"]}


<body >
<h2 >登录失败！</h2>
{[foreach  from=$errMsg item=msg]}
<h3 ><font color=red>{[$msg]}</font><h3>
{[/foreach]}
</body >

{[include file="{[$basePath]}/lib/templates/footer.tpl"]}

