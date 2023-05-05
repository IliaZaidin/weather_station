const express = require('express');
const indexRouter = express.Router();

const pollRouter = require('./polls');

indexRouter.use('/poll', pollRouter);

module.exports = indexRouter;