'use strict';
const fs = require('fs');
const http = require('http');
const stream = require('stream');

http.createServer((req, res) => {
  if (req.url === '/notes' && req.method === 'GET'){
    let file = fs.createReadStream(__dirname + '/data/data.json');
    file.pipe(res);
  } else if (req.url === '/notes' && req.method === 'POST'){
    let bufArr = [];
    let bufStr = '';
    req.on('data', (data) => {
      bufArr.push(data);
      bufStr += data.toString();
    });
    req.on('end', () => {
      let str = bufArr.toString();
      let jsonObj = {};
      let file = fs.createWriteStream(__dirname + '/data/data.json');
      let bufferStream = new stream.PassThrough();
      let inBuf = new Buffer(bufStr);
      bufferStream.end(inBuf);
      bufferStream.pipe(file);
      res.statusCode = 200;
      res.end('data written to file\n');
    });
  } else {
    res.status = 404;
    res.end('File not found\n');
  }
}).listen(3000, () => {
  console.log('server up at 3000');
});
