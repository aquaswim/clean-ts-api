import * as e from 'express';
import ResponseFormat from '../commons/response-format';
import {route} from '../commons/api-router';
import {omit} from 'lodash';
import {container} from 'tsyringe';
import {IRegisterContract} from '../../app/Auth/Contracts/register.contract';
import {ILoginContract} from '../../app/Auth/Contracts/login.contract';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AuthController {
    @route('post', '/auth/register')
    async register(req: e.Request, res: e.Response, next: e.NextFunction) {
        const registerUsecase = container.resolve<IRegisterContract>('RegisterUsecase');
        try {
            const response = await registerUsecase.registerUser(
                req.body.username,
                req.body.password,
                omit(req.body, 'username', 'password')
            );
            return res.json(
                ResponseFormat.createResponse({
                    data: {
                        uid: response.uid,
                        username: response.uid,
                        ...(response.extraData as object),
                    },
                })
            );
        } catch (e) {
            next(e);
        }
    }

    @route('post', '/auth/login')
    async login(req: e.Request, res: e.Response, next: e.NextFunction) {
        const loginUsecase = container.resolve<ILoginContract>('LoginUsecase');
        try {
            const session = await loginUsecase.loginWithUsernameAndPassword(req.body.username, req.body.password);
            return res.json(
                ResponseFormat.createResponse({
                    data: session,
                })
            );
        } catch (e) {
            next(e);
        }
    }
}
