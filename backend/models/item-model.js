const mongoose = require('mongoose');
const Order = require('./order-model');

const ItemSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
    unique: true,
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
