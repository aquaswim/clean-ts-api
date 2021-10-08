import e from 'express';

// credit: https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/#usinges7asyncawait
const asyncWrap =
    (handler: e.Handler): e.Handler =>
    async (req, res, next) => {
        try {
            return await handler(req, res, next);
        } catch (err) {
            return next(err);
        }
    };

const CreateHandler = (...handlers: e.Handler[]) => {
    return handlers.map(handlers => asyncWrap(handlers));
};

export default CreateHandler;
