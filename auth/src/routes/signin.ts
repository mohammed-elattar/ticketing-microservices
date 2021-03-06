import express, { Request, Response } from 'express';
import { body } from "express-validator";
import { BadRequestError, requestValidate } from '@mseel3ttar/common';
import { User } from '../models/user';
import { password } from '../services/password';
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
    '/api/users/signin',
    [
      body("email").isEmail().withMessage("Email must be valid"),
      body("password")
        .trim()
        .notEmpty()
        .withMessage("Password must be between 4 and 20 characters"),
    ],
    requestValidate,
    async (req: Request, res: Response) => {
        const {email, password: userPassword} = req.body;
  
        const existingUser = await User.findOne({email});
        if(!existingUser) {
              throw new BadRequestError('Invalid Credentials');
        }

        const isAuthenticated = await password.compare(userPassword,existingUser.password);
          if(!isAuthenticated) {
            throw new BadRequestError('Invalid Credentials');
          }
  
          const userJwt = jwt.sign({id: existingUser.id, email: existingUser.email}, process.env.JWT_KEY!);
  
          req.session = {jwt: userJwt};
        res.status(200).send(existingUser);
    }
  );

export { router as signinRouter };
