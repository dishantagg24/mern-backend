/** @format */

const { default: mongoose } = require('mongoose');
const { PostMessage } = require('../models/postMessage');

const post = {};

post.getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

post.createPost = async (req, res) => {
  try {
    const post = await PostMessage.findOne(req.body);
    if (post) {
      throw new Error('This info is already available');
    }
    const newPost = new PostMessage(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

post.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`No post with id: ${id}`);
    }
    const { title, name, age, motherName, fatherName, Bio } = req.body;
    const post = { title, name, age, motherName, fatherName, Bio, _id: id };
    await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

post.deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: 'Post deleted successfully.' });
};

module.exports = post;
