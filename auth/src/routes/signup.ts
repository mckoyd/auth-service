import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import validateResult from '../middlewares/validate-request';
import User from '../models/user';
import RequestValidationError from '../errors/request-validation-error';
import DatabaseConnectionError from '../errors/database-connection-error';
import BadRequestError from '../errors/bad-request-error';
import logMsg from '../utils/logMsg';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Dammit! Email must be valid.'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Dammit! Password must be between 4 and 20 characters'),
  ],
  validateResult,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Dammit! That email is already taken...');
    }

    logMsg('cyan', 'create', 'Creating a new user...');
    try {
      const user = User.build({
        email,
        password,
      });
      await user.save();

      // generate jwt
      const userJWT = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );

      // store in cookie session
      req.session = {
        jwt: userJWT,
      };

      res.status(201).send(user);
    } catch (e) {
      throw new DatabaseConnectionError();
    }
  }
);

export default router;
