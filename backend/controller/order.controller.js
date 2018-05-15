const Order = require('../models/order-model.js');
const Item = require('../models/item-model.js');
const User = require('../models/user.js');

module.exports = {
  list: (req, res) => {
    Order.find({}).then(item => res.json(item))
      .catch(err => res.send(err));
  },

  findOrder: (req, res) => {
    Order.findById(req.params.id)
      .then(order => res.json(order))
      .catch(err => res.send(err));
  },

  listOrderItems: (req, res) => {
    Order.findById(req.params.id)
      .then(Item.find({ _id: []}))
      .then(order => res.json(order))
      .catch(err => res.send(err));
  },

};
