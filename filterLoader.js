var globalConfig = require("./config");
var fs = require("fs");
var filterSet = [];
var files = fs.readdirSync(globalConfig.filter_path);
for (var i = 0; i < files.length; i++) {
  var temp = require("./" + globalConfig.filter_path + "/" + files[i]);
  filterSet.push(temp);
}
module.exports = filterSet;