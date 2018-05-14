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
  },
  url: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
}, {
  timestamps: true,
});


module.exports = mongoose.model('Item', ItemSchema);
