const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    // required: true
  },
  location: {
    type: String,
    // required: true
  },
  category: {
    type: String,
    enum: ['sports', 'music', 'food festival', 'workshop', 'shopping','culture','entertainment'], 
    required: true
  },
  dateStarted: {
    type: Date,
    required: true
  },
  dateEnded: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  }, 
  image: {
    type: String ,
    // required: true
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
}); 

module.exports = mongoose.model('Event', eventSchema);
