const Order = require('../models/order-model.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

/**
 * @module Order
 */
module.exports = {

  /**
   * List function to get all orders, populated with the correct user and product ID's
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  list: (req, res) => {
    Order.find({})
      .populate('user', 'username')
      .populate('items.item', 'name price')
      .then(orders => res.json(orders))
      .catch(err => res.send(err));
  },

  /**
   * Find function to get a specific order, populated with the correct user and product ID's
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  find: (req, res) => {
    Order.findById(req.params.id)
      .populate('user', 'username')
      .populate('items.item', 'name price')
      .then(order => res.json(order))
      .catch(err => res.send(err));
  },

  /**
   * Create function to create a new order
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  create: (req, res) => {
    Order.create(req.body)
      .then(order => res.json(order))
      .catch(err => res.send(err));
  },

  /**
   * Update function to update a specific order, populated with the correct user and product ID's
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  update: (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('user', 'username')
      .populate('items.item', 'name price')
      .then(order => res.json(order))
      .catch(err => res.send(err));
  },

  /**
   * Delete function to delete a specific order, identified by orderID
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  delete: (req, res) => {
    Order.findByIdAndRemove(req.params.id)
      .then(order => res.json(order))
      .catch(err => res.send(err));
  },

};
