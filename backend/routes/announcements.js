import express from 'express';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/announcementsController.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.get('/', getAnnouncements);
router.post('/', requireAuth, createAnnouncement);
router.put('/:id', requireAuth, updateAnnouncement);
router.delete('/:id', requireAuth, deleteAnnouncement);

export default router;
