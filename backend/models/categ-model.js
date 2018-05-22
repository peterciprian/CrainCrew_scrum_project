const mongoose = require('mongoose');

/**
 * CategSchema schema
 * @constructor Categ
 */
const CategSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  sequence: {
    type: Number,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Categ', CategSchema);
