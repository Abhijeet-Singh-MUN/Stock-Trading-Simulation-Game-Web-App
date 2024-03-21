// tradeRoutes.mjs
import express from 'express';
import { buyStock, sellStock } from '../controllers/tradeController.mjs';

const router = express.Router();

// Route for buying stocks
router.post('/buy', buyStock);

// Route for selling stocks
router.post('/sell', sellStock);

export default router;
