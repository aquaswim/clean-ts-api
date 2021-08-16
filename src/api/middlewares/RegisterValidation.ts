import {Handler} from 'express';
import {createMiddlewareMethodDecorator} from '../commons/create-middleware-decorator';
import {get} from 'lodash';
import {ValidationError} from '../../commons/Errors';

const middleware: Handler = (req, res, next) => {
    if (typeof get(req.body, 'username') !== 'string' || !req.body.username) {
        throw new ValidationError('Username is required');
    }
    if (typeof get(req.body, 'password') !== 'string' || !req.body.password) {
        return next(new ValidationError('Password is required'));
    }
    next();
};

export default createMiddlewareMethodDecorator(middleware);
