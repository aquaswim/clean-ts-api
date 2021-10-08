import {Router} from 'express';
import homeHandler from './handlers/home';
import loginHandler from './handlers/auth/login.handler';
import registerHandler from './handlers/auth/register.handler';

const apiRouter = Router();

apiRouter.get('/', homeHandler);
apiRouter.post('/auth/login', loginHandler);
apiRouter.post('/auth/register', registerHandler);

export default apiRouter;
