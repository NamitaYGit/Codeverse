
import express from 'express';
import { register, login, googleLogin, githubLogin, githubCallback } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.post('/github-login', githubLogin);
router.get('/github-callback', githubCallback);

export default router;