// app.mjs

import express from 'express';
import path from 'path'; // Import the path module to work with file paths
import mongoose from 'mongoose';
import config from './config.mjs';
import { register, login } from './routes/authRoutes.mjs';
import gameRoutes from './routes/gameRoutes.mjs';
import playerRoutes from './routes/playerRoutes.mjs';
import tradeRoutes from './routes/tradeRoutes.mjs';
import WebSocket from 'ws'; // Import the WebSocket module

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON request bodies
app.use(express.json());

// API routes
app.use('/api/auth', register, login);
app.use('/api/game', gameRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/trade', tradeRoutes);

// Set up WebSocket server
const wss = new WebSocket.Server({ noServer: true }); // WebSocket server

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);
    // Handle incoming messages
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

// HTTP server
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Upgrade HTTP server to WebSocket server
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

export default app;
