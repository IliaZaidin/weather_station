const { ERROR_INVALID_DATA } = require('../utils/consts');

class InvalidDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INVALID_DATA;
  }
}

module.exports = InvalidDataError;