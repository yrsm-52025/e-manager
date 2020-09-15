var express = require("express");
var sqlUtil = require("./util/sqlUtil.js");
var index = require("./routes/index.js");

var app = express();
app.configure(function(){
	app.use(express.logger("dev"));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + "/public"));
	app.use(express.favicon(__dirname + "/public/images/favicon.png"));	// 配置网站图标
	app.use(express.errorHandler());
})

// 用户名检查
app.post("/user-check", index.userNameCheck);

// 登录
app.post("/login-do", index.userLogin);
app.get("/register-to", index.toRegister);
app.get("/userpage-to", index.toUserPage);

// 注册
app.post("/register-do", index.userRegister);
app.get("/login-to", index.toLogin);

// 编辑
app.get("/get-user-list", index.getUserList);
app.post("/modify-user", index.modifyUser);
app.post("/delete-user", index.deleteUser);

app.listen(8888, function(){
	console.log("服务器启动成功!");
})