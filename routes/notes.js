// routes/notes.js
import express from 'express';
import {getAllNotes, createNote, updateNote, deleteNote, searchNotes} from '../controllers/noteController.js';

const router = express.Router();

router.get('/', getAllNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/search', searchNotes);

export default router;