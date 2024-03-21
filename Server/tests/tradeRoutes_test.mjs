

import { app, request, mockTradeData } from './test.js'; // Importing Express app, supertest request, and mock data
import { expect } from 'chai'; // Importing Chai for assertions

describe('POST /api/trade/buy', () => {
  it('should buy stocks for the player', async () => {
    const res = await request(app)
      .post('/api/trade/buy')
      .send(mockTradeData);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'Stock bought successfully');
    expect(res.body.player).to.be.an('object');
   
  });


});

describe('POST /api/trade/sell', () => {
  it('should sell stocks for the player', async () => {
    const res = await request(app)
      .post('/api/trade/sell')
      .send(mockTradeData);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'Stock sold successfully');
    expect(res.body.player).to.be.an('object');
    
  });

 
});
