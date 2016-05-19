module.exports = function (dataPath) {
  var fs = require('fs');

  // fs.readdir(dataPath, function (err, files) {
  //   return files.map(function (f) {
  //     return f.split('.')[0];
  //   });
  // });

  var files = fs.readdirSync(dataPath);
  var nums = files.map(function (f) {
    return f.split('.')[0];
  });
  return Math.max.apply(null,nums) + 1;
};
