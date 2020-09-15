// 检查用户名输入
function checkUserName(user) {
	user.data.userflag = false;
	// 限制用户空格输入
	user.data.$username.val(user.data.$username.val().replace(/\s+/g,''));
	// 获取输入后的用户名
	user.data.username = user.data.$username.val();
	// 用户名只能为数字、字母、汉字、下划线, 且长度为6到16位
	let user_regexp = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){6,16}$");
	if(user.data.username.length < 6) {
		user.data.$userNote.css({color: "#CC3333"}).text("用户名长度不足");
	} else if(!user_regexp.test(user.data.username)) {
		user.data.$userNote.css({color: "#FF0033"}).text("用户名格式错误");
	} else {
		// 用户名格式正确后进行post请求判断用户名是否已经存在
		$.ajax({
			type: 'post',
			url: "user-check",
			data: {"username":user.data.username},
			dataType: "JSON",
			beforeSend() {
				user.data.$userNote.css({color: "yellow"}).text('用户名验证中...');
			},
			success(response) {
				if(user.data.flag == "login") {
					if(response.msg == 0) {
						// 用户名不存在, 不能进行登录
						user.data.$userNote.css({color: "#FF6666"}).text('用户名不存在');
					} else {
						// 用户名存在, 可以登录
						user.data.$userNote.css({color: "#CC6600"}).text('用户名可使用');
						user.data.userflag = true;
					}
				} else if(user.data.flag == "register" || user.data.flag == "change") {
					if(response.msg == 1) {
						// 用户名存在, 不能进行注册, 修改
						user.data.$userNote.css({color: "#FF6666"}).text('用户名已存在');
					} else {
						// 用户名不存在, 可以进行注册、修改
						user.data.$userNote.css({color: "#CC6600"}).text('用户名可使用');
						user.data.userflag = true;
					}
				}
			},
			error(err1, err2, err3) {
				console.log(err1, err2, err3);
			}
		})
	}
}

function checkPassword(pwd) {
	pwd.data.pwdflag = false;
	// 限制用户空格输入
	pwd.data.$password.val(pwd.data.$password.val().replace(/\s+/g,''));
	// 获取输入后的密码
	pwd.data.password = pwd.data.$password.val();
	// 密码只能为数字、字母、下划线, 且长度为6到16位
	let pwd_regexp = new RegExp("^([a-zA-Z0-9_]){6,16}$");
	if(pwd.data.password.length < 6) {
		pwd.data.$pwdNote.css({color: "#CC3333"}).text("密码长度不足");
	} else if(!pwd_regexp.test(pwd.data.password)) {
		pwd.data.$pwdNote.css({color: "#FF6666"}).text("密码格式不正确");
	} else if(pwd.data.flag == "register_repwd") {
		if(pwd.data.password == pwd.data.Fpassword.password) {
			pwd.data.$pwdNote.css({color: "#CC6600"}).text('密码可使用');
			pwd.data.pwdflag = true;
		} else {
			pwd.data.$pwdNote.css({color: "#FF6666"}).text('两次密码不一致');
		}
	} else {
		pwd.data.$pwdNote.css({color: "#CC6600"}).text('密码可使用');
		pwd.data.pwdflag = true;
	}
}


function jumpPage(param) {
	// 进行get请求跳转页面
	param = param.data || param;
	$.ajax({
		type: 'get',
		url: param.url,
		data: '',
		dataType: "JSON",
		beforeSend() {
			param.$note.css({color: "#CC6600"}).text('页面跳转中...');
		},
		success(data) {
			try{
				window.location.replace(data.msg);
			}catch(e){
				console.log("页面跳转错误" + e)
			}
		},
		error(err1, err2, err3) {
			console.log(err1, err2, err3);
		}
	});
}