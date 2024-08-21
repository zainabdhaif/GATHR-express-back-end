// controllers/hoots.js

const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const isAdmin = require ('../middleware/is-admin.js');
const Event = require('../models/event.js');
const User = require('../models/user.js');
const Booking = require('../models/booking.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========

//create
router.post('/', verifyToken,isAdmin,async (req, res) => {
  try {
    req.body.owner = req.user.id;
    const event = await Event.create(req.body);
    event._doc.owner = req.user;
    const user = await User.findById(req.user.id);
    if (user) {
      user.events.push(event._id);
      await user.save();
    }
    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


//index
router.get('/', async (req, res) => {
    try {
      const events = await Event.find({})
        .populate('owner')
        .sort({ dateStarted: 'desc' });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json(error);
    }
  });

//show
router.get('/:eventId', async (req, res, next) => {
  try{
    const event = await Event.findById(req.params.eventId);
    res.status(200).json(event)
  }catch (error){
    res.status(500).json(error);
  }
})


//update
router.put('/:eventId',  verifyToken,isAdmin,async (req, res) => {
    try {
      const event = await Event.findById(req.params.eventId);
  
      if (!event.owner.equals(req.user.id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const updatedEvent = await Event.findByIdAndUpdate(
        req.params.eventId,
        req.body,
        { new: true }
      );
  
      updatedEvent._doc.owner = req.user;
  
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json(error);
    }
  });



router.delete('/:eventId', verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.eventId);
  
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!deletedEvent.owner.equals(req.user.id)) {
      return res.status(403).json({ message: "You're not allowed to do that!" });
    }

    // Delete bookings associated with the event
    await Booking.deleteMany({ eventid: deletedEvent._id });

    const user = await User.findById(req.user.id);
    user.events.pull(deletedEvent._id);
    await user.save();

    res.status(200).json(deletedEvent);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;