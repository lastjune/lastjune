var mysql=require('mysql');

var options={
    host:'127.0.0.1',
    port:3306,
    //socketPath:,
    user:'root',
    password:'123456',
    databse:'people'
    //charset:'UTF8_GENERAL_CI',
    //timezone:'local',
    //stringifyObjects:'false',
    //insecureAuth:'false',
    //typeCast:'true', queryFormat:undefined, supportBigNumbers:false, bigNumbersStrings:false, debug:false, multipleStatements:false
};

var connection=mysql.createConnection(options);
var pool=mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    //socketPath:,
    user:'root',
    password:'123456',
    databse:'people'
});

//sql:string
//parameters:parameters array
//callback:function
function query(connection,sql,parameters,callback){
	//if(args.length>2){
		return connection.query(sql,parameters,callback);
	//}
	//else{
		//connection.query(sql);
	//}
}
function handleDisconnect(){
	connection.connect(function(err){
	    if(err){
			console.log('Connect to mysql failed!');
			console.log(err);
	    }
	    else{
			console.log('Connect to mysql successful!.');
			var sql="select * from people.people where name="+connection.escape("timiz");
			console.log(sql);
			res= query(connection,sql,{},function(err,result){
				console.log(result);
			});
			console.log(res);
			console.log(connection.escape.toString());
		//connection.end(function(err){
		   // if(err){
			//	console.log('Close mysql connection failed!');
		    //}
		    //else{
			//	console.log('Close mysql connection successful.');
		    //}
//		});
	    }
	});
};
connection.on('error',function(err){
	if(err.code==='PROTOCOL_CONNECTION_LOST'){
		console.log('lost mysql connection...');
		setTimeout(function(){
			handleDisconnect();
		},10000);
	}
	else{
		throw err;
	}
});
handleDisconnect();

//connection.end(function(err){
// if(err){
//	console.log('Close mysql connection failed!');
//}
//else{
//	console.log('Close mysql connection successful.');
//}
//		});
