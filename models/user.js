const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },

  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking' 
  }],
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event' 
  }]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  }
});

module.exports = mongoose.model('User', userSchema);
