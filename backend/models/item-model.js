const mongoose = require('mongoose');
// const Order = require('./order-model');

/**
 * ItemSchema schema
 * @constructor Item
 */
const ItemSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  url: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('Item', ItemSchema);
