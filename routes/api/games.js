const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Game = require('../../models/Game');
const Word = require('../../models/Word');

/**
 * @route   GET /api/games
 * @desc    Retrieve a user's games
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const games = Game.find({ user: req.user.id }).sort({ updatedAt: -1 });
    const result = [];

    for (const game of games) {
      result.push({
        id: game._id,
        view: game.view,
        turns: game.turns,
        status: game.status,
        guesses: game.guesses,
        difficulty: game.difficulty,
      });
    }

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET /api/games/:id
 * @desc    Get a game by its ID
 * @access  Private
 */
router.get('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    // Check user
    if (game.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const result = {
      id: game._id,
      view: game.view,
      turns: game.turns,
      status: game.status,
      guesses: game.guesses,
      difficulty: game.difficulty,
    };

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST /api/games
 * @desc    Create a game
 * @access  Private
 */
router.post(
  '/',
  [auth, [check('difficulty', 'Difficulty is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const words = await Word.find();
      let word;

      // Assign a word with the requested difficulty
      do {
        word = words[Math.floor(Math.random() * words.length)];
      } while (word.difficulty !== req.body.difficulty);

      const newGame = new Game({
        user: req.user.id,
        word: word._id,
        view: word.view,
        difficulty: req.body.difficulty,
      });

      const game = await newGame.save();

      const result = {
        id: game._id,
        view: game.view,
        turns: game.turns,
        status: game.status,
        guesses: game.guesses,
        difficulty: game.difficulty,
      };

      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

/**
 * @route   PUT /api/games/:id
 * @desc    Update a game
 * @access  Private
 */
router.put('/:id', [auth, checkObjectId('id')], async (req, res) => {
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

    if (game.status !== 'unfinished') {
      game.view = word.answer;
    }

    const updatedGame = await game.save();
    if (!updatedGame) throw Error('Could not update game');

    const result = {
      id: updatedGame._id,
      view: updatedGame.view,
      turns: updatedGame.turns,
      status: updatedGame.status,
      guesses: updatedGame.guesses,
      difficulty: updatedGame.difficulty,
    };

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE /api/games/:id
 * @desc    Delete a game
 * @access  Private
 */
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    await game.remove();

    res.json({ msg: 'Game removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
