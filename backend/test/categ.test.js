const chai = require('chai');
const expect = require('chai').expect;
const should = require('chai').should();
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/categ/';
chai.use(chaiHttp);
const theAccount = {
  username: 'balazsadmin@gmail.com',
  password: 'balazsadmin',
};
const registerCategory = {
  name: 'testCategory',
  sequence: 9,
};

let cookie;

describe('Categ', () => {
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

  describe('list all categories', () => {
    it('should list all categories', (done) => {
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

  describe('list one category', () => {
    it('should list one category', (done) => {
      chai.request(baseUrl)
        .get('/5b02c6ef420f7430e0892149')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });
  });

  describe('create new category', () => {
    it('should create new category', (done) => {
      chai.request(baseUrl)
        .post('/')
        .send(registerCategory)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });
  });

  describe('update category', () => {
    it('should update the category with given data', (done) => {
      chai.request(baseUrl)
        .put('/5b05830fc782b7ff0c97bbea')
        .send({ name: 'blabla' })
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.name).be.eql('blabla');
          done();
        });
    });
  });

  describe('delete one category', () => {
    it('should delete one category', (done) => {
      chai.request(baseUrl)
        .delete('/5b05830fc782b7ff0c97bbea')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });
  });
});
