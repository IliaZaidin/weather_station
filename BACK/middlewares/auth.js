const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const Unauthorized = require('./unauthorizedError');
const AccessDeniedError = require('./accessDeniedError');

const authorize = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Authorization required');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    if (!payload) {
      throw new AccessDeniedError('Access denied');
    }
    req.user = payload; // adds user
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authorize };