class EnhancedError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends EnhancedError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFoundError extends EnhancedError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  EnhancedError,
  ValidationError,
  NotFoundError,
};
