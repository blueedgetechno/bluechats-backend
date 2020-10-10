const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    default: "Random User"
    // required: true
  },
  username: {
    type: String,
    unique: true
    // required: true,
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "https://raw.githubusercontent.com/blueedgetechno/BlueBlogs---A-social-platform/master/static/img/post/echo.png"
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema)
module.exports = User;
