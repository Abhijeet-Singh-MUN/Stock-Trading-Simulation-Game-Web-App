// test/playerRoutes.test.js
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app'; 
import { expect } from 'chai';

chai.use(chaiHttp);

describe('Player Routes', () => {
  it('should return recent games for a player', (done) => {
    chai.request(app)
      .get('/api/player/recent-games')
      .send({ playerId: 'playerId123' }) // Replace 'playerId123' with an actual player ID from db
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
       
        done();
      });
  });

  it('should return game details by gameId', (done) => {
    chai.request(app)
      .get('/api/player/game-details/gameId123') // Replace 'gameId123' with an actual game ID from db
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        
        done();
      });
  });

  it('should return competitor portfolio by playerId', (done) => {
    chai.request(app)
      .get('/api/player/competitor-portfolio/playerId123') // Replace 'playerId123' with an actual player ID from db
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        
        done();
      });
  });
});
