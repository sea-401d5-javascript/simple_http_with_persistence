'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
chai.use(chaiHTTP);
const request = chai.request;

require('../server');

describe('persistance tests', () => {
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
      .get('/notes')
      .end((err, res) => {
        expect((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
        })
      })
    })
  })
});
