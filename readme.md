### 使用技术汇总
```
	HTML、CSS、JavaScript、jQuery、nodejs、mysql、zui
```

### 项目主要文件目录结构
```
	public
		css
			style.css 	=> 文件样式
		image 			=> 图片文件夹
		js
			common.js	=> 静态js文件
		zui				=> ZUI库
		index.html		=> 用户登录页面文件
		register.html	=> 用户注册页面文件
		userpage.html	=> 用户列表页面文件
	routes
		index.js		=> 后端请求处理文件
	util
		sqlUtil.js		=> 数据库请求处理文件
	app.js				=> 项目服务器文件, 执行接受请求以及路由分发
	readme.md			=> 项目说明文件
	mydb.sql			=> 数据库文件
```

### 用户名检查
```
	用户名规范: 长度6-16, 不能存在空格, 字符可为汉字、字母、数字、下划线 
	前端检查: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){6,16}$/
	后端检查:
		请求方式: POST
		请求地址: user-check
		检查结果: 用户名存在于数据库返回1, 用户名不存在返回0
```

### 密码检查
```
	密码规范: 长度6-16, 只能为字母、数字、下划线
	前端检查: /^([a-zA-Z0-9_]){6,16}$/
	输入时不需要进行后端检查
```

### 登录
```
	请求方式: POST
	请求地址: login-do
	请求结果: 登录成功返回1, 登录失败返回0
```

### 注册
```
	请求方式: POST
	请求地址: register-do
	请求结果: 注册成功返回1, 注册失败返回0
```

### 获取用户列表
```
	请求方式: GET
	请求地址: get-user-list
	请求结果: 获取用户列表成功返回用户列表, 获取失败返回0
```

### 页面跳转
```
	跳转到注册页面:
		请求方式: GET
		请求地址: register-to
		请求结果: 返回页面文件名
	跳转到登录页面:
		请求方式: GET
		请求地址: login-to
		请求结果: 返回页面文件名
	跳转到用户页面:
		请求方式: GET
		请求地址: userpage-to
		请求结果: 返回页面文件名
```

### 修改用户信息
```
	请求方式: POST
	请求地址: modify-suer
	请求结果: 修改成功返回1, 修改失败返回0
```

### 删除用户信息
```
	请求方式: POST
	请求地址: delete-suer
	请求结果: 删除成功返回1, 删除失败返回0
```


### 创建数据库
```mysql
# 数据库请求在sqlUtil.js中进行处理, 因此创建好数据库之后需要进行修改sqlUtil.js文件中config的参数.
# 数据库使用mysql, 以下为创建表以及添加原有数据的SQL语句(也可以在数据库中导入mydb.sql文件)
	CREATR DATABASE mydb;
	USE mydb;
	CREATE TABLE t_user (
		u_id INT(11) NOT NULL AUTO_INCREMENT,
		u_name VARCHAR(16) NOT NULL,
		u_pwd VARCHAR(16) NOT NULL,
		u_img VARCHAR(1024),
		PRIMARY KEY (`u_id`)
	);
	
	INSERT INTO t_user (u_name, u_pwd, u_img) VALUES("administrator", "administrator", "./images/avatar/avatar1.jpg");
	
	INSERT INTO t_user (u_name, u_pwd, u_img) VALUES("Lin_52025", "lin52025", "./images/avatar/avatar2.jpg");
	
	INSERT INTO t_user (u_name, u_pwd, u_img) VALUES("yrsm_msry", "yrsmmsry", "./images/avatar/avatar3.jpg");
	
	INSERT INTO t_user (u_name, u_pwd, u_img) VALUES("你在我心里迷了路", "nzwxlmll", "./images/avatar/avatar4.jpg");
```
