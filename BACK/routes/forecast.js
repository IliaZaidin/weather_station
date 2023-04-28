const express = require('express');
const { celebrate, Joi } = require('celebrate');

const forecastRouter = express.Router();
const { getForecast } = require('../controllers/forecast');

forecastRouter.get(
  '/',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
  }),
  getForecast,
);

module.exports = forecastRouter;