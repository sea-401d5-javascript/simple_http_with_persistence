'use strict';

const http = require('http');
const fs = require('fs');
const fileArr = fs.readdirSync(__dirname + '/data');

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/notes') {
    let dataString = '';
    req.on('data', (data) => {
      dataString += data.toString();
    });
    req.on('end', () => {
      fileArr.push(dataString);
      let fileName = __dirname + '/data/note' + fileArr.length + '.json';
      fs.writeFileSync(fileName, dataString);
      res.statusCode = 200;
      return res.end('File saved successfully');
    });
  }

  else if (req.method === 'GET' && req.url === '/notes') {
    let files = fs.readdir(__dirname + '/data', (err, files) => {
      if (err) {
        res.statusCode = 400;
        return res.end('Error occurred: ', err);
      }
      files.forEach((file) => {
        res.write(file + '\n');
      });
      return res.end();
    });
  }

  else {
    res.statusCode = 404;
    return res.end('Not found');
  }

}).listen(3000, () => {
  console.log('listening on port 3000');
});
