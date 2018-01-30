/*!
 * selflib JavaScript Library v1.1.1
 * http://www.infoarrive.com/
 * Copyright InfaoArrive
 * Date: 2018-01-28T21:30:00+08:0
 */
window.$k={};
$k.getinfo=function (opt) {
    var opt=opt || {};
    opt.method=opt.method.toUpperCase() || 'POST';
    opt.url=opt.url || '';
    opt.async=opt.async || 'true';
    opt.contentType=opt.contentType || 'application/x-www-form-urlencoded;charset=utf-8';
    opt.data=opt.data || {};
    opt.suc=opt.suc || function () {};
    //opt.err=opt.err || function () {};
    var xmlHttp=XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
    var arrData=[];
    for(var x in opt.data){
        arrData.push(x+'='+opt.data[x]);
    }
    var strData=arrData.join('&');
    xmlHttp.open(opt.method,(opt.method==='GET'?opt.url+'?'+strData:opt.url),opt.async);
    xmlHttp.setRequestHeader('Content-Type',opt.contentType);
    xmlHttp.send(opt.method==='GET'?null:strData);
    xmlHttp.onreadystatechange=function () {
        if(xmlHttp.readyState==4 && xmlHttp.status==200){
            var result='';
            var contentType = xmlHttp.getResponseHeader('Content-Type');
            if (contentType.indexOf('xml') > -1){
                result=xmlHttp.responseXML;
            }else if(contentType.indexOf('json') > -1){
                result=JSON.parse(xmlHttp.responseText);
            }else{
                result=xmlHttp.responseText;
            }
            opt.suc && opt.suc(xmlHttp.responseText);
        }
    }
}
