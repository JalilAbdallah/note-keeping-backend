// routes/notes.js
import { Router } from 'express';
const router = Router();
import { getAllNotes, createNote, updateNote, deleteNote, searchNotes } from '../controllers/noteController';

// Define routes
router.get('/', getAllNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/search', searchNotes);

export default router;