import express from 'express';
import { getSchoolInfo, updateSchoolInfo } from '../controllers/schoolInfoController.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.get('/', getSchoolInfo);
router.put('/', requireAuth, updateSchoolInfo);

export default router;
