class ExpressError extends Error {
  constructor(message, satatusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;
