const Item = require('../models/item-model.js');

/**
 * @module Product
 */
module.exports = {

  /**
   * List function to get all product
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */
  list: (req, res) => {
    Item.find({}).then(item => res.json(item))
      .catch(err => res.send(err));
  },

  /**
    * Find function to get a specific product
    * @param {Object} - Http request object
    * @param {Object} - Http response object
    * @returns {Object}
    */
  find: (req, res) => {
    Item.findById(req.params.id)
      .then(item => res.json(item))
      .catch(err => res.send(err));
  },

  /**
    * Create function to create a new product
    * @param {Object} - Http request object
    * @param {Object} - Http response object
    * @returns {Object}
    */
  create: (req, res) => {
    Item.create(req.body)
      .then(item => res.send(item))
      .catch(err => res.send(err));
  },
  /**
    * Update function to update an existing product
    * @param {Object} - Http request object
    * @param {Object} - Http response object
    * @returns {Object}
    */
  update: (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(item => res.json(item))
      .catch(err => res.send(err));
  },
  /**
    * Delete function to delete a specific product, identified by productID
    * @param {Object} - Http request object
    * @param {Object} - Http response object
    * @returns {Object}
    */
  delete: (req, res) => {
    Item.findByIdAndRemove(req.params.id)
      .then(item => res.json(item))
      .catch(err => res.send(err));
  },
};
