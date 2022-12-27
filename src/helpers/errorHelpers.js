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

module.exports = {
  EnhancedError,
  ValidationError,
};
