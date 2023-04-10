const { ERROR_ACCESS_DENIED } = require('../utils/consts');

class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_ACCESS_DENIED;
  }
}

module.exports = AccessDeniedError;