import express from 'express';
import mongoose from 'mongoose';
import config from './config.mjs';
import authRoutes from './routes/authRoutes.mjs';
import gameRoutes from './routes/gameRoutes.mjs';
import tradeRoutes from './routes/tradeRoutes.mjs';

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/trade', tradeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
