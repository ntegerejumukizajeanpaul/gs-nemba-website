import express from 'express';
import { createMessage, getMessages } from '../controllers/messagesController.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/', createMessage);
router.get('/', requireAuth, getMessages);

export default router;
