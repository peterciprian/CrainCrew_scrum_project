const mongoose = require('mongoose');

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
  category: {
    type: String,
    required: true,
    default: 'felnőtt',
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('Item', ItemSchema);
