const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const tokenParts = token.split('.');
    const tokenPayload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());

    if (tokenPayload.type === 'user') {
      next();
    } else {
      return res.status(401).json({ message: 'Not allowed to perform this action' });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Invalid access' });
  }
};

module.exports = isAdmin;