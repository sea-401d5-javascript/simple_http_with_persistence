'use strict';

const http = require('http');
const fs = require('fs');
const Writable = require('stream').Writable;
const Readable = require('stream').Readable;
const fileArr = [];

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/notes') {
    let dataString = '';
    req.on('data', (data) => {
      dataString += data.toString();
    });
    req.on('end', () => {
      fileArr.push(dataString);
      let fileStream = fs.createWriteStream(__dirname + '/notes/note' + fileArr.indexOf(dataString));
      fileStream.write(dataString);
      console.log(fileStream);
      console.log(fileArr);
      // let dataStream = Readable;
      // file.write(dataString);
      // dataStream.write(dataString);
      // dataStream.pipe(file);
      res.status = 200;
      res.end('File saved successfully');
    });
  }

  if (req.method === 'GET' && req.url === '/notes') {
    let files = fs.readdir(__dirname + '/notes', (err, files) => {
      if (err) {
        res.status = 404;
        res.end('Error occurred: ', err);
      }
      files.forEach((file) => {
        res.write(file + '\n');
      });
      res.end();
    });
  }

  else {
    res.status = 404;
    res.end('Not found');
  }

}).listen(3000, () => {
  console.log('listening on port 3000');
});
