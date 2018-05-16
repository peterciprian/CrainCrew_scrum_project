const Order = require('../models/order-model.js');
const User = require('../models/user.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
  list: (req, res) => {
    Order.find({})
      .populate('user', 'username')
      .populate('items.item', 'name price')
      .then(orders => res.json(orders))
      .catch(err => res.send(err));
  },

  find: (req, res) => {
    Order.findById(req.params.id)
      .populate('user', 'username')
      .populate('items.item', 'name price')
      .then(order => res.json(order))
      .catch(err => res.send(err));
  },

  create: (req, res) => {
    Order.create(req.body)
      .then(order => /*{
        User.findByIdAndUpdate("5afadd53bc72ea24b898b6e5")
        .then((order) => {
          $push: { orders: order._id; } })
        .catch(err => res.send(err));}*/ res.json(order))
      .catch(err => res.send(err));
  },

  update: (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body)
      .then(order => res.json(order))
      .catch(err => res.send(err));
  },

  delete: (req, res) => {
    Order.findByIdAndRemove(req.params.id)
      .then(order => res.json(order))
      .catch(err => res.send(err));
  },

};
