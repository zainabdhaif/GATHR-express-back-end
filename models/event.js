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
    enum: ['Sports', 
      'Concert',
       'Food Festival',
        'Workshop', 
        'Shopping',
        'Culture',
        'Entertainment',
        'Art',
        'Science',
        'Motoring',
        'Charity',
        'Educational'], 
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

// eventSchema.pre('remove', async function(next) {
//   try {
//     await Booking.deleteMany({ eventid: this._id });
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// eventSchema.pre('findOneAndRemove', async function(next) {
//   try {
//     await Booking.deleteMany({ eventid: this._id });
//     next();
//   } catch (err) {
//     next(err);
//   }
// });


module.exports = mongoose.model('Event', eventSchema);
