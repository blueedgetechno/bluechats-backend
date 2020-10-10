const app = require('./app');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport')
const flash = require('express-flash')
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var PORT = process.env.PORT || 3000;

//connect to database
const dbURI = process.env.dbconnect;
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((result) => {
    app.listen(PORT)
  })
  .catch(err => console.log(err))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
