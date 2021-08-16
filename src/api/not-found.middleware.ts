import {NotFoundError} from '../commons/Errors';
import e from 'express';

/**
 * Not found middleware, just pass Errors.NotFoundError to next
 * @param req
 * @param res
 * @param next
 */
export default (req: e.Request, res: e.Response, next: e.NextFunction) => {
    return next(new NotFoundError('Not Found'));
};
