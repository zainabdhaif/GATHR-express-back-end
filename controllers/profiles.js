const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isOwner = require('../middleware/is-owner');

router.get('/:userId', isOwner, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404);
      throw new Error('Profile not found.');
    }

    res.json({ user });
  } catch (error) {
    if (res.statusCode === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
