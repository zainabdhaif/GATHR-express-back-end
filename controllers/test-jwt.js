const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/verify-token', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({ decoded });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});
module.exports = router;
