import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
    symbol: {
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
    }
    });

const GameReferenceSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  },
  joinDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  lastKnownState: {
    // Defining the structure of the last known state of the player in this game
    // This could include things like player's cash balance, stocks owned, etc.
    // For simplicity, i'll just include the cash balance for now
    type: Number,
    required: true,
    currentAmount : await Player.PlayerSchema.select('currentAmount').exec() // Fetch the currentAmount of the player
  }
});

const PlayerSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  startingAmount: {
    type: Number,
    required: true,
    default: 10000 // $10,000 by default
  },
  currentAmount: {
    type: Number,
    required: true
  },
  recentGames: [GameReferenceSchema], // Array of recent games played
  portfolio: [PortfolioSchema] // Array of portfolio items
});

const Player = mongoose.model('Player', PlayerSchema);

export default Player;
