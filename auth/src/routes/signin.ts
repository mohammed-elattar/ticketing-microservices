import express, { Request, Response } from 'express';
import { body, validationResult } from "express-validator";
import { BadRequestError } from '../errors/bad-request-error';
import { RequestValidationError } from '../errors/request-validation-error';
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
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
         throw new RequestValidationError(errors.array());
        }
        
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
        res.status(201).send(existingUser);
    }
  );

export { router as signinRouter };
