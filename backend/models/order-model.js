const mongoose = require('mongoose');

/**
 * OrderSchema schema
 * @constructor Order
 */
const OrderSchema = new mongoose.Schema({

  itemId: {
    type: mongoose.Schema.Types.ObjectId,
  },
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

