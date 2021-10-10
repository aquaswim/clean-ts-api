import {Router} from 'express';
import loginHandler from './auth/login.handler';
import registerHandler from './auth/register.handler';

const apiRouter = Router();

apiRouter.post('/auth/login', loginHandler);
apiRouter.post('/auth/register', registerHandler);

export default apiRouter;
