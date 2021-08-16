import * as e from 'express';
import ResponseFormat from '../commons/response-format';
import {route} from '../commons/api-router';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class EtcController {
    @route('get', '/')
    index(req: e.Request, res: e.Response, next: e.NextFunction) {
        return res.json(
            ResponseFormat.createResponse({
                data: {
                    name: process.env.npm_package_name,
                    version: process.env.npm_package_version,
                },
            })
        );
    }
}
