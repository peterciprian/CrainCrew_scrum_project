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
          //   res.body.should.have.property('username')/* .eql(user.username) */;
          //   res.body.username.should.be.a('string');
          //   res.body.should.have.property('email')/* .eql(user.email) */;
          //   res.body.email.should.be.a('string');
          //   res.body.should.have.property('role');
          //   res.body.role.should.be.a('string');
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
/**

* useradmin.controller összevont unit teszt

* @todo debug test of editUser, removeUser

*/
// describe('useradmin.controller functions', () => {
//   describe('listUsers()', () => {
//     it('response statusCode equal to 200 and object in res', (done) => {
//       chai.request(baseUrl)
//         .get('/')
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res).to.be.an('object');
//           done();
//         });
//     });
//   });

//   describe('editUser()', () => {
//     // Login során kapunk egy sütit a http headerbe, ezt lementjük a süti változóba

//     // Ez azért kell mert minden kérésnél, amihez szükséges a belépett user,

//     // el kell küldeni a kapott sütit is. Hiszen ez azonosítja a usert

//     // Itt nincs böngésző ami lementse, így manuálisan kell


//     it('response statusCode equal to 200', (done) => {
//       chai.request(baseUrl)

//         .put('/5afab001e8a028273ccecb24')

//         // A sütit visszaküldjük minden kérésnél, ahol kell a user azonosítása

//         .set('Cookie', cookie)

//         .end((err, res) => {
//           expect(res).to.have.status(200);

//           console.log(cookie);

//           done();
//         });
//     });
//   });

//   describe('removeUser()', () => {
//     it('response statusCode equal to 200', (done) => {
//       chai.request(baseUrl)

//         .delete('/5afb311edfdd372d041dda96')

//         // A sütit visszaküldjük minden kérésnél, ahol kell a user azonosítása

//         .set('Cookie', cookie)

//         .end((err, res) => {
//           expect(res).to.have.status(200);

//           done();
//         });
//     });
//   });
// });

// // Test GET user profile
// //   describe('GET profile', () => {
// //     it('it should get the user logged in', (done) => {
// //       chai.request(baseUrl)
// //         .get('/profile')
// //         .end((err, res) => {
// //           res.should.have.status(200);
// //           res.body.should.be.a('object');
// //           res.body.should.have.property('username')/* .eql(user.username) */;
// //           res.body.username.should.be.a('string');
// //           res.body.should.have.property('email')/* .eql(user.email) */;
// //           res.body.email.should.be.a('string');
// //           res.body.should.have.property('role');
// //           res.body.role.should.be.a('string');
// //           done();
// //         });
// //     });
// //   }););
// //   // Test POST/Register user
// //   describe('/Post user', () => {
// //     it('it should register a new user', (done) => {
// //       const user = {
// //         username: 'bhajko',
// //         email: 'bhajko4@gmail.com',
// //         password: 'password',
// //         role: 'user',
// //       };
// //       chai.request(baseUrl)
// //         .post('/register')
// //         .send('user')
// //         .end((err, res) => {
// //           res.should.have.status(200);
// //           res.body.should.be.a('object');
// //           res.body.should.have.property('username');
// //           res.body.username.should.be.a('string');
// //           res.body.should.have.property('email');
// //           res.body.email.should.be.a('string');
// //           res.body.should.have.property('password');
// //           res.body.email.should.be.a('string');
// //           res.body.should.have.property('role');
// //           res.body.role.should.be.a('string');
// //           done();
// //         });
// //     });
// //   });
// //   // Test UPDATE user
// //   describe('/PUT:id user', () => {
// //     it('it should update a given user', (done) => {
// //       const user = {
// //         username: 'bhajko',
// //         email: 'bhajko4@gmail.com',
// //         password: 'password',
// //         role: 'user',
// //       };
// //       chai.request(baseUrl)
// //         .put(`/update/${user.id}`)
// //         .send({
// //           username: 'bhajko',
// //           email: 'bhajko4@gmail.com',
// //           password: 'password2',
// //           role: 'user',
// //         })
// //         .end((err, res) => {
// //           res.should.have.status(200);
// //           res.body.should.be.a('object');
// //           res.body.user.should.have.property('password').eql('password2');
// //           done();
// //         });
// //     });
// //   });

// //   // Test Delete user
// //   describe('/DELETE:id user', () => {
// //     it('it should delete a given user', (done) => {
// //       const user = {
// //         username: 'bhajko',
// //         email: 'bhajko4@gmail.com',
// //         password: 'password',
// //         role: 'user',
// //       };
// //       chai.request(baseUrl)
// //         .delete(user.id)
// //         .end((err, res) => {
// //           res.should.have.status(200);
// //           res.body.should.be.a('object');
// //         });
// //     });
// //   });
//
