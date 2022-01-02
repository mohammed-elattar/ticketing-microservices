export class DatabaseConnectionError extends Error {
    reason = 'error connecting to database';
    constructor() {
        super();

        // because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }


}