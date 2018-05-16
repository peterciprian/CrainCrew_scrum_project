const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/order/';
chai.use(chaiHttp);
const theAccount = {
  username: 'zsombor@zsombor.hu',
  password: 'zsombor00',
};
const buyThisItem = {
  user: 'zsombor@zsombor.hu',
  items: [{ item: '5afc59828465e11ea8003663', quantity: 1 }],
  price: 10000,
};

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
        .get('/:5afc326e7661a105b48ac3e2')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
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
          done();
        });
    });
  });
  describe('/PUT order', () => {
    it('should modify order', (done) => {
      chai.request(baseUrl)
        .put('/update/5afc326e7661a105b48ac3e2')
        .send({ price: 130 })
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });
  });
  describe('/DEL', () => {
    it('should delete order', (done) => {
      chai.request(baseUrl)
        .delete('/delete/5afc32d77661a105b48ac3e4')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
