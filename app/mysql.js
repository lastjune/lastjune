function(opts) createMysqlConnection{

	var mysql=require('mysql');

	var options={
		host:opts.host|'127.0.0.1',
		port:opts.port|3306,
		user:opts.user|'root',
		password:opts.password|'123456',
		databse:opts.database|'people'
	};

	var connection=mysql.createConnection(options);

	var pool=mysql.createPool({
		host:opts.host|'127.0.0.1',
		port:opts.port|3306,
		user:opts.user|'root',
		password:opts.password|'123456',
		databse:opts.database|'people'
	});
	return connection;
}
