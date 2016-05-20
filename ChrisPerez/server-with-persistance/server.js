'use strict';

const http = require('http');
const fs = require('fs');
const storage = __dirname + '/data';
const promise = require(__dirname + '/jsonPromise');

http.createServer((req, res)=>{
  if (req.url === '/notes' && req.method === 'GET'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    let files = fs.readdirSync(storage);
    res.write(files.toString());
    return res.end();
  };
  if (req.url === '/notes' && req.method === 'POST'){



    let newFileNum = fs.readdirSync(storage).length + 1;
    let recordFromPOST = fs.createWriteStream(storage + '/record00' + newFileNum + '.json')
    req.pipe(recordFromPOST);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    console.log('New file collected\n')
    res.write('Data collected as record00' + newFileNum + '.json.\n');
    return res.end();
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.write('We ain\'t found shit!\n');
  return res.end();

}).listen(3000, ()=>{console.log('Up on Port THREE THOUSAND!!!')})
