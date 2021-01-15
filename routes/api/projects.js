const { request } = require('express');
const express = require('express');
const ProjectController = require('../../controllers/ProjectController');
const authMiddleware = require('../../middlewares/auth');
const router = express.Router();

router.use(authMiddleware);

router.get('/', ProjectController.teste)

module.exports = router;