/*jshint esversion:6*/
/*eslint-env es6*/

const http = require('http');
const fs = require('fs');
const stream = require('stream');

exports = module.exports = {};

http.createServer((req,res)=> {

  if(req.url === '/' && req.method === 'GET'){
    var requests =exports.requests= fs.readdirSync(__dirname+'/data');
    res.write(requests.toString());
      return res.end();

  }

  else if(req.url === '/' && req.method === 'POST'){
    var bufferString = '';
    req.on('data',(data)=> {
      bufferString += data.toString();
    });

    req.on('end',()=> {
      var newFile = (fs.readdirSync(__dirname + '/data/')).length + 1;
      var file = fs.createWriteStream(__dirname + '/data/test' + newFile + '.json');
      var bufferStream = new stream.PassThrough();
      var incomingBuffer = new Buffer(bufferString);

      bufferStream.end(incomingBuffer);
      bufferStream.pipe(file);
      res.statusCode=200;
      return res.end('File written\n');
    });
  } else {
    res.writeHead(404,{
      'Content-Type' : 'text/html'
    });
    res.write('Not Found');
    res.statusHead = 404;
  }

}).listen(3000,()=>{
  console.log('Listening on port 3000');
});
