import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now()
  },
  durationHours: {
    type: Number,
    required: true,
    default: 48 // 48 hours by default
  },
  startingAmount: {
    type: Number,
    required: true,
    default: 10000 // $10,000 by default
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }]
});

const Game = mongoose.model('Game', GameSchema);

export default Game;
