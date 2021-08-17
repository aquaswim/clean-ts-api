import * as e from 'express';
import ResponseFormat from '../commons/response-format';
import {route} from '../commons/api-router';
import {omit} from 'lodash';
import {container} from 'tsyringe';
import {IRegisterContract} from '../../app/Auth/Contracts/register.contract';
import {ILoginContract} from '../../app/Auth/Contracts/login.contract';
import loginValidation from '../validations/auth.login.validation';
import registerValidation from '../validations/auth.register.validation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AuthController {
    @route('post', '/auth/register')
    @registerValidation()
    async register(req: e.Request, res: e.Response) {
        const registerUsecase = container.resolve<IRegisterContract>('RegisterUsecase');
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
    }

    @route('post', '/auth/login')
    @loginValidation()
    async login(req: e.Request, res: e.Response) {
        const loginUsecase = container.resolve<ILoginContract>('LoginUsecase');
        const session = await loginUsecase.loginWithUsernameAndPassword(req.body.username, req.body.password);
        return res.json(
            ResponseFormat.createResponse({
                data: {
                    sessionToken: session.sessionToken,
                    expiredAt: session.expiredAt,
                    refreshToken: session.refreshToken,
                },
            })
        );
    }
}
