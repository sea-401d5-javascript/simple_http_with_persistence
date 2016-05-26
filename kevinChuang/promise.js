/*eslint-env es6*/
/*jshint esversion:6*/


module.exports = function(str) {
  return new Promise((resolve,reject)=> {
    console.log('promising',str);
    try {
      var jsonObj = JSON.parse(str);
      console.log('jsonObj',jsonObj);
      resolve(jsonObj);
    } catch(e){
      reject('json parse failed');
    }
  });
};
