import {AnySchema, ValidationError as JoiValidationError} from 'joi';
import {Handler} from 'express';
import {ValidationError} from '../../commons/Errors';

const validationMiddlewareFactory = (schema: AnySchema): Handler => {
    return (req, res, next) => {
        schema
            .validateAsync(req.body, {
                debug: process.env.ENV === 'dev',
            })
            .then(result => {
                req.body = result;
                next();
            })
            .catch((err: JoiValidationError) => {
                next(new ValidationError(err.message));
            });
    };
};

export default validationMiddlewareFactory;
