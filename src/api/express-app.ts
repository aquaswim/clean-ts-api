import e from 'express';
import helmet from 'helmet';
import cors from 'cors';
import NotfoundMiddleware from './not-found.middleware';
import ErrorMiddleware from './middlewares/error-translator.middleware';
import routes from './routes';

const PORT = process.env.PORT || '3000';

export class ExpressApp {
    get app(): e.Application {
        return this._app;
    }
    private readonly _app: e.Application;
    constructor(registerRoutes = true) {
        this._app = e();
        if (registerRoutes) {
            this.registerRoute(routes);
        }
    }

    public listen(): Promise<string> {
        return new Promise<string>(resolve => {
            this._app.listen(PORT, () => {
                resolve(String(PORT));
            });
        });
    }

    private globalMiddleware() {
        this.app.use(helmet({}));
        this.app.use(cors());
        this.app.use(e.json());
    }

    private terminalMiddleware() {
        // not found
        this.app.use(NotfoundMiddleware);
        // error handler
        this.app.use(ErrorMiddleware);
    }

    private registerRoute(routes: e.Router) {
        // init global middleware
        this.globalMiddleware();
        // routes
        this.app.use(routes);
        // init terminal middleware
        this.terminalMiddleware();
    }
}
