const chai = require('chai');
const chaiHTTP = require('chai-http');
const fs = require('fs');
const expect = chai.expect
chai.use(chaiHTTP);
const request = chai.request
require('../server.js');
var fileArray = [];
var newArray = [];

describe('HTTP TESTS', () => {
  before('read files', () => {
    fileArray = fs.readdirSync(__dirname + '/../data');
  })
  it('should list files with GET on /notes', (done) => {
    request('localhost:3000')
      .get('/notes')
      .end((err, res) => {
        var file = fs.readdirSync(__dirname + '/../data/').toString();
        expect(err).to.eql(null);
        console.log(res.text)
        console.log(file);
        expect(res.text).to.eql(file.split(',').join('\n') + '\n' + 'counting files')
        done();
      })
  })

  it('should post new file', (done) => {
    request('localhost:3000')
      .post('/notes')
      .send('{"msg":"chai test"}')
      .end((err, res) => {
        newArray = fs.readdirSync(__dirname + '/../data').toString();
        expect(fileArray).to.not.eql(newArray)
        done();
      })
  })

  it('should reach error if no route is called', (done) => {
    request('localhost:3000')
      .get('/error')
      .end((err, res) => {
        expect(res.text).to.eql('File Not Found')
        done();
      })
  })
})
