import Joi from 'joi';
import bodyValidation from '../middlewares/body-validation';

export default function () {
    return bodyValidation(
        Joi.object({
            username: Joi.string(),
            password: Joi.string(),
            name: Joi.string().optional().default(''),
        })
    );
}
