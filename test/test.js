const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
// const startServer = require(__dirname + '/../lib/server');
var server;

describe('the http server', () => {

  it('should accept get requests to /notes and respond with list of notes', (done) => {
    request('localhost:3000')
    .get('/notes')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      var files = fs.readdirSync(__dirname + '/../notes_test').toString();
      expect(res.text).to.eql(files);
      done();
    });
  });

  it('should accept json post requests to /notes and save the body in a file', (done) => {
    var nextFile = fs.readdirSync(dir).length + 1;
    request('localhost:3000')
    .post('/notes')
    .send({ name: 'test name' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('/notes');
      fs.readFile(__dirname + '/../notes_test/' + nextFile + '.json', (err, data) => {
        if (err) throw err;
        var parsed = JSON.parse(data);
        expect(parsed).to.eql({ name: 'test name' });
        done();
      });
    });
  });
  it('should 404 if error', (done) => {
    request('localhost:3000')
    .get('/notfound')
    .end((err, res) => {
      expect(res).to.have.status(404);
      expect(res.text).to.eql('NOT FOUND');
      done();
    });
  });
});
