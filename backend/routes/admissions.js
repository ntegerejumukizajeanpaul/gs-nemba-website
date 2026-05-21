import express from 'express';
import { getAdmissions, updateAdmissions } from '../controllers/admissionsController.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.get('/', getAdmissions);
router.put('/', requireAuth, updateAdmissions);

export default router;
