const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    // required: true
  },
  about: {
    type: String,
    // required: true
  },
  groupimage: {
    type: String,
    default: "https://raw.githubusercontent.com/blueedgetechno/BlueBlogs---A-social-platform/master/static/img/profile/vib.jpg"
  },
  messages: {
    type: Array,
    "default": []
  }
}, {timestamps: true});


const Group = mongoose.model('Group', groupSchema)
module.exports = Group;
