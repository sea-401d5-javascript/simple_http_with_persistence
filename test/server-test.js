'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const request = chai.request;
require('../server.js');

describe('HTTP server with persistence tests', () => {
  it('should respond to a GET request to /notes without errors', (done) => {
    request('localhost:3000')
      .get('/notes')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
    });
  });
  it('should respond to a POST request to /notes without errors', (done) => {
    request('localhost:3000')
      .post('/notes')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('File saved successfully');
        done();
    });
  });
  it('should respond to request to any path besides /notes with a 404 status', (done) => {
    request('localhost:3000')
      .get('/TEST')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.text).to.eql('Not found');
        done();
    });
  });
  it('should respond to a GET request with a list of files', (done) => {
    request('localhost:3000')
      .get('/notes')
      .end((err, res) => {
        let file = res.text.trim().split('\n').pop();
        console.log('file', file)
        expect(file.endsWith('.txt')).to.eql(true);
        done();
      });
  });
});
