'use strict';

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  let input = '';
  if(req.url === '/notes' && req.method === 'POST') {
    req.on('data', (chunk) => {
      input += chunk.toString();
    });
    req.on('end', () => {
      fs.readdir(__dirname + '/data', (err, files) => {
        fs.writeFile(__dirname + '/data/' + files.length + '.json', input, (err) => {
          if (err) throw err;
          res.write('saved!');
          res.end();
        });
      });
    });
    return;
  }
  if(req.url === '/notes' && req.method === 'GET') {
    fs.readdir(__dirname + '/data', (err, files) => {
      res.write(files.join() + '\n');
      res.end();
    });
    return;
  }
  else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.write('NOT FOUND \n');
    res.end();
  }
}).listen(3000, () => {
  console.log('listening on 3000');
});
