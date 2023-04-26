const express = require('express');

const indexRouter = express.Router();

const readingRouter = require('./readings');

indexRouter.use('/readings', readingRouter);

module.exports = indexRouter;