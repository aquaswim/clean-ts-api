import e from 'express';
import CreateHandler from '../commons/create.handler';
import ResponseFormat from '../commons/response-format';

const handler: e.Handler = async (req, res) => {
    return res.json(
        ResponseFormat.createResponse({
            data: {
                name: process.env.npm_package_name || '',
                version: process.env.npm_package_version || '',
            },
        })
    );
};

export default CreateHandler(handler);
