const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/user/';
chai.use(chaiHttp);
const theAccount = {
  username: 'zsomboragain@zsombor.hu',
  password: 'zsombor11',
};
const registerUser = {
  username: 'testUser',
  email: 'testuseremail13@whatever.com',
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
        res.body.success.should.be.eql('Sikeres belépés');
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
          expect(res.body.user.username).be.eql('zsomboragain1');
          expect(res.body.user.email).be.eql('zsomboragain@zsombor.hu');
          expect(res.body.user.role).be.eql('admin');
          expect(res.body.user).to.have.property('shippingAddress');
          expect(res.body.user).to.have.property('billingAddress');
          done();
        });
    });
  });
  describe('register user', () => {
    it('should register a new user', (done) => {
      chai.request(baseUrl)
        .post('/register/')
        .send(registerUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          expect(res.body.success).be.eql('Sikeres regisztráció');
          done();
        });
    });
  });
  describe('update user', () => {
    it('should update the user with given data', (done) => {
      chai.request(baseUrl)
        .put('/update/5b01f40e9a74901c2c812d03')
        .send({ username: 'zsomboragain1' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body['_id']).be.eql('5b01f40e9a74901c2c812d03');
          expect(res.body.role).be.eql('admin');
          expect(res.body.username).be.eql('zsomboragain1');
          done();
        });
    });
  });
  describe('should logout user', () => {
    it('should logout current user', (done) => {
      chai.request(baseUrl)
        .get('/logout')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('object');
          expect(res.body.success).be.eql('Sikeres kilépés');
          done();
        });
    });
  });
  describe('delete user', () => {
    it('should delete the given user', (done) => {
      chai.request(baseUrl)
        .delete('/5b03e8231df2551080e727de')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body['_id']).be.eql('5b03e8231df2551080e727de');
          done();
        });
    });
  });
});
