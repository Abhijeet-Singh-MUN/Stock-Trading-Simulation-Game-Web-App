import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import config from './config.mjs';
import { register, login } from '../Server/controllers/authController.mjs';
import gameRoutes from './routes/gameRoutes.mjs';
import playerRoutes from './routes/playerRoutes.mjs';
import tradeRoutes from './routes/tradeRoutes.mjs';
import http from 'http';
import {WebSocketServer} from 'ws';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down gracefully...');
  // Perform cleanup tasks here
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down gracefully...');
  // Perform cleanup tasks here
  process.exit(0);
});

const app = express();
const httpServer = http.createServer(app);

// Create WebSocket server
const webSocketServer = new WebSocketServer({ server: httpServer });

// WebSocket connection handling
webSocketServer.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);
    // Handle incoming messages
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3008;

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
webSocketServer.on('listening', () => console.log(`WebSocket Server running on port ${PORT}`));
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(express.static(path.join(__dirname, 'Client')));
app.use(express.json());

// Serve the index.html file when accessing '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..',  'Client', 'html', 'index.html'));
});

app.use('/api/auth', register, login);
app.use('/api/game', gameRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/trade', tradeRoutes);

export default app;
