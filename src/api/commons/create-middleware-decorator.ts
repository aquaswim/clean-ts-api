import {Handler} from 'express';

type HandlerFactory = (...args: any[]) => Handler;

export function createMiddlewareMethodDecorator(middleware: Handler) {
    return function () {
        return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
            const originalHandler = descriptor.value! as Handler;
            const newHandler: Handler = async function (req, res, next) {
                // this is stupid, and i don;t know why
                await middleware(req, res, async err => {
                    if (err) {
                        return next(err);
                    }
                    // this is stupid, the original handler need to have it try catch block, since all throw in the
                    // original handler will result in unhandled promise error
                    try {
                        await originalHandler(req, res, next);
                    } catch (err) {
                        next(err);
                    }
                });
            };
            descriptor.value = newHandler;
        };
    };
}

export function createMiddlewareFactoryMethodDecorator(mf: HandlerFactory) {
    return function (...args: unknown[]) {
        const middleware = mf(args);
        return createMiddlewareMethodDecorator(middleware)();
    };
}
