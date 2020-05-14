const express = require('express');
const router = express.Router();

const Game = require('../../models/Game');
const Word = require('../../models/Word');

/**
 * @route   GET /api/games
 * @desc    Retrieve all games
 * @access  Public
 */
router.get('/', (req, res) => {
  Game.find()
    .sort({ updatedAt: -1 })
    .then((games) => {
      for (let game of games) {
        game.word = undefined;
      }
      res.json(games);
    });
});

/**
 * @route   POST /api/games
 * @desc    Create a game
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const words = await Word.find();
    let word;

    do {
      word = words[Math.floor(Math.random() * words.length)];
    } while (word.difficulty !== req.body.difficulty);

    const newGame = new Game({
      word: word._id,
      view: word.view,
      difficulty: req.body.difficulty,
    });

    const game = await newGame.save();

    if (!game) {
      throw Error('Something went wrong while saving.');
    }

    game.word = undefined;

    res.status(200).json(game);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * @route   GET /api/games/:id
 * @desc    Get a game
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) throw Error('Game does not exist');

    game.word = undefined;

    res.status(200).json(game);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * @route   PUT /api/games/:id
 * @desc    Update a game
 * @access  Public
 */
router.put('/:id', async (req, res) => {
  try {
    let game = await Game.findById(req.params.id);
    if (!game) throw Error('Game does not exist');

    if (
      game.status !== 'unfinished' ||
      (game.guesses && game.guesses.includes(req.body.guess))
    ) {
      res.status(200).json(game);
    }

    const word = await Word.findById(game.word);
    if (!word) throw Error('Answer cannot be found');

    const guess = req.body.guess.toLowerCase();
    if (!guess || guess.length > 1 || guess === guess.toUpperCase())
      throw Error('You must guess a letter');
    game.guesses.push(guess);

    let isPresent = false; // the guess is present in the answer
    for (let i = 0; i < word.length; i++) {
      if (word.answer[i] === guess) {
        // replace char in view with guess
        game.view = game.view.substr(0, i) + guess + game.view.substr(i + 1);
        isPresent = true;

        if (game.view === word.answer) {
          // word is complete
          game.status = 'victory';
          break;
        }
      }
    }

    if (!isPresent) {
      game.turns--;
      if (game.turns === 0) {
        game.status = 'loss';
      }
    }

    const updatedGame = await game.save();
    if (!updatedGame) throw Error('Could not update game');

    updatedGame.word = undefined;

    res.status(200).json(updatedGame);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/**
 * @route   DELETE /api/games/:id
 * @desc    Delete a game
 * @access  Public
 */
router.delete('/:id', (req, res) => {
  Game.findById(req.params.id)
    .then((game) => game.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
