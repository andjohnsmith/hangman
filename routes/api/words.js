const express = require('express');
const router = express.Router();

const Word = require('../../models/Word');

/**
 * @route   GET /api/words
 * @desc    Retrieve all words
 * @access  Public
 */
router.get('/', (req, res) => {
  Word.find().then((words) => {
    res.json(words);
  });
});

/**
 * @route   POST /api/words
 * @desc    Create a word
 * @access  Public
 */
router.post('/', (req, res) => {
  const answer = req.body.answer;
  let view = '';
  let length = 0;
  let difficulty = '';

  for (let c of answer) {
    if (c >= 'a' && c <= 'z') {
      view += '_';
      length++;
    } else {
      view += c;
    }
  }

  if (length < 6) {
    difficulty = 'easy';
  } else if (length < 10) {
    difficulty = 'medium';
  } else {
    difficulty = 'hard';
  }

  const newWord = new Word({
    answer,
    view,
    length,
    difficulty,
  });

  newWord.save().then((word) => res.json(word));
});

/**
 * @route   DELETE /api/words/:id
 * @desc    Delete a word
 * @access  Public
 */
router.delete('/:id', (req, res) => {
  Word.findById(req.params.id)
    .then((word) => word.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
