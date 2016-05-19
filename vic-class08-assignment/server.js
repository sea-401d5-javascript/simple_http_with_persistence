'use strict';
const http = require('http');
const fs = require('fs');
const stream = require('stream');

http.createServer((req, res) => {
  if(req.url === '/notes' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    let file = fs.readdirSync(__dirname + '/data');
    console.log(file);
    var stringifiedArray = file.toString();
    // file.pipe(res);
    console.log('working');
    res.write(stringifiedArray + '\n');
    return res.end();
  }
  if(req.url === '/notes' && req.method === 'POST') {
    let fileNum = fs.readdirSync(__dirname + '/data').length + 1;
    const writeToFile = fs.createWriteStream((__dirname + '/data') + '/' + fileNum + '.json');
    req.pipe(writeToFile);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('saved ' + fileNum + '.json\n');
    console.log(fileNum);
    return res.end();
  }
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('NOT FOUND\n');
  return res.end();
}).listen(3000, () => {
  console.log('server is up on 3000\n');
});
