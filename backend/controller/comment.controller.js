const Comment = require('../models/comment-model.js');
const request = require('request');

module.exports = {

  /**
   * List function to get all product
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */
  list: (req, res) => {
    Comment.find({})
      .populate('comments', 'comment')
      .then(item => res.json(item))
      .catch(err => res.send(err));

  },

  /**
    * Find function to get a specific product
    * @param {Object} - Http request object
    * @param {Object} - Http response object
    * @returns {Object}
    */
  find: (req, res) => {
    Comment.findById(req.params.id)
      .then(comment => res.json(comment))
      .catch(err => res.send(err));
  },

  /**
    * Create function to create a new product
    * @param {Object} - Http request object
    * @param {Object} - Http response object
    * @returns {Object}
    */
  create(req, res) {
    if (req.body.img) {
      const address = req.body.img;
      const url = req.body.url;
      req.body.img = `${url}.jpg`;
      request(address).pipe(fs.createWriteStream(`public/img/${url}.jpg`));
    }

    Comment.create(req.body)
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
    req.body.updatedAt = new Date();
    if (req.body.oldImg) {
      const address = req.body.img;
      const urlcim = req.body.url;
    }
    Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(comment => res.json(comment))
      .catch(err => res.send(err));
  },
  /**
    * Delete function to delete a specific product, identified by productID
    * @param {Object} - Http request object
    * @param {Object} - Http response object
    * @returns {Object}
    */
  delete: (req, res) => {
    Comment.findByIdAndRemove(req.params.id)
      .then((comment) => {
        res.json(comment);
      })
      .catch(err => res.send(err));
  },
};
