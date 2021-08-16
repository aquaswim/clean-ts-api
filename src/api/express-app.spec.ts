import request from 'supertest';
import {ExpressApp} from './express-app';

describe('Test Express APP', () => {
    let app: ExpressApp;
    beforeAll(async () => {
        app = new ExpressApp();
    });
    it('should response with json info if request home', () => {
        return request(app.app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toHaveProperty('success');
                expect(response.body).toHaveProperty(['data', 'name']);
                expect(response.body).toHaveProperty(['data', 'version']);
            });
    });
    it('should response with proper 404 if path is not exists', () => {
        return request(app.app)
            .get('/random-url')
            .expect(404)
            .expect('Content-Type', /json/)
            .expect(response => {
                expect(response.body).toHaveProperty('success');
                expect(response.body).toHaveProperty(['error', 'message']);
                expect(response.body).toHaveProperty(['error', 'errorType']);
            });
    });
});
