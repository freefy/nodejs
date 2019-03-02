var http = require("http");
var url = require("url");
var fs = require("fs");
var globalConfig = require("./config");

var loader = require("./loader");
var log = require("./log");

var filterSet = require("./filterLoader");

http.createServer(function (request, response) {
  var pathName = url.parse(request.url).pathname;
  var isStatic = isStaticsRequest(pathName);
  log(pathName);
  console.log(pathName);
  for (var i = 0; i < filterSet.length; i++) {
    var flag = filterSet[i](request, response);
    if (!flag) {
      return;
    }
  }
  if (isStatic) {
    //静态
    console.log("静态");
    try {
      var data = fs.readFileSync(globalConfig.page_path + pathName);
      response.writeHead(200);
      response.write(data);
      response.end();
    } catch (e) {
      response.writeHead(404);
      response.write("<html><body><h1>Not Found</h1></body></html>");
      response.end();
    }
  } else {
    //动态
    console.log("动态");
    if (loader.get(pathName) != null) {

      try {
        loader.get(pathName)(request, response);
      } catch (e) {
        response.writeHead(500);
        response.write("<html><body><h1>Bad Server</h1></body></html>")
        response.end();
      }
    } else {
      response.writeHead(404);
      response.write("<html><body><h1>Not Found</h1></body></html>")
      response.end();
    }
  }
}).listen(globalConfig["port"]);
log("服务已启动");
//判断是否是静态文件
function isStaticsRequest(pathname) {
  for (var i = 0; i < globalConfig.static_file_type.length; i++) {
    var temp = globalConfig.static_file_type[i];
    if (pathname.indexOf(temp) == pathname.length - temp.length) {
      return true;
    }
  }
  return false;
}