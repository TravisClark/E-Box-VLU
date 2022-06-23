import express from 'express';
const router = express.Router();

import {home} from '../app/controllers/UserController.js';

router.get('/', (req, res) => {
    res.send('Welcome');
});

export default router;