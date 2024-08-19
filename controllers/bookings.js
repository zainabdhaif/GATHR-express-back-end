const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const isUser = require ('../middleware/is-user.js');
const Booking = require('../models/booking.js');
const User = require('../models/user.js');
const Event = require('../models/event.js')
const router = express.Router();

router.use(verifyToken, isUser);

// async function insertMockEvent() {
//     try {
//         const event = new Event({
//             name: 'Music Concert',
//             description: 'A fun and exciting music concert with various artists.',
//             location: 'Manama',
//             category: 'music',
//         });
//         await event.save();
//         console.log('Mock event inserted successfully.');
//     } catch (error) {
//         console.error('Error inserting mock event:', error);
//     }
// }
// insertMockEvent();

// create booking

// router.post('/', async (req, res) => {
//     try {
//         req.body.userid = req.user.id; // user id from token
//         const booking = await Booking.create(req.body);
//         const user = await User.findById(req.user.id);
//         user.bookings.push(booking._id);
//         await user.save();
//         res.status(201).json(booking);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

router.post('/', async (req, res) => {
    try {
      const { eventid, quantity } = req.body;
      const date = req.body.date;
      const dateConverted = new Date(date);
      const event = await Event.findById(eventid);
      const startDate = new Date(event.dateStarted);
      const endDate = new Date(event.dateEnded);
      if (dateConverted < startDate || dateConverted > endDate) {
        return res.status(400).json({ error: 'Booking date is not within the event date range' });
      }
      const price = event.price * quantity;
      const booking = await Booking.create({
        userid: req.user.id,
        eventid,
        date,
        quantity,
        price
      });
      const user = await User.findById(req.user.id);
      user.bookings.push(booking._id);
      await user.save();
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find({ userid: req.user.id }).populate('eventid');
        res.json(bookings);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get booking by id
router.get('/:bookingID', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingID).populate('eventid');
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete booking
router.delete('/:bookingID', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.bookingID).populate('userid');
        const user = await User.findById(req.user.id);
        user.bookings.pull(booking._id);
        await user.save();
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;