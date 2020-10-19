const dotenv = require('dotenv');
dotenv.config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const { connect } = require('./db');

const authRouter = require('./routes/authorization');
const usersRouter = require('./routes/users');

const app = express();

// Establishing connection with the database
connect();

// view engine setup for rendering error page

app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Access static files in public folder via localhost/images/... or localhost/stylesheet/...
app.use(express.static('public'));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/', authRouter);
// catch 404 and forward to error handler
// As if routers above were not triggered, then page is invalid
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    status: err.status,
    message: err.message,
    path: req.protocol + '://' + req.get('host') + req.originalUrl,
  });
});

module.exports = app;
