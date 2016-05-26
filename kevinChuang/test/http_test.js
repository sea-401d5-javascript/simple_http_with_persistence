/*eslint-env es6*/
/*jshint esversion:6*/

const chai = require('chai');
const chaihttp = require('chai-http');
chai.use(chaihttp);
const expect = chai.expect;
const request = chai.request;
const fs = require('fs');

require('../server');

describe('HTTP GET request',()=>{
  it('should return list of files in the directory', (done)=>{
    request('localhost:3000')
    .get('/')
    .end((err,res)=>{
      expect(res.text).to.eql(fs.readdirSync('data').toString());
      done();
    });
  });
});

describe('HTTP POST request', ()=> {
  it('should read a JSON POST', (done) => {
    request('localhost:3000')
    .post('/')
    .send('{"name":"Kevin"}')
    .end((err,res)=> {
      expect().to.eql();
      done();
    });
  });
});
