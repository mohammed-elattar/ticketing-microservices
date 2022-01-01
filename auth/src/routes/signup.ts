import express, { Request, Response } from "express";

const router = express.Router();

router.post(
  "/api/users/signup",
  (req: Request, res: Response) => {
    console.log("Creating a user...");
  }
);

export { router as signupRouter };
