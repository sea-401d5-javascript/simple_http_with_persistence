var chai = require('chai');
var chaiHTTP = require('chai-http');
var fs = require('fs');
var expect = chai.expect;
chai.use(chaiHTTP);
var request = chai.request;

var getNextId = require('../lib/getnextid');
var noteDataPath = (__dirname + '/../data');
var nextNoteId = getNextId(noteDataPath);

var header = fs.readFileSync('./view/_header.html');
var footer = fs.readFileSync('./view/_footer.html');

require('../server');

describe('HTTP server', function () {
  it('/notes should respond with a list of all of the json files', function (done) {
    files = fs.readdirSync('./data');
    request('localhost:3000')
      .get('/notes')
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        var payload = '';
        files.forEach(function (f) {
          payload = payload + f + '<br>';
        });
        expect(res.text).to.eql(header + payload + footer);
        done();
      });
  });

  it('accept a POST request to /notes with proper headers and payload and be saved correctly', function (done) {
    var noteJSON = "{'noteBody': 'buy milk'}";
    var filename = noteDataPath + '/' + (nextNoteId - 1) + '.json';
    var fileBirthtime = fs.statSync(filename)['birthtime'];
    request('localhost:3000')
      .post('/notes')
      .set('Content-Type', 'application/json')
      .send(noteJSON)
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Date.now() - Date.parse(fileBirthtime)).to.be.below(100000);
        expect(noteJSON).to.eql(JSON.parse(fs.readFileSync(filename)));
        done();
      });
  });

  it('return a 404 when no route is found', function (done) {
    request('localhost:3000')
      .get('/nothere')
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  // it('return an error to a POST request to /notes without proper headers', function (done) {
  //   request('localhost:3000')
  //     .post('/greet')
  //     .set('Content-Type', 'text/html')
  //     .send({
  //       'name': 'walter sobchak'
  //     })
  //     .end(function (err, res) {
  //       expect(err).to.eql(null);
  //       expect(res).to.have.status(200);
  //       expect(savedJSON).to.eql([{
  //         'name': 'walter sobchak'
  //       }]);
  //       done();
  //     });
  // });

  // it('return an error to a POST request to /notes without proper payload', function (done) {
  //   request('localhost:3000')
  //     .post('/greet')
  //     .set('Content-Type', 'application/json')
  //     .send({
  //       'name': 'walter sobchak'
  //     })
  //     .end(function (err, res) {
  //       expect(err).to.eql(null);
  //       expect(res).to.have.status(200);
  //       expect(savedJSON).to.eql([{
  //         'name': 'walter sobchak'
  //       }]);
  //       done();
  //     });
  // });
  //

});
