const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
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
});


module.exports = mongoose.model('Item', ItemSchema);
