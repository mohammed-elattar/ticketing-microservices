import express, { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { currentUser, requireAuth } from '@mseel3ttar/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser,requireAuth,  (req: Request, res: Response) => {
    return res.send({currentUser: req.currentUser || null});
});

export { router as currentUserRouter };
