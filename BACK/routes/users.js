const express = require('express');
const { celebrate, Joi } = require('celebrate');

const userRouter = express.Router();

const { getCurrentUser } = require('../controllers/users');

userRouter.get(
  '/me',
  celebrate({
    headers: Joi.object().keys({}).unknown(true),
  }),
  getCurrentUser,
);

module.exports = userRouter;