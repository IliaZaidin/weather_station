const { ERROR_UNAUTHORIZED } = require('../utils/consts');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;