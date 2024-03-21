// test.js

import app from '../app.mjs';
import request from 'supertest';

// Mock data for testing
const mockUserData = {
  username: 'testuser',
  password: 'testpassword'
};

const mockGameData = {
  name: 'Test Game',
  startingAmount: 10000
};

export { app, request, mockUserData, mockGameData }; // Export app, supertest request, and mock data for use in tests
