var express = require("express");
var sqlUtil = require("../util/sqlUtil.js");

// 检查用户名是否重复, 已存在用户名返回1, 不存在用户名返回0
exports.userNameCheck = function(request, response) {
	let req_data = request.body || request.query;
	let username = req_data.username;
	let sql = "SELECT * FROM t_user WHERE u_name = ?";
	let sqlArr = [username];
	function queryResult(query_error, query_data) {
		if(query_error) {
			console.log(query_error);
		}
		if(query_data.length == 0) {
			response.send({"msg":"0"});		// 查询失败返回0
		} else {
			response.send({"msg":"1"});		// 查询成功返回1
		}
		// response.send({"msg":data.length});
	}
	sqlUtil.sqlConnect(sql, sqlArr, queryResult);
}

// 用户登录, 检查用户名和密码是否匹配, 匹配返回1, 不匹配返回0
exports.userLogin = function(request, response) {
	let req_data = request.body || request.query;
	let username = req_data.username;
	let password = req_data.password;
	let sql = "SELECT * FROM t_user WHERE u_name = ? and u_pwd = ?";
	let sqlArr = [username, password];
	function queryResult(query_error, query_data) {
		if(query_error) {
			console.log(query_error);
		}
		if(query_data.length > 0) {
			response.send({"msg":"1"});		// 用户名和密码匹配, 返回1
		} else {
			response.send({"msg":"0"});		// 用户名和密码不匹配, 返回0
		}
	}
	sqlUtil.sqlConnect(sql, sqlArr, queryResult);
}

// 用户注册, 向数据库添加用户名, 密码, 用户头像, 完成后通过affectedRows(执行插入语句后影响的行数)判断是否插入成功, 插入成功返回1, 插入失败返回0
exports.userRegister = function(request, response) {
	let req_data = request.body || request.query;
	let username = req_data.username;
	let password = req_data.password;
	let userimage = req_data.image;
	let sqlArr = [username, password, userimage];
	let sql = "INSERT INTO t_user (u_name, u_pwd, u_img) VALUES(?, ?, ?)";
	function registerUser(insert_error, insert_data) {
		if(insert_error) {
			console.log(insert_error);
		}
		if(insert_data.affectedRows == 1) {
			response.send({"msg":"1"});	// REGISTER SUCCESS
		} else {
			response.send({"msg":"0"});	// REGISTER FAILED
		}
	}
	sqlUtil.sqlConnect(sql, sqlArr, registerUser);
}

// 获取用户列表, 通过查询得到的数据的长度为0则表示数据库中没有数据, 返回0, 反之返回查询得到的数据
exports.getUserList = function(request, response) {
	let sql = "SELECT u_name as username, u_pwd as password, u_img as userimage FROM t_user";
	function queryResult(query_error, query_data) {
		if(query_error) {
			console.log(query_error);
		}
		if(query_data.length == 0) {
			response.send({"msg":"0"});
		} else {
			response.send({"msg":query_data});
		}
	}
	sqlUtil.sqlConnect(sql, [], queryResult);
}

// 修改用户信息, 先查询修改前的用户名得到用户的u_id, 再通过u_id进行修改用户信息, 通过affectedRows判断是否修改成功, 修改成功返回1, 修改失败返回0
exports.modifyUser = function(request, response) {
	let req_data = request.body || request.query;
	let oldUsername = req_data.oldUsername;
	let username = req_data.username;
	let password = req_data.password;
	let sql = "SELECT u_id FROM t_user WHERE u_name = ?";
	let sqlArr = [oldUsername];
	function queryResult(query_error, query_data) {
		if(query_error) {
			console.log(query_error);
		}
		sql = "update t_user set u_name = ?, u_pwd = ? where u_id = ?";
		sqlArr = [username, password, query_data[0].u_id];
		sqlUtil.sqlConnect(sql, sqlArr, function(update_error, update_data) {
			if(update_error) {
				console.log(update_error);
			}
			if(update_data.affectedRows == 1) {
				response.send({"msg":"1"});
			} else {
				response.send({"msg":"0"});
			}
		});
	}
	sqlUtil.sqlConnect(sql, sqlArr, queryResult);
}

// 删除用户信息, 通过用户名(数据库中用户名不能重复)进行删除用户信息, 根据执行删除操作后的affectedRows判断是否删除成功, 删除成功返回1, 删除失败返回0
exports.deleteUser = function(request, response) {
	let req_data = request.body || request.query;
	let username = req_data.username;
	let sql = "DELETE FROM t_user WHERE u_name = ?";
	let sqlArr = [username];
	function queryResult(query_error, query_data) {
		if(query_error) {
			console.log(query_error);
		}
		if(query_data.affectedRows == '1') {
			response.send({"msg":'1', "data": query_data});
		} else {
			response.send({"msg":'0', "data": query_data});
		}
	}
	sqlUtil.sqlConnect(sql, sqlArr, queryResult);
}

// 跳转到登录页面
exports.toLogin = function(request, response) {
	setTimeout(function(){
		response.send({"msg":"index.html"}); // 跳转页面
	},1500)
}

// 跳转到注册页面
exports.toRegister = function(request, response) {
	setTimeout(function(){
		response.send({"msg":"register.html"}); // 跳转页面
	},1500)
}

// 跳转到用户页面
exports.toUserPage = function(request, response) {
	setTimeout(function(){
		response.send({"msg":"userpage.html"}); // 跳转页面
	},1500)
}
