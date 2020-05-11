const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
  answer: { type: String, required: true },
  view: { type: String, required: true },
  length: { type: Number, required: true },
  difficulty: { type: String, required: true },
});

module.exports = Word = mongoose.model('Word', WordSchema);
