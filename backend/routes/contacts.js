import express from 'express';
import { getContacts, updateContacts } from '../controllers/contactsController.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.get('/', getContacts);
router.put('/', requireAuth, updateContacts);

export default router;
