

import { expect } from 'chai';
import Player from '../models/Player.mjs';
import Game from '../models/Game.mjs';

describe('Player Model', () => {
  describe('Recent Games', () => {
    it('should save game state and add to recent games', async () => {
      // Create a mock game
      const game = new Game({
        name: 'Test Game',
        startingAmount: 10000
      });
      await game.save();

      // Create a mock player
      const player = new Player({
        playerId: 'testPlayer',
        username: 'testUsername',
        password: 'testPassword',
        startingAmount: 10000,
        currentAmount: 10000
      });
      await player.save();

      // Save the game state for the player
      player.recentGames.push({
        gameId: game._id,
        joinDate: new Date(),
        lastKnownState: {
          currentAmount: player.currentAmount
        }
      });
      await player.save();

      // Retrieve the player from the database
      const retrievedPlayer = await Player.findOne({ playerId: 'testPlayer' });

      // Asserting that the recent games array contains the game state by getting data internally from two places
      expect(retrievedPlayer.recentGames.length).to.equal(1);
      expect(retrievedPlayer.recentGames[0].gameId.toString()).to.equal(game._id.toString());

      // Clean up: Delete the player and game from the database after testing
      await Player.deleteOne({ playerId: 'testPlayer' });
      await Game.deleteOne({ _id: game._id });
    });

    it('should retrieve lastKnownState for a player', async () => {
        // Create a mock player
        const player = new Player({
          playerId: 'testPlayer',
          username: 'testUsername',
          password: 'testPassword',
          startingAmount: 10000,
          currentAmount: 5000 // Mocking a different current amount
        });
        await player.save();
  
        // Retrieve the player from the database
        const retrievedPlayer = await Player.findOne({ playerId: 'testPlayer' });
  
        // Assert that lastKnownState matches the player's current amount
        expect(retrievedPlayer.recentGames.length).to.equal(0); // Ensure no recent games for simplicity
        expect(retrievedPlayer.recentGames.lastKnownState.currentAmount).to.equal(5000);
  
        // Clean up: Delete the player from the database after testing
        await Player.deleteOne({ playerId: 'testPlayer' });
      });
  
      it('should return list of recent games for a player', async () => {
        // Create a mock game
        const game1 = new Game({
          name: 'Test Game 1',
          startingAmount: 10000
        });
        await game1.save();
  
        const game2 = new Game({
          name: 'Test Game 2',
          startingAmount: 10000
        });
        await game2.save();
  
        // Create a mock player
        const player = new Player({
          playerId: 'testPlayer',
          username: 'testUsername',
          password: 'testPassword',
          startingAmount: 10000,
          currentAmount: 10000
        });
        await player.save();
  
        // Associate both games with the player
        player.recentGames.push({
          gameId: game1._id,
          joinDate: new Date(),
          lastKnownState: {
            currentAmount: player.currentAmount
          }
        });
  
        player.recentGames.push({
          gameId: game2._id,
          joinDate: new Date(),
          lastKnownState: {
            currentAmount: player.currentAmount
          }
        });
        await player.save();
  
        // Retrieve the player from the database
        const retrievedPlayer = await Player.findOne({ playerId: 'testPlayer' });
  
        // Assert that the recent games array contains both games
        expect(retrievedPlayer.recentGames.length).to.equal(2);
        expect(retrievedPlayer.recentGames[0].gameId.toString()).to.equal(game1._id.toString());
        expect(retrievedPlayer.recentGames[1].gameId.toString()).to.equal(game2._id.toString());
  
        // Clean up: Delete the player and games from the database after testing
        await Player.deleteOne({ playerId: 'testPlayer' });
        await Game.deleteMany({ _id: { $in: [game1._id, game2._id] } });
      });
    });
  });