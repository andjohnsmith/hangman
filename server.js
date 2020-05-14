const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const games = require('./routes/api/games');
const words = require('./routes/api/words');

const app = express();

const cors = require('cors');
app.use(cors());

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db config
const db = require('./config/keys').mongoURI;

// connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// use routes
app.use('/api/games', games);
app.use('/api/words', words);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
