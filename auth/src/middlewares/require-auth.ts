import { Request, Response, NextFunction } from 'express';
import NotAuthorizedError from '../errors/not-authorized-error';

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
