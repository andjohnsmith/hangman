const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

/**
 * @route   POST /api/users
 * @desc    Register new user
 * @access  Public
 */
router.post('/', (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ message: 'Please enter all fields.' });
  }

  User.findOne({ username }).then((user) => {
    if (user) return res.status(400).json({ message: 'User already exists.' });

    const newUser = new User({
      name,
      username,
      password,
    });

    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
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
  });
});

module.exports = router;
