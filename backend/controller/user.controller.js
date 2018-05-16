const User = require('../models/user');

module.exports = {
  profile: (req, res) => {
    res.json({
      user: req.user,
    });
  },

  list: (req, res) => {
    User.find({}, (err, roles) => {
      if (err) {
        res.json(err);
      }
      res.json(roles);
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
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.json(user);
      }
    });
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
