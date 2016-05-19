'use strict';
const http = require('http');
const fs = require('fs');
const stream = require('stream');
const jsonParse = require('./promise');

http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    let file = fs.createReadStream(__dirname + '/data/data.json');
    file.pipe(res);
  } else if (req.url === '/' && req.method === 'POST') {
    let bufArr = [];
    let bufStr = '';
    req.on('data', (data) => {
      bufArr.push(data);
      bufStr += data.toString();
    });

    req.on('end', () => {
      let str = bufArr.toString(); //array of buffers to string
      let jsonObj = {};

      jsonParse(str).then((data) =>{  //data is a json obj
        let validString = JSON.stringify(data);
        //TODO error handling file write
        let file = fs.createWriteStream(__dirname + '/data/data.json');
        let bufferStream = new stream.PassThrough();
        let inBuf = new Buffer(validString);
        bufferStream.end(inBuf);
        bufferStream.pipe(file);

        res.statusCode = 200;
        res.end('data written to file\n');

      }, (err) =>{
        res.statusCode = 400;
        res.end('err');
        console.log(err);
      });







    });



    // validate json


    // write to file


  } else {
    //TODO deal with not found
    res.status = 404;
    res.end('File not found\n');

  }





}).listen(3000, () => {
  console.log('server up at 3000');
});
