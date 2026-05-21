import express from 'express';
import { getGallery, createGalleryItem, deleteGalleryItem } from '../controllers/galleryController.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.get('/', getGallery);
router.post('/', requireAuth, createGalleryItem);
router.delete('/:id', requireAuth, deleteGalleryItem);

export default router;
