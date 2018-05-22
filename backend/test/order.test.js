const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/order/';
chai.use(chaiHttp);
const theAccount = {
  username: 'zsomboragain@zsombor.hu',
  password: 'zsombor11',
};
const buyThisItem = {"user":{"_id":"5b01f40e9a74901c2c812d03"},"price":123,"items":[{"item":{"_id":"5b0034cf99f94416d86ff713"},"quantity":2}]};

let cookie;

describe('orders', () => {
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
  describe('/GET', () => {
    it('should list orders', (done) => {
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
  describe('/GET', () => {
    it('should return 1 order', (done) => {
      chai.request(baseUrl)
        .get('/5b0034cf99f94416d86ff712')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          expect(res.body._id).be.eql('5b0034cf99f94416d86ff712');
          expect(res.body.price).be.eql(266664);
          expect(res.body.user.username).be.eql('zsombor');
          done();
        });
    });
  });
  describe('/POST', () => {
    it('should create new order', (done) => {
      chai.request(baseUrl)
        .post('/')
        .send(buyThisItem)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          expect(res.body.user).should.be.eql('5b01f40e9a74901c2c812d03');
          done();
        });
    });
  });
  describe('/PUT order', () => {
    it('should modify order', (done) => {
      chai.request(baseUrl)
        .put('/update/5b03fb8d06b04a17a4c873eb')
        .send({
          price: 1300,
        })
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body['_id']).be.eql('5b03fb8d06b04a17a4c873eb');
          expect(res.body.price).be.eql(1300);
          done();
        });
    });
  });
  describe('/DEL', () => {
    it('should delete order', (done) => {
      chai.request(baseUrl)
        .delete('/delete/5b03fc121e3e62088897de8a')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body['_id']).be.eql('5b03fc121e3e62088897de8a');
          done();
        });
    });
  });
});
