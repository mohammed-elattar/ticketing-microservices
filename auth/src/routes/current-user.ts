import express, { Request, Response } from 'express';
import jwt from "jsonwebtoken";

const router = express.Router();

router.get('/api/users/currentuser', (req: Request, res: Response) => {
  if(!req.session?.jwt) {
      return res.send({currentUSer: null});
  }

  try {
    const payload = jwt.verify((req.session.jwt) as string, process.env.JWT_KEY!);
    return res.send({currentUser: payload })      
  } catch (error) {
    return res.send({currentUSer: null});
  }
});

export { router as currentUserRouter };
