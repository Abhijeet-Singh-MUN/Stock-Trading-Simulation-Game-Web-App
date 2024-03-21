import axios from 'axios';
import config from '../config.mjs';

const polygonService = {
  getCurrentPrice: async (symbol) => {
    try {
      const res = await axios.get(`https://api.polygon.io/v1/last/stocks/${symbol}`, {
        params: {
          apiKey: config.polygonApiKey
        }
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch current price');
    }
  }
};

export default polygonService;
