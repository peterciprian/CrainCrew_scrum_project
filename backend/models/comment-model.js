const mongoose = require('mongoose');
// const Order = require('./order-model');

/**
 * ItemSchema schema
 * @constructor Comment
 */
const CommentSchema = new mongoose.Schema({

  category: {
    type: String,
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  num: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('Comment', CommentSchema);
