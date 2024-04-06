// test/login.test.js

const { expect } = require('chai');
const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('POST /api/auth/login', () => {
    it('should log in the user and return a token', async () => {
        const username = 'testuser';
        const password = 'testpassword';

        const response = await request(app)
            .post('/api/auth/login')
            .send({ username, password })
            .set('Accept', 'application/json');

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token').that.is.a('string');
    });

    it('should return an error message if login credentials are incorrect', async () => {
        const username = 'invaliduser';
        const password = 'invalidpassword';

        const response = await request(app)
            .post('/api/auth/login')
            .send({ username, password })
            .set('Accept', 'application/json');

        expect(response.status).to.equal(401);
        expect(response.body).to.have.property('error').that.includes('Invalid username or password');
    });
});
