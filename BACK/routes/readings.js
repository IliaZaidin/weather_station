const express = require('express');
const { celebrate, Joi } = require('celebrate');

const readingRouter = express.Router();
const { getReadings, deleteReading } = require('../controllers/readings');

readingRouter.get(
  '/',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
  }),
  getReadings,
);

readingRouter.delete(
  '/:readingId',
  celebrate({
    params: Joi.object().keys({
      readingId: Joi.string().alphanum().hex().length(24),
    }),
    headers: Joi.object().keys({}).unknown(true),
  }),
  deleteReading,
);

module.exports = readingRouter;