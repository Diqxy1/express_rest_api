const express = require('express');
const authMiddleware = require("../../middlewares/auth");
const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');
const AuthController = require('../../controllers/AuthController');

router.use(authMiddleware);

// Routes POST api/users
// desc POST An user
router.post('/register', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), AuthController.register)

// Routes POST api/users
router.post('/autenticate', celebrate({
    [Segments.BODY]: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), AuthController.authenticate)

module.exports = router;