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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('Categ', CategSchema);
