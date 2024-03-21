

import { app, request, mockUserData } from './test.js'; // Importing Express app, supertest request, and mock data
import { expect } from 'chai'; // Importing Chai for assertions

describe('POST /api/auth/register', () => {
  it('should register a new player', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(mockUserData);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('should return error if username already exists', async () => {
    // Register a user with the same username
    const res = await request(app)
      .post('/api/auth/register')
      .send(mockUserData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'User already exists');
  });

});

describe('POST /api/auth/login', () => {
  it('should login an existing player with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(mockUserData);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('should return error if username or password is incorrect', async () => {
    const invalidUserData = {
      username: 'invalidusername',
      password: 'invalidpassword'
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(invalidUserData);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'Invalid credentials');
  });


});
