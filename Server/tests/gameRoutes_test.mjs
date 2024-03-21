// gameRoutes.test.js

import { app, request, mockGameData } from './test.js'; // Importing Express app, supertest request, and mock data
import { expect } from 'chai'; // Importing Chai for assertions

describe('POST /api/game/create', () => {
  it('should create a new game', async () => {
    const res = await request(app)
      .post('/api/game/create')
      .send(mockGameData);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('name', mockGameData.name);
    expect(res.body).to.have.property('startingAmount', mockGameData.startingAmount);
   
  });

});

describe('POST /api/game/join', () => {
  it('should join an existing game', async () => {
    // Create a new game to join
    const createGameRes = await request(app)
      .post('/api/game/create')
      .send(mockGameData);

    const gameId = createGameRes.body._id; // Extract the ID of the created game

    // Join the game
    const joinGameRes = await request(app)
      .post('/api/game/join')
      .send({ gameId, playerId: 'mockPlayerId' }); // Assuming playerId is provided

    expect(joinGameRes.status).to.equal(200);
    expect(joinGameRes.body).to.have.property('name', mockGameData.name);
    
  });


});

describe('POST /api/game/leave', () => {
  it('should leave a game', async () => {
    // Create a new game
    const createGameRes = await request(app)
      .post('/api/game/create')
      .send(mockGameData);

    const gameId = createGameRes.body._id; // Extract the ID of the created game

    // Join the game
    const joinGameRes = await request(app)
      .post('/api/game/join')
      .send({ gameId, playerId: 'mockPlayerId' }); // Assuming playerId is provided

    // Leave the game
    const leaveGameRes = await request(app)
      .post('/api/game/leave')
      .send({ gameId, playerId: 'mockPlayerId' }); // Assuming playerId is provided

    expect(leaveGameRes.status).to.equal(200);
    expect(leaveGameRes.body).to.have.property('message', 'Player left the game');
    
  });


});
