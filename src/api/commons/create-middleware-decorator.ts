import {Handler} from 'express';

type HandlerFactory = (...args: unknown[]) => Handler;

export function createMiddlewareMethodDecorator(middleware: Handler) {
    return function () {
        return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
            const originalHandler = descriptor.value! as Handler;
            const newHandler: Handler = async function (req, res, next) {
                // this is stupid, and needed since the route decorator always expect promise handler
                await middleware(req, res, async err => {
                    // and i still don't understand why this works
                    if (err) {
                        return next(err);
                    }
                    await originalHandler(req, res, next);
                });
            };
            descriptor.value = newHandler;
        };
    };
}

export function createMiddlewareFactoryMethodDecorator(mf: HandlerFactory) {
    return function (...args: unknown[]) {
        const middleware = mf(args);
        return createMiddlewareMethodDecorator(middleware);
    };
}
