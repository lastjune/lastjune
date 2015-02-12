var parseString=require('xml2js').parseString;
debugger;
var fs = require('fs');
var json;
var mapping={
	"calculations":"div",
	"calculator":"div"
}
fs.readFile('target.xml',function(err,data){
    var xml = data.toString();
	parseString(xml,function(err,result){
	//	console.dir(JSON.stringify(result));
		json=result;
		json=jsonhandler(json);
		fs.writeFile('cook.vim',JSON.stringify(json));
	});
});
function jsonhandler(o){
	var tag="div";//default treated as div element
	if(arguments[1]){
		tag=arguments[1];//get the correct tag from argument.
	}
	var beginTag="<"+tag+">";
	var closeTag="</"+tag+">";
	var h=h+beginTag;
	if(o instanceof Array){
		for(var a in o){
			h+=jsonhandler(o[a],mapping[a]);
		}
	}
	else if(o instanceof Object){
		for(var el in o){
			if(o[el] instanceof Array){
				for(var a in o[el]){
					h+=jsonhandler(o[el][a],mapping[a]);
				}
			}
			else if(o[el] instanceof Object ){//second level
				h+=jsonhandler(o[el],mapping[el]);
			}
			else{//handler logic
				var type=typeof(el);
				if(type=="string"){
				
				}
				h+=el+":"+o[el];
			}
		}
	}
	h=h+closeTag;
	return h;
};

function addProptites(s){
	//TODO
	if(typeof(s)=="string"){
		
	}
}
