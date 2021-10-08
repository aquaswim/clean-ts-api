import CreateHandler from '../../commons/create.handler';
import bodyValidation from '../../middlewares/body-validation';
import Joi from 'joi';
import {Handler} from 'express';
import {container} from 'tsyringe';
import {IRegisterContract} from '../../../app/Auth/Contracts/register.contract';
import {omit} from 'lodash';
import ResponseFormat from '../../commons/response-format';

const handler: Handler = async (req, res) => {
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
};

const validation = bodyValidation(
    Joi.object({
        username: Joi.string(),
        password: Joi.string(),
        name: Joi.string().optional().default(''),
    })
);

export default CreateHandler(validation, handler);
