import { requestValidate, requireAuth } from '@mseel3ttar/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';

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
        const {title, price} = req.body;
        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser!.id
        })

        await ticket.save();

        res.status(201).send(ticket);
    });

export default createTicketRouter;
