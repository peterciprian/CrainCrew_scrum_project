const Order = require('../models/order-model.js');
const Item = require('../models/item-model.js');
const User = require('../models/user.js');
const mongoose = require('mongoose');

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

  remove: (req, res) => {
    Item.findByIdAndRemove(req.params.id)
      .then(item => res.json(item))
      .catch(err => res.send(err));
  },
};
