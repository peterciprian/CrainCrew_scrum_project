const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/item/';
chai.use(chaiHttp);
const theAccount = {
  username: 'zsombor@zsombor.hu',
  password: 'zsombor00',
};
const registerItem = {
  name: 'testBike',
  url: 'testUrl',
  manufacturer: 'testManufacturer',
  price: 100000,
};
let cookie;

describe('Items', () => {
  beforeEach((done) => {
    chai.request('http://localhost:8080/user')
      .post('/login')
      .send(theAccount)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        cookie = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });
  describe('list all items', () => {
    it('should list all items', (done) => {
      chai.request(baseUrl)
        .get('/')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Array');
          done();
        });
    });
  });
  describe('list one item', () => {
    it('should list the given item', (done) => {
      chai.request(baseUrl)
        .get('/5afd4420af96550a6c31c6d6')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });
  });
  describe('create item', () => {
    it('should create given item', (done) => {
      chai.request(baseUrl)
        .post('/')
        .set('Cookie', cookie)
        .send(registerItem)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });
  });
  describe('should update given item', () => {
    it('should update given items with given data', (done) => {
      chai.request(baseUrl)
        .put('/5afd4420af96550a6c31c6d6')
        .set('Cookie', cookie)
        .send({ name: 'Mountain Bike' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });
  });
  describe('should delete given item', () => {
    it('should delete given item', (done) => {
      chai.request(baseUrl)
        .delete('/5afd4420af96550a6c31c6d6')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
