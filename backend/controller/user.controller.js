const User = require('../models/user');

module.exports = {
  profile: (req, res) => {
    res.json({
      user: req.user,
    });
  },

  register: (req, res) => {
    User.register(new User({
      username: req.body.username,
      isAdmin: req.body.isAdmin,
      email: req.body.email,
    }), req.body.password)
      .then(() => res.json({
        success: 'Sikeres regisztráció',
      }))
      .catch(err => res.send(err));
  },

  login: (req, res) => res.json({
    success: 'Sikeres belépés',
  }),

  logout: (req, res) => {
    req.logout();
    res.json({
      success: 'Sikeres kilépés',
    });
  },

  updateProfile: (req, res) => {

  },

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
};
