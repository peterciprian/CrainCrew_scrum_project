const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const user = require('../models/user');

const baseUrl = 'http://localhost:8080/user';
const should = chai.should();
chai.use(chaiHttp);

describe('User', () => {
  // Test GET user profile
  describe('GET profile', () => {
    it('it should get the user logged in', (done) => {
      chai.request(baseUrl)
        .get('/profile')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('username').eql(user.username);
          res.body.username.should.be.a('string');
          res.body.should.have.property('email').eql(user.email);
          res.body.email.should.be.a('string');
          res.body.should.have.property('role');
          res.body.role.should.be.a('string');
          done();
        });
    });
  });
  // Test POST/Register user
  describe('/Post user', () => {
    it('it should register a new user', (done) => {
      const user = {
        username: 'bhajko',
        email: 'bhajko4@gmail.com',
        password: 'password',
        role: 'user',
      };
      chai.request(baseUrl)
        .post('/register')
        .send('user')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.username.should.be.a('string');
          res.body.should.have.property('email');
          res.body.email.should.be.a('string');
          res.body.should.have.property('password');
          res.body.email.should.be.a('string');
          res.body.should.have.property('role');
          res.body.role.should.be.a('string');
          done();
        });
    });
  });
  // Test UPDATE user
  describe('/PUT:id user', () => {
    it('it should update a given user', (done) => {
      const user = {
        username: 'bhajko',
        email: 'bhajko4@gmail.com',
        password: 'password',
        role: 'user',
      };
      chai.request(baseUrl)
        .put(`/update/${user.id}`)
        .send({
          username: 'bhajko',
          email: 'bhajko4@gmail.com',
          password: 'password2',
          role: 'user',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.user.should.have.property('password').eql('password2');
          done();
        });
    });
  });

  // Test Delete user
  describe('/DELETE:id user', () => {
    it('it should delete a given user', (done) => {
      const user = {
        username: 'bhajko',
        email: 'bhajko4@gmail.com',
        password: 'password',
        role: 'user',
      };
      chai.request(baseUrl)
        .delete(user.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
    });
  });
});
