const Categ = require('../models/categ-model.js');

/**
 * @module Categ
 */
module.exports = {

  /**
   * List function to get all categories
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */
  list: (req, res) => {
    Categ.find({}).then(categ => res.json(categ))
      .catch(err => res.send(err));
  },

  /**
    * Find function to get a specific category
    * @param {Object} - Http request object
    * @param {Object} - Http response object
    * @returns {Object}
    */
  find: (req, res) => {
    Categ.findById(req.params.id)
      .then(categ => res.json(categ))
      .catch(err => res.send(err));
  },

  /**
    * Create function to create a new category
    * @param {Object} - Http request object
    * @param {Object} - Http response object
    * @returns {Object}
    */
  create(req, res) {
    req.body.name = req.body.name.toLowerCase();
    Categ.create(req.body)
      .then(categ => res.send(categ))
      .catch(err => res.send(err));
  },

  /**
    * Update function to update an existing category
    * @param {Object} - Http request object
    * @param {Object} - Http response object
    * @returns {Object}
    */
  update: (req, res) => {
    req.body.updatedAt = new Date();
    Categ.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(categ => res.json(categ))
      .catch(err => res.send(err));
  },
  /**
    * Delete function to delete a specific category, identified by _id
    * @param {Object} - Http request object
    * @param {Object} - Http response object
    * @returns {Object}
    */
  delete: (req, res) => {
    Categ.findByIdAndRemove(req.params.id)
      .then((categ) => {
        res.json(categ);
      })
      .catch(err => res.send(err));
  },
};
