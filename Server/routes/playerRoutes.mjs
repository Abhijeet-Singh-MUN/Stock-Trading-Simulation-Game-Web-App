import express from 'express';
import { getRecentGames, getGameDetails, getPlayerCompetitorPortfolio } from '../controllers/playerController.mjs';

const router = express.Router();

// Route for getting recent games
router.get('/recent-games', getRecentGames);

// Route for getting game details by gameId
router.get('/game-details/:gameId', getGameDetails);

// Route for getting competitor portfolio details by playerId
router.get('/competitor-portfolio/:playerId', getPlayerCompetitorPortfolio);

export default router;
