import {ExpressApp} from '../express-app';
import request from 'supertest';

describe('Test the etc routes', () => {
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
});
