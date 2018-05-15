const mongoose = require('mongoose');
const Item = require('./item-model');
const User = require('./user');

const OrderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },

  }],
  price: {
    type: Number,
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('Order', OrderSchema);

