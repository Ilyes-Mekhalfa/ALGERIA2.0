export default class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        // operational flag compatible with older code
        this.operational = true;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}