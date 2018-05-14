const mongoose = require('mongoose');
const Item = require('./item-model');
const User = require('./user');

const OrderSchema = new mongoose.Schema({

  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('Order', OrderSchema);
