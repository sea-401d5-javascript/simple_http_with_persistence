'use strict'
const fs = require('fs');
const http = require('http');
const stream = require('stream');


http.createServer((req,res) => {
  if(req.url === '/notes' && req.method === 'GET') {
    fs.readdir((__dirname + '/data/'), (err,files) => {
      res.write(files.toString().split(',').join('\n') + '\n');
      res.end('counting files');
    })


  } else if(req.url === '/notes' && req.method === 'POST') {
    let bufferString = '';
    req.on('data', (data) => {
      bufferString += data.toString();
    });
    req.on('end', () => {
      var nextFile = (fs.readdirSync(__dirname + '/data/')).length +1
      let file = fs.createWriteStream(__dirname + '/data/test' + nextFile + '.json')
      var bufferStream = new stream.PassThrough();
      let inBuf = new Buffer(bufferString);
      bufferStream.end(inBuf);
      bufferStream.pipe(file);
      res.statusCode = 200;
      return res.end('wrote to new file' + '\n');

    })
  } else {
    res.write('File Not Found');
    return res.end();
  }

}).listen(3000, () => {
  console.log("Listening on 3000");
})
