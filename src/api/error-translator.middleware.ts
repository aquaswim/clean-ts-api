import {BaseError, ErrorType} from '../commons/Errors';
import e from 'express';

/**
 * Translate Errors.BaseError to proper error response with correct status code and message and another to 500
 * @param err
 * @param req
 * @param res
 * @param next
 */
const ErrorTranslatorMiddleware = (err: BaseError | Error, req: e.Request, res: e.Response, next: e.NextFunction) => {
    let code = 500;
    let errorType = null;
    const message = err.message || 'Unknown Error';
    if (err instanceof BaseError) {
        errorType = err.errorType;
        // translate to http code
        switch (err.errorType) {
            case ErrorType.GENERAL:
                break;
            case ErrorType.NOTFOUND:
                code = 404;
                break;
            case ErrorType.INVALID_CREDENTIAL:
                code = 403;
                break;
            case ErrorType.VALIDATION_ERROR:
                code = 400;
                break;
            case ErrorType.DB:
                break;
        }
    }
    res.status(code).json({
        success: false,
        error: {message, errorType},
    });
};

export default ErrorTranslatorMiddleware;
