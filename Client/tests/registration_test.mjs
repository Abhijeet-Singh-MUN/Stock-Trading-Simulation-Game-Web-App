// test/registration.test.js

const { expect } = require('chai');
const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
        const username = 'newuser';
        const password = 'newpassword';

        const response = await request(app)
            .post('/api/auth/register')
            .send({ username, password })
            .set('Accept', 'application/json');

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message').that.equals('Registration successful!');
    });

    it('should return an error message if username is already taken', async () => {
        const username = 'existinguser';
        const password = 'password';

        const response = await request(app)
            .post('/api/auth/register')
            .send({ username, password })
            .set('Accept', 'application/json');

        expect(response.status).to.equal(409);
        expect(response.body).to.have.property('error').that.includes('Username already exists');
    });
});
