const mongoose = require('mongoose');
const User = require('./user');
const Item = require('./item-model');

/**
 * ItemSchema schema
 * @constructor Comment
 */
const CommentSchema = new mongoose.Schema({

  comment: {
    type: String,
    required: true,
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('Comment', CommentSchema);
