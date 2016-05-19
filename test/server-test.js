'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const request = chai.request;
const fs = require('fs');
let oldFiles = [];
let newFiles = [];
require('../server.js');

describe('HTTP server with persistence tests', () => {
  before('read original list of files in data directory', (done) => {
    oldFiles = fs.readdirSync('/Users/Stefanie/cf/401/week-2/class-03/stefanie-hansen/data');
    done();
  });
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
      .send({"test":"test"})
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
        expect(file.endsWith('.json')).to.eql(true);
        done();
      });
  });
  it('should should create a file with a POST request to /notes', (done) => {
    request('localhost:3000')
      .post('/notes')
      .send({"test":"test"})
      .end((err, res) => {
        newFiles = fs.readdirSync('/Users/Stefanie/cf/401/week-2/class-03/stefanie-hansen/data');
        expect(oldFiles.length).to.be.below(newFiles.length);
        done();
      });
  });
});
