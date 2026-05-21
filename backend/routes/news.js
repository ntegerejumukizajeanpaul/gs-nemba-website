import express from 'express';
import { getNews, createNews, updateNews, deleteNews } from '../controllers/newsController.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.get('/', getNews);
router.post('/', requireAuth, createNews);
router.put('/:id', requireAuth, updateNews);
router.delete('/:id', requireAuth, deleteNews);

export default router;
