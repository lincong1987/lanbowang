{[include file="{[$basePath]}/lib/templates/header.tpl"]}


<script src="{[$basePath]}view/js/demo/login.js" type="text/javascript"></script>

<body>
<form action="/Demo/demo/Login.action" name="loginForm">
<p>用户名:<input type="text" name="username" />

<p>密码:<input type="text" name="password" />

<input type="button" value="登录" onclick="login()">
<form>




</body >



{[include file="{[$basePath]}/lib/templates/footer.tpl"]}