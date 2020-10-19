import CustomError from './custom-error';

export default class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super('Page not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "Dammit! Can't find the page you're looking for.",
      },
    ];
  }
}
