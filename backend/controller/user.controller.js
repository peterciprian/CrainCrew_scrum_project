const User = require('../models/user');

/**
 * @module User
 */

module.exports = {

  /**
   * Profile function to get the user logged in
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  profile: (req, res) => {
    res.json({
      user: req.user,
    });
  },

  /**
   * List function to get all users
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  list: (req, res) => {
    User.find({}, (err, roles) => {
      if (err) {
        res.json(err);
      }
      res.json(roles);
    });
  },

  /**
   * Register function to create a new user
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  register: (req, res) => {
    User.register(new User({
      username: req.body.username,
      isAdmin: req.body.isAdmin,
      email: req.body.email,
      billingAddress: ' ',
      shippingAddress: ' ',
      phoneNumber: req.body.phoneNumber,
    }), req.body.password)
      .then(() => res.json({
        success: 'Sikeres regisztráció',
      }))
      .catch(err => res.send(err));
  },

  /**
   * Login function to login with previously created user
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  login: (req, res) => res.json({
    success: 'Sikeres belépés',
  }),

  /**
   * Logout function to logout with previously created user
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  logout: (req, res) => {
    req.logout();
    res.json({
      success: 'Sikeres kilépés',
    });
  },

  /**
   * UpdateProfile function to update a specific user, identified by userID
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  updateProfile: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.json(user);
      }
    });
  },

  /**
   * Delete function to delete a specific user, identified by userID
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  delete: (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.json(data);
      }
    });
  },
  changePass: (req, res) => {
    if (req.user) {
      if (req.user['_id'] == req.params.id) {
        User.findById(req.params.id).then((user) => {
          user.changePassword(req.body.oldPassword, req.body.newPassword, (passwordErr) => {
            if (passwordErr) {
              res.status(401).json({ err: 'Rossz jelszó' });
            } else {
              user.save();
              res.status(200).json({ success: 'Jelszó sikeresen megváltozott' });
            }
          });
        });
      } else { res.status(403).json({ err: 'Tiltott művelet' }); }
    } else { res.status(401).json({ err: 'Nincs bejelentkezve' }); }
  },
};
