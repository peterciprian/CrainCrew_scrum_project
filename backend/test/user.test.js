const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/user/';
chai.use(chaiHttp);
const theAccount = {
  username: 'zsombor@zsombor.hu',
  password: 'zsombor00',
};
const registerUser = {
  username: 'testUser',
  email: 'testuseremail@whatever.com',
  password: 'testUserPassword',
};

let cookie;

describe('User', () => {
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

  // Test Login
  describe('login', () =>
    it('should log the user in', (done) => {
      chai.request(baseUrl).post('/login').send(theAccount).end((err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    }));
  describe('list all users', () => {
    it('should list all users', (done) => {
      chai.request(baseUrl)
        .get('/users')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Array');
          done();
        });
    });
  });
  describe('get profile', () => {
    it('should get the currently logged in user', (done) => {
      chai.request(baseUrl)
        .get('/profile')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('register user', () => {
    it('should register a new user', (done) => {
      chai.request(baseUrl)
        .post('/register')
        .send(registerUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });
  });
  describe('update user', () => {
    it('should update the user with given data', (done) => {
      chai.request(baseUrl)
        .put('/update/5afc3404d964381824e3a31e')
        .send({ role: 'admin' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('should logout user', () => {
    it('should logout current user', (done) => {
      chai.request(baseUrl)
        .get('/logout')
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('delete user', () => {
    it('should delete the given user', (done) => {
      chai.request(baseUrl)
        .delete('/5afc3404d964381824e3a31e')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
