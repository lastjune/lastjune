/**
 * @description 将svn log转换成tortoise svn的格式
 * @author timiz 2015/07/10
 * @usage
 * node svnLogHelper.js {{input.log}} {{output.log}}
 * {{input.log}} 输入文件，svn log 生成的日志信息
 * {{output.log}} 输出文件
 */

var fs=require('fs'),
    buffer=require('buffer'),
    arguments=process.argv.splice(2)
    inputFileName="inputFile",
    outputFileName="outputFile";

if(arguments.length>0){
    inputFileName=arguments[0];
    outputFileName=arguments[1];
}
fs.readFile(inputFileName,function(err,data){
    if(err) {
        console.log(err);
        throw(err);
    }
    var l=data.toString().split('\n');
    var result=[];
    var s;
    for(n in l){
        s=undefined;
        s=l[n].trim().split(' ').toString();
        if(s.length>0){ //去除空行
            result.push(l[n].trim().split(' ').toString());
        }
    }
    result=result.splice(1,result.length-2);//去除收尾两行无用信息
    var versionNumber="版本: "+result[0].match(/[r]{1}[0-9]{5}/);
    versionNumber=versionNumber.replace('r','')+'\n';
    var author="作者: design_qj"+'\n';
    var datetime="日期: "+result[0].match(/2015-.*\,/)+'\n';
    var info="信息: \n"+result[result.length-1].toString()+'\n';
    var split="---"+'\n';
    var detail= result.splice(2,result.length-3).toString()+'\n';//取本次日志的详细信息
    var detail=detail.replace(/M\,/g,'已修改: ','').replace(/A\,/g,'已增加: ').replace(/D,/g,'已删除: ').replace(/\,/g,'\n');//适配tortoise
    var output=versionNumber+author+datetime+info+split+detail;
    fs.writeFile(outputFileName,output,function(err){
        if(err) throw err;
        console.log('Done.');
    })
});
