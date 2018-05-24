const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/comment/';
chai.use(chaiHttp);
const theAccount = {
  username: 'balazsadmin@gmail.com',
  password: 'balazsadmin',
};
const registerComment = {
  comment: 'testComment12',
  user: '5afb95d00663bc2ca8aeb604',
  item: '5b0425ef72f2d02428aec604',
  confirmed: false,
};

let cookie;

describe('Comment', () => {
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

  describe('list all comments', () => {
    it('should list all comments', (done) => {
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

  describe('list one comment', () => {
    it('should list one comment', (done) => {
      chai.request(baseUrl)
        .get('/5b0552b815c5b307580f3fe4')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });
  });

  describe('create new comment', () => {
    it('should create new comment', (done) => {
      chai.request(baseUrl)
        .post('/')
        .send(registerComment)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });
  });

  describe('update comment', () => {
    it('should update the comment with given data', (done) => {
      chai.request(baseUrl)
        .put('/5b0552b815c5b307580f3fe4')
        .send({ comment: 'testComment0' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.name).be.eql('testComment0');
          done();
        });
    });
  });

  describe('delete one comment', () => {
    it('should delete one comment', (done) => {
      chai.request(baseUrl)
        .delete('/5b05ab0a9f95b516e1d67ff1')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });
  });
});
