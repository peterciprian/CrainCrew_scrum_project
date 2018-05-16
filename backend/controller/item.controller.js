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
