var path = new Map();
var studentService = require("../service/studentService");
var url = require("url");

function getData(request, response) {
  studentService.queryAllStudent(function (result) {
    var resArr = [];
    for (var i = 0; i < result.length; i++) {
      resArr.push(result[i].name);
    }
    response.write(resArr.toString());
    response.end();
  })
  // response.writeHead("200");
  // response.end();
}
path.set('/getData', getData);

//get方法
// function login(request, response) {
//   var params = url.parse(request.url, true).query;
//   studentService.queryStudentByStuNum(params.stuNum, function (result) {
//     if (result == null || result.length == 0) {
//       res = 'Fail';
//     } else {
//       if (result[0].pwd == params.password) {
//         res = "OK";
//       } else {
//         res = "Fail";
//       }
//     }
//     response.write(res);
//     response.end();
//   })
// }
//post方法
function login(request, response) {
  request.on("data", function (data) {
    console.log(data);
    var stuNum = data.toString().split("&")[0].split("=")[1];
    var password = data.toString().split("&")[1].split("=")[1];
    studentService.queryStudentByStuNum(stuNum, function (result) {
      if (result == null || result.length == 0) {
        res = 'Fail';
        response.writeHead(302, {
          "location": "/error.html"
        });
        response.end();
      } else {
        if (result[0].pwd == password) {
          res = "OK";
          response.writeHead(302, {
            "location": "/success.html",
            "Set-Cookie": "id=" + result[0].id
          });
          response.end();

        } else {
          res = "Fail";
          response.writeHead(302, {
            "location": "/error.html"
          });
          response.end();

        }
      }

      // response.write(res);
      // response.end();
    })
  })

}
path.set('/login', login);
module.exports.path = path;