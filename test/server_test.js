'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;
const fs = require('fs');
var fileArr = [];
var newFileArr = [];

require('../server');

describe('persistance tests', () => {
  before('read files in notes', () => {
    fileArr = fs.readdirSync(__dirname + '/../data');
    console.log(fileArr);
  });
  it('should do a GET request', (done) => {
    request('localhost:3000')
    .get('/notes')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      var files = fs.readdirSync(__dirname + '/../data').toString();
      expect(res.text).to.eql(files);
    });
    done();
  });
  it('should do a POST request', (done) => {
    request('localhost:3000')
      .post('/notes')
      .send('{"test": "test"}')
      .end((err, res) => {
        newFileArr = fs.readdirSync(__dirname + '/../data');
        expect(err).to.eql(null);
        expect(newFileArr).to.not.eql(fileArr);
        done();
      });
  });
});
