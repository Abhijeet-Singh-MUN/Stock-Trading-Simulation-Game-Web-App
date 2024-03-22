
import { app, request } from './test.js'; // Import Express app and supertest request
import { expect } from 'chai'; // Import Chai for assertions
import Player from '../models/Player.mjs'; // Import Player model
import sinon from 'sinon';
import { scheduleDeclareWinner } from '../controllers/gameController';

describe('Game Controller', () => {
  it('should schedule declare winner after 48 hours', async () => {
    const declareWinnerStub = sinon.stub();
    const clock = sinon.useFakeTimers();

    await scheduleDeclareWinner('gameId123'); // Replace 'gameId123' with an actual game ID

    // Fast-forward time by 48 hours
    clock.tick(48 * 60 * 60 * 1000);

    // Check if declareWinnerStub was called after 48 hours
    expect(declareWinnerStub.calledOnce).to.be.true;

    // Restore the original timers
    clock.restore();
  });
});


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
    

    // Clean up: Delete the created player from the database after testing
    await Player.deleteOne({ username: 'testuser' });
  });

  
});
