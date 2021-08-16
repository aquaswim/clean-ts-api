import {ExpressApp} from './api/express-app';

async function main() {
    const expressApp = new ExpressApp();
    const listenInfo = await expressApp.listen();
    console.log('App listen in:', listenInfo);
}

main().catch(err => console.error('FATAL_ERR::', err));
