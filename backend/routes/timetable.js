import express from 'express';
import { getTimetable, createTimetableEntry, updateTimetableEntry, deleteTimetableEntry } from '../controllers/timetableController.js';

const router = express.Router();

router.get('/', getTimetable);
router.post('/', createTimetableEntry);
router.put('/:id', updateTimetableEntry);
router.delete('/:id', deleteTimetableEntry);

export default router;
