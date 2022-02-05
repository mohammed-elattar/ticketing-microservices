import { requestValidate, requireAuth } from '@mseel3ttar/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const createTicketRouter = express.Router();

createTicketRouter.post(
    '/api/tickets',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price').isFloat({ gt: 0}).withMessage('Title is required')
]
    ,
    requestValidate,
    async (req: Request, res: Response) => {
        res.sendStatus(200);
    });

export default createTicketRouter;
