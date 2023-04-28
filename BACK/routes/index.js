const express = require('express');

const indexRouter = express.Router();

const readingRouter = require('./readings');
const forecastRouter = require('./forecast');

indexRouter.use('/readings', readingRouter);
indexRouter.use('/forecast', forecastRouter);

module.exports = indexRouter;