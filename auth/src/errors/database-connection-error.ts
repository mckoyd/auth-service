import CustomError from './custom-error';

export default class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Dammit! Error connecting to database';
  constructor() {
    super('Error connecting to database');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
