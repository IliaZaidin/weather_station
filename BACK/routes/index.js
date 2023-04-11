const express = require('express');

const indexRouter = express.Router();

const userRouter = require('./users');
const readingRouter = require('./readings');

indexRouter.use('/users', userRouter);
indexRouter.use('/readings', readingRouter);

module.exports = indexRouter;