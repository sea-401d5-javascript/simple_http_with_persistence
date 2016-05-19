'use strict';

const chai = require('chai');
const fs = require('fs');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
require(__dirname + '/../server.js');

describe('HTTP tests', ()=>{
  it('should return data file info', (done)=>{
    request('localhost:3000')
      .get('/notes')
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(fs.readdirSync(__dirname + '/../data').toString());
        done();
      })
  })
  it('should catch not found', (done)=>{
    request('localhost:3000')
      .get('/notthere')
      .end((err, res)=>{
        expect(res).to.have.status(404);
        expect(res.text).to.eql('We ain\'t found shit!\n');
        done();
      })
  })
  it('should get a list of files', (done)=>{
  request('localhost:3000')
    .get('/notes')
    .end((err, res)=>{
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      console.log(res.body);
      done();
    })
})
  it('should create a file', (done)=>{
    let newFileNum = fs.readdirSync(__dirname + '/../data').length + 1;
    request('localhost:3000')
      .post('/notes')
      .send({message:'test'})
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        fs.readFile(__dirname + '/../data/record00' + newFileNum + '.json', (err, data)=>{
          if (err) throw err;
          let contents = JSON.parse(data);
          console.log(contents)
          expect(contents).to.eql({message:'test'})
          done();
        })
      })
  })
})
