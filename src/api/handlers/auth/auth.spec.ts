import {ExpressApp} from '../../express-app';
import request from 'supertest';
import {container} from 'tsyringe';
import {IRegisterContract} from '../../../app/Auth/Contracts/register.contract';
import {RegisterResult} from '../../../app/Auth/Entity/RegisterData.entity';
import {CredentialError, ErrorType, NotFoundError} from '../../../commons/Errors';
import {ILoginContract} from '../../../app/Auth/Contracts/login.contract';
import {AuthSessionEntitiy} from '../../../app/Auth/Entity/AuthSession.entitiy';

class DummyRegisterUsecase implements IRegisterContract {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    registerUser(username: string, password: string, extraData: unknown): Promise<RegisterResult> {
        return Promise.resolve(
            new RegisterResult({
                uid: 'test',
                username: 'test',
                extraData: {test: true},
            })
        );
    }
}

class DummyLoginUsecase implements ILoginContract {
    async loginWithUsernameAndPassword(username: string, password: string): Promise<AuthSessionEntitiy> {
        if (username !== 'rei.ayanami@nerv.jp') {
            throw new NotFoundError('User not found');
        }
        if (password !== '3rdimpact') {
            throw new CredentialError('Password not match');
        }
        return new AuthSessionEntitiy({
            sessionToken: 'test',
            refreshToken: 'test',
            expiredAt: 0,
        });
    }
}

describe('Test the /auth routes', () => {
    let app: ExpressApp;
    beforeAll(async () => {
        app = new ExpressApp();
        // change use case with dummy
        container.clearInstances();
        container.register('RegisterUsecase', {
            useClass: DummyRegisterUsecase,
        });

        container.register('LoginUsecase', {
            useClass: DummyLoginUsecase,
        });
    });

    describe('auth/register route', () => {
        it('should response register success if using proper data ', () => {
            return request(app.app)
                .post('/auth/register')
                .send({
                    username: 're.ayanami@nerv.jp',
                    password: '3rdimpact',
                    name: 'Rei Ayanami',
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({
                    success: true,
                    data: {
                        uid: 'test',
                        username: 'test',
                        test: true,
                    },
                })
                .expect(res => {
                    expect(res.body).not.toHaveProperty(['data', 'password']);
                });
        });
        it('should response register success if using proper data without extra data ', () => {
            return request(app.app)
                .post('/auth/register')
                .send({
                    username: 're.ayanami@nerv.jp',
                    password: '3rdimpact',
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({
                    success: true,
                    data: {
                        uid: 'test',
                        username: 'test',
                        test: true,
                    },
                })
                .expect(res => {
                    expect(res.body).not.toHaveProperty(['data', 'password']);
                });
        });
        describe('validation testing', () => {
            it('should response validation error when username is empty string', () => {
                return request(app.app)
                    .post('/auth/register')
                    .send({
                        username: '',
                        password: '3rdimpact',
                        name: 'Rei Ayanami',
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.success).toStrictEqual(false);
                        expect(res.body).toHaveProperty('error');
                        expect(res.body.error.errorType).toStrictEqual(ErrorType.VALIDATION_ERROR);
                    });
            });
            it('should response validation error when password is falsey', () => {
                return request(app.app)
                    .post('/auth/register')
                    .send({
                        username: 're.ayanami@nerv.jp',
                        password: '',
                        name: 'Rei Ayanami',
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.success).toStrictEqual(false);
                        expect(res.body).toHaveProperty('error');
                        expect(res.body.error.errorType).toStrictEqual(ErrorType.VALIDATION_ERROR);
                    });
            });
        });
    });

    describe('auth/login route', () => {
        it('should response session token if using proper data', () => {
            return request(app.app)
                .post('/auth/login')
                .send({
                    username: 'rei.ayanami@nerv.jp',
                    password: '3rdimpact',
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .expect({
                    success: true,
                    data: {
                        sessionToken: 'test',
                        refreshToken: 'test',
                        expiredAt: 0,
                    },
                });
        });
        it('should response proper user not found', () => {
            return request(app.app)
                .post('/auth/login')
                .send({
                    username: 'not.rei.ayanami@nerv.jp',
                    password: '3rdimpact',
                })
                .expect('Content-Type', /json/)
                .expect(404)
                .expect(res => {
                    expect(res.body.success).toStrictEqual(false);
                    expect(res.body).toHaveProperty('error');
                    expect(res.body.error.errorType).toStrictEqual(ErrorType.NOTFOUND);
                });
        });
        it('should response proper wrong password', () => {
            return request(app.app)
                .post('/auth/login')
                .send({
                    username: 'rei.ayanami@nerv.jp',
                    password: 'wrong-password',
                })
                .expect('Content-Type', /json/)
                .expect(403)
                .expect(res => {
                    expect(res.body.success).toStrictEqual(false);
                    expect(res.body).toHaveProperty('error');
                    expect(res.body.error.errorType).toStrictEqual(ErrorType.INVALID_CREDENTIAL);
                });
        });
        describe('validation testing', () => {
            it('should response validation error if username is falsey', () => {
                return request(app.app)
                    .post('/auth/login')
                    .send({
                        username: '',
                        password: '3rdimpact',
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.success).toStrictEqual(false);
                        expect(res.body).toHaveProperty('error');
                        expect(res.body.error.errorType).toStrictEqual(ErrorType.VALIDATION_ERROR);
                    });
            });
            it('should response validation error if password is falsey', () => {
                return request(app.app)
                    .post('/auth/login')
                    .send({
                        username: 're.ayanami@nerv.jp',
                        password: '',
                    })
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.success).toStrictEqual(false);
                        expect(res.body).toHaveProperty('error');
                        expect(res.body.error.errorType).toStrictEqual(ErrorType.VALIDATION_ERROR);
                    });
            });
        });
    });
});
