/** @format */

const express = require('express');
const post = require('../controllers/posts');

const router = express.Router();

router.route('/').get(post.getPosts);
router.route('/').post(post.createPost);
router.route('/:id').patch(post.updatePost);
router.route('/:id').delete(post.deletePost);

module.exports = router;
