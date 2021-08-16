import e from 'express';

class ApiRouterBuilder {
    private readonly r: e.Router;
    constructor() {
        this.r = e.Router();
    }
    get router(): e.Router {
        return this.r;
    }
}

const apiRoutebuilder = new ApiRouterBuilder();
export default apiRoutebuilder.router;

// http method supported by e.Router
type Method = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
type Handler = (req: e.Request, res: e.Response, next: e.NextFunction) => Promise<void>;

// controllers decoratos
export function route(method: Method, path: string): MethodDecorator {
    return function (target, propertyKey, descriptor) {
        const handler = descriptor.value as unknown as Handler;
        apiRoutebuilder.router[method](path, (req, res, next) => {
            handler(req, res, next).catch(err => next(err));
        });
    };
}
