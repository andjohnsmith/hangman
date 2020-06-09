const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  answer: { type: String, required: true, unique: true },
  view: { type: String, required: true },
  length: { type: Number, required: true },
  difficulty: { type: String, required: true },
});

module.exports = Word = mongoose.model('Word', WordSchema);
