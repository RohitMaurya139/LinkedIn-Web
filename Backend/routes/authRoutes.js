import express from 'express';
import { signUp, login, logout } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.route('/signup').post(signUp);
authRouter.route('/login').post(login);
authRouter.route('/logout').post(logout);

export default authRouter;