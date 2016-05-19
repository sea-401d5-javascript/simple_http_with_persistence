'use strict';
const fs = require('fs');
const http = require('http');
const stream = require('stream');

http.createServer((req, res) => {
  if (req.url === '/notes' && req.method === 'GET'){
      fs.readdir(__dirname + '/notes/', (err, files) => {
      res.write(files.toString() + '\n')
      res.end('files listed \n');
    });
  } else if (req.url === '/notes' && req.method === 'POST'){
    let bufStr = '';
    req.on('data', (data) => {
      bufStr += data.toString();
    });
    req.on('end', () => {
      var nextFile = fs.readdirSync(__dirname + '/notes/').length + 1;
      let file = fs.createWriteStream(__dirname + '/notes/' + nextFile + '.json');
      let bufferStream = new stream.PassThrough();
      let inBuf = new Buffer(bufStr);
      bufferStream.end(inBuf);
      bufferStream.pipe(file);
      res.statusCode = 200;
      res.end('data written to file \n');
    });
  } else {
    res.status = 404;
    res.end('File not found\n');
  }
}).listen(3000, () => {
  console.log('server up at 3000 \n');
});
