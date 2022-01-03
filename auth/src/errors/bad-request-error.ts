import {ValidationError} from 'express-validator';
import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
    statusCode = 400;
    reason = 'error connecting to database';
    constructor(public message: string) {
        super(message);

        // because we are extending a built in class
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{message: this.message}]
    }
}