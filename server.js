'use strict';

const http = require('http');
const fs = require('fs');
const stream = require('stream');



const dir =  __dirname + '/data';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

http.createServer((req, res) => {
  if(req.url === '/notes' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    let files = fs.readdirSync(dir);
    res.write(files.toString());
    return res.end();
  }
  if (req.url === '/notes' && req.method === 'POST') {
    let nextFile = fs.readdirSync(dir).length + 1;
    const writeToFile = fs.createWriteStream(dir + '/' + nextFile + '.json');
    req.pipe(writeToFile);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('saved file ' + nextFile + '.json' + '\n');
    console.log(nextFile);
    return res.end();
  }
  res.status = 404;
  return res.end('File not found\n');

}).listen(3000, () => {
  console.log('server up at 3000');
});
