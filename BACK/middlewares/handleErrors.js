const { ERROR_DEFAULT } = require('../utils/consts');

const handleErrors = (err, req, res, next) => {
  if (!err.statusCode || !err.message) {
    res.status(ERROR_DEFAULT).send({ message: 'An error has occurred on the server' });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
  next();
};

module.exports = handleErrors;