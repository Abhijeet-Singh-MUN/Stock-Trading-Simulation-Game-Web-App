// test/declareWinner.test.js

const { expect } = require('chai');
const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('POST /api/game/declareWinner', () => {
    it('should declare a winner for the specified game', async () => {
        const gameId = 'exampleGameId'; // Provide a valid game ID for testing

        const response = await request(app)
            .post('/api/game/declareWinner')
            .send({ gameId })
            .set('Accept', 'application/json');

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message').that.includes('Winner declared');
    });

    it('should return an error message if game ID is not provided', async () => {
        const response = await request(app)
            .post('/api/game/declareWinner')
            .set('Accept', 'application/json');

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error').that.includes('Game ID is required');
    });
});
