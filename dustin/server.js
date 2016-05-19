'use strict';

const http = require('http');
const noteDataPath = (__dirname + '/data');
var fs = require('fs');
var getNextId = require('./lib/getnextid');
var stream = require('stream');
var header = fs.readFileSync('./view/_header.html');
var footer = fs.readFileSync('./view/_footer.html');
var nextNoteId = getNextId(noteDataPath);

http.createServer(function (req, res) {

  res.processed = false;
  var url_array = req.url.split('/');

  if (req.method === 'GET' && url_array[1] === 'notes') notesIndex(res);
  if (req.method === 'GET' && url_array[1] === 'notes' && (url_array[2])) notesShow(res);
  if (req.method === 'POST' && url_array[1] === 'notes') notesPost(res, req);
  if (res.processed === false) url404(res);

}).listen(3000);

var notesIndex = function (res) {
  res.processed = true;
  fs.readdir(noteDataPath, function (err, files) {
    var payload = '';
    files.forEach(function (f) {
      payload = payload + f + '<br>';
    });
    renderLayout(res, payload);
  });
};

var notesShow = function (res) {
  res.write('works');
  res.end();
};

var notesPost = function (res, req) {
  res.processed = true;
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    if (req.headers['content-type'] === 'application/json') {
      var file = fs.createWriteStream(noteDataPath + '/' + nextNoteId + '.json');
      var bufferStream = new stream.PassThrough();
      var inBuf = new Buffer(JSON.stringify(body));
      bufferStream.end(inBuf);
      bufferStream.pipe(file);
      res.end();
    } else {
      badRequest(res);
    }
  });
};

var url404 = function (res) {
  res.writeHead(404, {
    'Content-Type': 'text/html'
  });
  res.write('Not found');
  res.end();
};

var badRequest = function (res) {
  res.processed = true;
  res.writeHead(400, {
    'Content-Type': 'text/html'
  });
  res.write('BAD REQUEST');
  res.end();
};

var renderLayout = function (res, payload) {
  res.write(header + payload + footer);
  res.end();
};
