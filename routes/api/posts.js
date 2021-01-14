const express = require('express');
const router = express.Router();

const PostController = require('../../controllers/PostController');
// Posts Model
const Posts = require('../../models/Post');

// Routes Get api/posts
// dec GET An post
router.get('/:id', PostController.list)

// Routes GET api/posts
// desc GET All posts
router.get('/', PostController.list_all);

// Routes POST api/posts
// desc Create An post
router.post('/', PostController.create);

// Routes PUT api/posts
// desc Update An post
router.put('/:id', PostController.update);

// Routes DELETE api/posts/:id
// desc delete An post
router.delete('/:id', PostController.delete);

module.exports = router;