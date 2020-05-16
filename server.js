const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const config = require('config');

const app = express();

const cors = require('cors');
app.use(cors());

// body-parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// db config
const db = config.get('mongoURI');

// connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// use routes
app.use('/api/games', require('./routes/api/games'));
app.use('/api/words', require('./routes/api/words'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
