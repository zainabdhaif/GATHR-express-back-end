const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  eventid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', 
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price:{
    type: Number,
    required:true
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
