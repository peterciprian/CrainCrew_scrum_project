// const Item = require('../models/item-model');
// const mongoose = require('mongoose');
// const fs = require('fs');
// mongoose.Promise = require('bluebird');

// module.exports = {
//   list: (req, res) => {
//     Item.find({}).then(item => res.json(item))
//       .catch(err => res.json(err));
//   },

//   find: (req, res) => {
//     Item.findById(req.params.id)
//       .then(item => res.json(item))
//       .catch(err => res.json(err));
//   },

//   create: (req, res) => {
//     let body = JSON.stringify(req.body);
//     body = JSON.parse(body);

//     if (req.file) {
//       body.img = `http://localhost:8080/${req.file.path.replace(/\\/, '/')}`;
//     }

//     Item.create(req.body)
//       .then(item => res.json(item))
//       .catch(err => res.json(err));
//   },

//   update: (req, res) => {
//     let body = JSON.stringify(req.body);
//     body = JSON.parse(body);

//     if (req.file) {
//       body.img = `http://localhost:8080/${req.file.path.replace(/\\/, '/')}`;
//     }

//     Item.findByIdAndUpdate(req.params.id, req.body)
//       .then((item) => {
//         let imgRoute = Item.img;
//         imgRoute = imgRoute.substring(22);
//         console.log(imgRoute);

//         fs.unlink(imgRoute, (err) => {
//           if (err) throw err;
//         });

//         if (item) {
//           res.json(item);
//         } else {
//           res.json({ message: 'Not a valid Id!' });
//         }
//       })
//       .catch(err => res.json(err));
//   },

//   delete: (req, res) => {
//     Item.findByIdAndRemove(req.params.id)
//       .then((item) => {
//         let imgRoute = Item.img;
//         imgRoute = imgRoute.substring(22);
//         console.log(imgRoute);

//         fs.unlink(imgRoute, (err) => {
//           if (err) throw err;
//         });

//         if (item) {
//           res.json(item);
//         } else {
//           res.json({ message: 'Not a valid Id!' });
//         }
//       })
//       .catch(err => res.json(err));
//   },
// };

const Item = require('../models/item-model.js');

module.exports = {
  list: (req, res) => {
    Item.find({}).then(item => res.json(item))
      .catch(err => res.send(err));
  },

  find: (req, res) => {
    Item.findById(req.params.id)
      .then(item => res.json(item))
      .catch(err => res.send(err));
  },

  create: (req, res) => {
    Item.create(req.body)
      .then(item => res.send(item))
      .catch(err => res.send(err));
  },

  update: (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body)
      .then(item => res.json(item))
      .catch(err => res.send(err));
  },

  delete: (req, res) => {
    Item.findByIdAndRemove(req.params.id)
      .then(item => res.json(item))
      .catch(err => res.send(err));
  },
};
