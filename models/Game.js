const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    word: { type: Schema.Types.ObjectId, ref: 'Word', required: true },
    view: { type: String, required: true },
    turns: { type: Number, required: true, default: 6 },
    status: { type: String, required: true, default: 'unfinished' },
    guesses: { type: [String], default: [] },
    difficulty: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = Game = mongoose.model('Game', GameSchema);
