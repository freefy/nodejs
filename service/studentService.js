var studentDao = require("../dao/studentDao");

function queryAllStudent(success) {
  studentDao.queryAllStudent(success);
}

function queryStudentByClass(classNum) {
  studentDao.queryStudentByClass(classNum);
}

function queryStudentByStuNum(stuNum, success) {
  studentDao.queryStudentByStuNum(stuNum, success);
}
module.exports = {
  'queryAllStudent': queryAllStudent,
  'queryStudentByClass': queryStudentByClass,
  'queryStudentByStuNum': queryStudentByStuNum
}