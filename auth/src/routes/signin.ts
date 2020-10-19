import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import validateRequest from '../middlewares/validate-request';
import BadRequestError from '../errors/bad-request-error';
import NotAuthorizedError from '../errors/not-authorized-error';
import User from '../models/user';
import Password from '../utils/password';
import logMsg from '../utils/logMsg';

const router = express.Router();

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Dammit! Email must be provided'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Dammit! Password must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError('Dammit! Those credentials are wrong...');
    }

    const passwordsMatch = await Password.compare(password, user.password);

    if (!passwordsMatch) {
      throw new BadRequestError('Dammit! Those credentials are wrong...');
    }

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

    res.status(200).send(user);
  }
);

export default router;
