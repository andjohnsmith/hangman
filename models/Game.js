const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    view: { type: String, required: true },
    answer: { type: String, required: true },
    turns: { type: Number, required: true },
    guesses: { type: String },
    difficulty: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = Game = mongoose.model('Game', GameSchema);
