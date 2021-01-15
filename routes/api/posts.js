const express = require('express');
const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');
const PostController = require('../../controllers/PostController');

// Routes Get api/posts
// desc GET An post
router.get('/:id', celebrate({
    [Segments.BODY]: {
        id: Joi.string().required()
    }
}), PostController.list)

// Routes GET api/posts
// desc GET All posts
router.get('/', PostController.list_all);

// Routes POST api/posts
// desc Create An post
router.post('/', celebrate({
    [Segments.BODY]: {
        title: Joi.string().required(),
        body: Joi.string().required()
    }
}), PostController.create);

// Routes PUT api/posts
// desc Update An post
router.put('/:id', celebrate({
    [Segments.BODY]: {
        title: Joi.string().required(),
        body: Joi.string().required()
    }
}), PostController.update);

// Routes DELETE api/posts/:id
// desc delete An post
router.delete('/:id', PostController.delete);

module.exports = router;