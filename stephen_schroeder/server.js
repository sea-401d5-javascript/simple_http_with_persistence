'use strict';

const fs = require('fs');
const http = require('http');
// const stream = require('stream');

module.exports = exports = function start(directory, cb) {
  const dir = directory || __dirname + '/data';
  if (!fs.existsSync(dir)) {fs.mkdirSync(dir);}

  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/data') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      var file = fs.readdirSync(dir);
      res.write(file.toString());
      return res.end();
    }

    if (req.method === 'POST' && req.url === '/data') {
      var nextFile = fs.readdirSync(dir).length + 1;
      const writeToFile = fs.createWriteStream(dir + '/' + nextFile + '.json');
      req.pipe(writeToFile);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('json file saved');
      return res.end();
    }
  });

  server.listen('3000', () => {
    console.log('We\'re up on 3000');
  });

  if (cb && typeof cb === 'function') {
    cb();
    return server;
  }
};
