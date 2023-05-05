const express = require('express');
const pollRouter = express.Router();
const { pollSensor } = require('../controllers/polls');

pollRouter.get('/poll', pollSensor);

module.exports = pollRouter;