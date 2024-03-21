// authRoutes.mjs
import express from 'express';
import { register, login } from '../controllers/authController.mjs';

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

export default router;
