const mongoose = require('mongoose');
const User = require('./user');

/**
 * ItemSchema schema
 * @constructor Comment
 */
const CommentSchema = new mongoose.Schema({

  comment: {
    type: String,
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('Comment', CommentSchema);
