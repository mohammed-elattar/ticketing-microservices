import { requireAuth } from '@mseel3ttar/common';
import express, { Request, Response } from 'express';

const createTicketRouter = express.Router();

createTicketRouter.post(
    '/api/tickets',
    requireAuth
    ,
    async (req: Request, res: Response) => {
        res.sendStatus(200);
    });

export default createTicketRouter;
