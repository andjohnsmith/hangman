const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

/**
 * @route   POST /api/auth
 * @desc    Authenticate a user
 * @access  Public
 */
router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please enter all fields.' });
  }

  User.findOne({ username }).then((user) => {
    if (!user) return res.status(400).json({ message: 'User does not exist.' });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ message: 'Invalid credentials.' });
      jwt.sign(
        { id: user._id },
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
            },
          });
        },
      );
    });
  });
});

/**
 * @route   GET /api/auth/user
 * @desc    Get a user's data
 * @access  Private
 */
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
});
module.exports = router;
