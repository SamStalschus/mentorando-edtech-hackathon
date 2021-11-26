export class AppError extends Error {
  constructor(message, statusCode = 400, caller) {
    super(message)
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name
    this.status = statusCode

    console.log(`[${caller}]`, message, statusCode)
  }

  statusCode() {
    return this.status
  }
}