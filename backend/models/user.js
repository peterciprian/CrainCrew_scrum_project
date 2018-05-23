const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/**
 * userSchema schema
 * @constructor user
 */

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  billingAddress: {
    Country: {
      type: String,
    },
    City: {
      type: String,
    },
    Street: {
      type: String,
    },
    Zipcode: {
      type: Number,
    },
  },

  shippingAddress: {
    Country: {
      type: String,
    },
    City: {
      type: String,
    },
    Street: {
      type: String,
    },
    Zipcode: {
      type: Number,
    },
  },
  
  phoneNumber: {
    type: Number,
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
}, {
  timestamps: true,
});


userSchema.plugin(passportLocalMongoose, {
  maxAttempts: 5,
  hashField: 'password',
  usernameField: 'email',
});

module.exports = mongoose.model('User', userSchema);
