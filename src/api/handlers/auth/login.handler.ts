import CreateHandler from '../../commons/create.handler';
import bodyValidation from '../../middlewares/body-validation';
import Joi from 'joi';
import {Handler} from 'express';
import {container} from 'tsyringe';
import {ILoginContract} from '../../../app/Auth/Contracts/login.contract';
import ResponseFormat from '../../commons/response-format';

const handler: Handler = async (req, res) => {
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
};

const validation = bodyValidation(
    Joi.object({
        username: Joi.string(),
        password: Joi.string(),
    })
);

export default CreateHandler(validation, handler);
