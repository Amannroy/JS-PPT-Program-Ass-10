// server/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// User registration
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save((err) => {
    if (err) {
      res.status(500).json({ error: 'Error registering new user.' });
    } else {
      res.status(200).json({ message: 'User registered successfully.' });
    }
  });
});

// User login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password }, (err, user) => {
    if (err || !user) {
      res.status(401).json({ error: 'Authentication failed.' });
    } else {
      res.status(200).json({ message: 'Login successful.' });
    }
  });
});

module.exports = router;
