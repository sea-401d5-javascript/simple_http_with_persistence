'use strict';

const fs = require('fs');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;

require('../server');

describe('HTTP test', () => {
  let arrayLength;
  before((done) => {
    fs.readdir(__dirname + '/../data', (err, data) => {
      if (err) throw err;
      arrayLength = data.length;
      done();
    });
  });
  it('should return a list of files', (done) => {
    request('localhost:3000')
    .get('/notes')
    .end((err, res) => {
      console.log(res);
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body));
      done();
    });
  });
  it('should make a file', (done) => {
    request('localhost:3000')
    .post('/notes')
    .send({'message': 'test'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      fs.readdir(__dirname + '/../data', (err, data) => {
        // if (err) throw err;
        let fileName = data.length - 1 + '.json';
        expect(data.indexOf(fileName)).to.not.eql(-1);
        done();
      });
    });
  });
});
