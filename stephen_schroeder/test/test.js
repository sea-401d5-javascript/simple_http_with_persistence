const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;

const server = require(__dirname + '/../server');

describe('HTTP server', () => {
  after(() => {
    server.close();
  });

  it()

})
