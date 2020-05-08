const express = require('express');
const router = express.Router();

const Game = require('../../models/Game');

// @route   GET /api/games
// @desc    Retrieve all games
// @access  Public
router.get('/', (req, res) => {
  Game.find()
    .sort({ createdAt: -1 })
    .then((games) => res.json(games));
});

// @route   POST /api/games
// @desc    Create a game
// @access  Public
router.post('/', (req, res) => {
  const newGame = new Game({
    answer: 'apple',
    view: '_____',
    turns: 5,
    guesses: '',
    difficulty: req.body.difficulty,
  });

  newGame.save().then((game) => res.json(game));
});

// @route   DELETE /api/games/:id
// @desc    Delete a game
// @access  Public
router.delete('/:id', (req, res) => {
  Game.findById(req.params.id)
    .then((game) => game.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
