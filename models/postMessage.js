/** @format */

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: String,
  name: String,
  age: Number,
  fatherName: String,
  motherName: String,
  Bio: String,
});

module.exports = {
  PostMessage: mongoose.model('postMessage', postSchema),
};
