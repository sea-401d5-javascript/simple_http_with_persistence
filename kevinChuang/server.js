/*jshint esversion:6*/
/*eslint-env es6*/

const http = require('http');
const fs = require('fs');
const stream = require('stream');
const jsonParse = require('./promise');

exports = module.exports = {};

http.createServer((req,res)=> {

  if(req.url === '/' && req.method === 'GET'){
    var requests =exports.requests= fs.readdirSync(__dirname+'/data');
    res.write(requests.toString());
      return res.end();

  }

  if(req.url === '/' && req.method === 'POST'){
    var bufferArray = [];
    // var bufferString;
    req.on('data',(data)=> {
      bufferArray.push(data);
      console.log('data',data);
      // bufferString += data.toString();
      console.log(bufferArray);
      return res.end();
    });

    req.on('end',()=> {
      var string = bufferArray.toString();
      console.log('string',string,typeof string);
      // var jsonObject = {};

      jsonParse(string).then((data)=> {
        console.log('data',data, typeof data);
        var fileNum = fs.readdirSync(__dirname+'/data').length+1;
        var file = fs.createWriteStream(__dirname + '/data/'+ fileNum +'.json');

        console.log('fileNumber',fileNum);

        var bufferStream = new stream.PassThrough();
        var incomingBuffer = new Buffer(JSON.stringify(data));

        console.log('incomingBuffer',incomingBuffer, typeof incomingBuffer);

        bufferStream.end(incomingBuffer);
        bufferStream.pipe(file);
        res.statusCode = 200;
        res.end(console.log("Data written to file"));
      }, (err)=> {
        res.statusCode = 400;
        res.end(err);
      });
    });
    return;
  }

  res.writeHead(404,{
    'Content-Type' : 'text/html'
  });
  res.write('Not Found');
  res.statusHead = 404;
}).listen(3000,()=>{
  console.log('Listening on port 3000');
});
