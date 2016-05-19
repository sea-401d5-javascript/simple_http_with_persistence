'use strict';
const fs = require('fs');
const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;

const server = require(__dirname + '/../server');

describe('HTTP server', () => {
  // it('should accept a POST request to /data', (done) => {
  //   var nextFile = fs.readdirSync(dir).length + 1;
  //   var newNote = "{'why':'because i said so'}";
  //   var name = '../data' + nextFile + '.json';
  // })
});
