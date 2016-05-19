'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const chaiHTTP = require('chai-http');
const fs = require('fs');
chai.use(chaiHTTP);
const server = require(__dirname + '/../server.js');

describe('http server with basic persistence', () => {
  it('should write a new file to /data when we post', (done) => {
    fs.readdir(__dirname + '/../data', (err, files) => {
      let startFileLength = files.length;
      chai.request('http://localhost:3000')
        .post('/notes')
        .send({message: 'oh hi thar'})
        .end((err, res) => {
          fs.readdir(__dirname + '/../data', (err, files) => {
            expect(files.length).to.eql(startFileLength + 1);
            done();
          })
        })
    })
  })
  it('should save our new json object in that file', (done) => {
    let newMessage = {message: 'i am a test'}
    fs.readdir(__dirname + '/../data', (err, files) => {
      let filesLength = files.length;
      chai.request('http://localhost:3000')
        .post('/notes')
        .send(newMessage)
        .end((err, res) => {
          fs.readFile(__dirname + '/../data/' + filesLength + '.json', (err, data) => {
            expect(data.toString()).to.eql(JSON.stringify(newMessage));
            done();
          })
        })
    })
  })
  it('should return a list of our files on /get', (done) => {
    fs.readdir(__dirname + '/../data', (err, files) => {
      chai.request('http://localhost:3000')
        .get('/notes')
        .end((err, res) => {
          expect(res.text).to.eql(files.join() + '\n');
          done();
        })
    })
  })
})
