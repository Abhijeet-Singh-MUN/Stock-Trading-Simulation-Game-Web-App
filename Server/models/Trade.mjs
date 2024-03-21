// Trade.mjs
import mongoose from 'mongoose';

const TradeSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true
  },
  stockSymbol: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  pricePerShare: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['BUY', 'SELL'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Trade = mongoose.model('Trade', TradeSchema);

export default Trade;
