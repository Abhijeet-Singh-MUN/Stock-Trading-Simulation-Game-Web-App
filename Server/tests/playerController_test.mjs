

import { app, request } from './test.js'; // Import Express app and supertest request
import { expect } from 'chai'; // Import Chai for assertions
import Player from '../models/Player.mjs'; // Import Player model

describe('POST /api/auth/create', () => {
  it('should create a new player', async () => {
    // Mock request body
    const requestBody = {
      username: 'testuser',
      password: 'testpassword',
      startingAmount: 10000
    };

    const res = await request(app)
      .post('/api/auth/create')
      .send(requestBody);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('username', 'testuser');
    expect(res.body).to.have.property('startingAmount', 10000);
    // Add more assertions as needed

    // Clean up: Delete the created player from the database after testing
    await Player.deleteOne({ username: 'testuser' });
  });

  // Add more tests for edge cases, validation, etc.
});
