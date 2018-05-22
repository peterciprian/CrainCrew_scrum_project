const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/item/';
chai.use(chaiHttp);
const theAccount = {
  username: 'zsomboragain@zsombor.hu',
  password: 'zsombor11',
};
const registerItem = {
  name: 'TestBike2000',
  url: 'http://images.lemans88.com/images/products/1397647047-24125700.jpg',
  manufacturer: 'testmanufacturer',
  price: 123456789,
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
        .get('/5afb48d4ca191f28fc991de3')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          expect(res.body['_id']).be.eql('5afb48d4ca191f28fc991de3');
          expect(res.body.name).be.eql('NeoBike');
          expect(res.body.manufacturer).be.eql('Neo');
          expect(res.body.price).be.eql(78000);
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
          expect(res.body.name).be.eql(registerItem.name);
          expect(res.body.price).be.eql(registerItem.price);
          expect(res.body.manufacturer).be.eql(registerItem.manufacturer);
          done();
        });
    });
  });
  describe('should update given item', () => {
    it('should update given items with given data', (done) => {
      chai.request(baseUrl)
        .put('/5b03d36362c9c1209ca3095e')
        .set('Cookie', cookie)
        .send({ name: 'SuperDuperBike' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          expect(res.body.name).be.eql('SuperDuperBike');
          expect(res.body['_id']).be.eql('5b03d36362c9c1209ca3095e');
          done();
        });
    });
  });
  describe('should delete given item', () => {
    it('should delete given item', (done) => {
      chai.request(baseUrl)
        .delete('/5b03fc0f1e3e62088897de89')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body['_id']).be.eql('5b03fc0f1e3e62088897de89');
          done();
        });
    });
  });
});
