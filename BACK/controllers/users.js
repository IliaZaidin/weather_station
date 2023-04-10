/* eslint-disable no-console */
const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const UnauthorizedError = require('../middlewares/unauthorizedError');

const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name
    });
    res.status(201).send({ email: user.email, name: user.name });
  } catch (error) {
    if (error.name === 'ValidationError') {
      error.status = 400;
      error.message = 'Invalid user ID passed to the server';
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Wrong email or password');
    } else {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        throw new UnauthorizedError('Wrong email or password');
      } else {
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        res.status(200).send({ token });
      }
    }
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      error.status = 400;
      error.message = 'Invalid user ID passed to the server';
    }
    next(error);
  }
};

module.exports = {
  createUser, login, getCurrentUser,
};