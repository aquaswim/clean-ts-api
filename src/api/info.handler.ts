import e from 'express';
import ResponseFormat from './helper/response-format';

const infoHandler = (req: e.Request, res: e.Response) => {
    return res.json(
        ResponseFormat.createResponse({
            data: {
                name: process.env.npm_package_name,
                version: process.env.npm_package_version,
            },
        })
    );
};

export default infoHandler;
