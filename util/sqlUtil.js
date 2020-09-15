var mysql = require("mysql");
var dbPool = {
	config: {
		host: 'localhost',		// 主机名
		port: '3306',			// 端口号
		user: 'root',			// 用户名
		password: '58451920',	// 密码
		database: 'mydb',		// 数据库名
		dateStrings: true
	},
	sqlConnect: function(sql, sqlArr, callBack) {
		var pool = mysql.createPool(this.config);
		pool.getConnection(function(error, connection) {
			if(error) {
				console.log(error);
				return ;
			} else {
				connection.query(sql, sqlArr, callBack);
			}
			connection.release();
		})
	}
}
module.exports = dbPool;