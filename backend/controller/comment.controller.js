const Comment = require('../models/comment-model.js');
const User = require('../models/user');
const Item = require('../models/item-model');

/**
 * @module Comment
 */
module.exports = {
/**
   * List function to get all orders, populated with the correct user and product ID's
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  list: (req, res) => {
    Comment.find({})
      .populate('user', 'username')
      .then(comments => res.json(comments))
      .catch(err => res.send(err));
  },

  /**
   * Find function to get a specific order, populated with the correct user and product ID's
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  find: (req, res) => {
    Comment.findById(req.params.id)
      .populate('user', 'username')
      .then(comment => res.json(comment))
      .catch(err => res.send(err));
  },

  /**
   * Create function to create a new order
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  create: (req, res) => {
    Comment.create(req.body)
      .then(comment => res.json(comment))
      .catch(err => res.send(err));
  },

  /**
   * Update function to update a specific order, populated with the correct user and product ID's
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  update: (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('user', 'username')
      .then(comment => res.json(comment))
      .catch(err => res.send(err));
  },

  /**
   * Delete function to delete a specific order, identified by orderID
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */

  delete: (req, res) => {
    Comment.findByIdAndRemove(req.params.id)
      .then(comment => res.json(comment))
      .catch(err => res.send(err));
  },

};
