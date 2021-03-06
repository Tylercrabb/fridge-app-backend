'use strict';

const express = require('express');
const mongoose = require('mongoose');
const {PORT, MONGODB_URI} = require('./config');
const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.use(express.json());

// routers go here
const itemRouter = require('./Routes/itemRoute');
const pantryRouter = require('./Routes/pantryItemRoute');
const usersRouter = require('./Routes/users');
const authRouter = require('./Routes/auth')

// passport strategy
passport.use(localStrategy);
passport.use(jwtStrategy);

// mount the routers

app.use('/api/item', itemRouter);
app.use('/api/pantry', pantryRouter);
app.use('/api/users', usersRouter);
app.use('/api', authRouter );
// 404 error handler

app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// error handler

app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// start it up

if (require.main === module) {
  // Connect to DB and Listen for incoming connections
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex : true })
    .then(instance => {
      const conn = instance.connections[0];
      console.info(`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`);
    })
    .catch(err => {
      console.error(err);
    });
  
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

module.exports = app;