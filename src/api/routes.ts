import {Router} from 'express';
import homeHandler from './handlers/home';
import v1Routes from './handlers/v1';

const apiRouter = Router();

apiRouter.get('/', homeHandler);
apiRouter.use('/v1', v1Routes);

export default apiRouter;
