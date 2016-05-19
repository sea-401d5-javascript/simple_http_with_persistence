const fs = require('fs');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
var fileArr = [];
var newFileArr = [];

require('../server');

describe('HTTP tests', () => {
  before('reading files in notes directory', () => {
    fileArr = fs.readdirSync(__dirname + '/../notes');
  });
  it('should read file names on get request', (done) => {
    request('localhost:3000')
    .get('/notes')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql(fs.readdirSync(__dirname + '/../notes').toString() + '\n' + 'files listed \n');
      done();
    });
  });
  it('should post to new file on post request', (done) => {
    request('localhost:3000')
    .post('/notes')
    .send('{"blah": "blah"}')
    .end((err, res) => {
      newFileArr = fs.readdirSync(__dirname + '/../notes');
      expect(err).to.eql(null);
      expect(newFileArr).to.not.eql(fileArr);
      done();
    })
  })
});
