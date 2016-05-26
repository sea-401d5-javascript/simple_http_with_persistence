'use strict';

const http = require('http');
const fs = require('fs');
const stream = require('stream');

http.createServer((request, response) => {

  if (request.url === '/notes' && request.metod === 'GET') {
    
  }

  if (request.url === '/' && request.method === 'GET') {

    let file = fs.createReadStream(__dirname + '/data/data.json');
    file.pipe(response);

  } else if (request.url === '/' && request.method === 'POST') {

      let bufArr = [];
      let bufStr = '';
      request.on('data', (data) => {
        bufArr.push(data);
        bufStr += data.toString();
      });

    request.on('end', () => {
      let str = bufArr.toString();
      let jsonObj = {};

      try {
        jsonObj = JSON.parse(str);
      } catch (e) {
        response.statusCode = 400;
        response.write('Use json');

        console.log('error validating');
      }

      jsonParse(str).then((data) =>{
        let validString = JSON.stringify(data);

        let file = fs.createWriteStream(__dirname + '/data/data.json');
        let bufferStream = new stream.PassThrough();
        let inBuf = new Buffer(validString);
        bufferStream.end(inBuf);
        bufferStream.pipe(file);

        response.statusCode = 200;
        response.end('Data was written to file! \n');

      }, (err) =>{
        response.statusCode = 400;
        response.end('err');

        console.log(err);
      });
    });
  } else {
    response.status = 404;
    response.end('File not found\n');
  }
}).listen(3000, () => {
  console.log('Up on 3000!');
});
