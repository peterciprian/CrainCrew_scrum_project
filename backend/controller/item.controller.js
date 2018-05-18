const Item = require('../models/item-model.js');
const mongoose = require('mongoose');
const fs = require('fs');
mongoose.Promise = require('bluebird');

  /**
   * Converts name to searchable and saveable string.
   * Removes special characters, changes all Hun special characters to En, and all spaces to one hyphen
   * @param {string} str - name to convert
   * @return {string}
   */
function removeSpecChar(str) {
  if (!str) {
    return 'no-name';
  }
  let imgName = str.toLocaleLowerCase();

  const hunChar = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ö: 'o',
    ő: 'o',
    ú: 'u',
    ü: 'u',
    ű: 'u',
  };
  imgName = imgName.replace(/[\?:;,\.\+\*_]/g, ''); // spec karaktereket kicsréli semmire globálisan
  imgName = imgName.replace(/[áéíóöőúüű]/g, c => hunChar[c]); 
  imgName = imgName.replace(/[ -]+/g, '-'); // a szóközt egyszer v többször ha előfordul kicserélem kötőjelre
  return str;
}

/**
 * @module Product
 */
module.exports = {

  /**
   * List function to get all products
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
   * Uses Mongoose findById method. 
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}a
   */
  find: (req, res) => {
    Item.findById(req.params.id)
      .then((item) => {
        if (item) {
          res.status(200).json(item);
        } else {
          res.status(404).json({
            message: 'Id not found!',
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  /**
   * Create function to create a new product
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */
  create: (req, res) => {
    let body = JSON.stringify(req.body);
    body = JSON.parse(body);

    if (req.file) {
      body.img = `http://localhost:8080/${req.file.path.replace(/\\/, '/')}`;
    }
    Item.create(body)
      .then(item => res.send(item))
      .catch(err => res.status(500).json({
        error: err,
      }));
  },

  /**
   * Update function to update an existing product. 
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */
  update: (req, res) => {
    let body = JSON.stringify(req.body);
    body = JSON.parse(body);

    if (req.file) {
      body.img = `http://localhost:8080/${req.file.path.replace(/\\/, '/')}`;
    } else {
      body.img = Item.img;
    }

    body.url = removeSpecChar(body.name);

    Item.findByIdAndUpdate(req.params.id, body, {
      new: true,
    })
      .then((item) => {
        if (item.img !== '') {
          const imgpath = `./${item.img.substring(22)}`;
          fs.exists(imgpath, (exists) => {
            if (exists) {
              fs.unlink(imgpath, (err) => {
                if (err) throw err;
              });
            }
          });
        }
        res.json(item);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  /**
   * Delete function to delete a specific product, identified by productID
   * Also deletes image file on server
   * @param {Object} - Http request object
   * @param {Object} - Http response object
   * @returns {Object}
   */
  delete: (req, res) => {
    Item.findByIdAndRemove(req.params.id)
      .then(item => {
        if (item.img) {
          const imgpath = `./${item.img.substring(22)}`;
          fs.unlink(imgpath, (err) => {
            if (err) {
              throw err;
            }
            console.log('img was deleted');
          });
        }
        res.json(item)
      })
      .catch(err => res.send(err));
  },
};