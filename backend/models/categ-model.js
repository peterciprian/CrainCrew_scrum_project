const mongoose = require('mongoose');

/**
 * CategSchema schema
 * @constructor Categ
 */
const CategSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sequence: {
    type: Number,
    required: true,
    default: 1,
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
