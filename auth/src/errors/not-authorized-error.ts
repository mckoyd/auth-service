import CustomError from './custom-error';

export default class NotAuthorizedError extends CustomError {
  statusCode = 401;
  constructor() {
    super('Forbidden');
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: 'Dammit! You are not authorized to view this page.',
      },
    ];
  }
}
