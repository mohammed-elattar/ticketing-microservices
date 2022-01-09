import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { requestValidate } from "../middlewares/request-validate";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  requestValidate,
  async (req: Request, res: Response) => {
      const {email, password: userPassword} = req.body;

      const existingUser = await User.findOne({email});
        if(existingUser) {
            throw new BadRequestError('user already exist');
        }
        const user = User.build({email, password: userPassword});
        await user.save();

        const userJwt = jwt.sign({id: user.id, email: user.email}, process.env.JWT_KEY!);

        req.session = {jwt: userJwt};

        console.log(process.env.NODE_ENV);
      res.status(201).send(user);
  }
);

export { router as signupRouter };
