var dbutil = require("./dbutil");

function queryAllStudent(success) {
  var querysql = "select * from student;";
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querysql, function (error, result) {
    if (error == null) {
      success(result);
      // console.log(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}
// queryAllStudent();
function queryStudentByClass(classNum) {
  var querysql = "select * from student where class=?;";
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querysql, classNum, function (error, result) {
    if (error == null) {
      console.log(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}
// queryStudentByClass(1);
function queryStudentByStuNum(stuNum, success) {
  var querysql = "select * from student where stu_num=?;";
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querysql, stuNum, function (error, result) {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}
// queryStudentByStuNum(1,function(result){})
module.exports = {
  'queryAllStudent': queryAllStudent,
  'queryStudentByClass': queryStudentByClass,
  'queryStudentByStuNum': queryStudentByStuNum
}