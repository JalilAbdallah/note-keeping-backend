// controllers/noteController.js
import mongoose from 'mongoose';
import Note from '../models/Note.js';

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ message: 'Page and limit must be positive integers' });
    }

    const total = await Note.countDocuments();
    const notes = await Note.find().skip(skip).limit(limit).sort({ createdAt: -1 });

    res.status(200).json({
      notes,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalNotes: total
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Server error while fetching notes' });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const note = new Note({ title, content });
    await note.save();

    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(400).json({ message: error.message || 'Invalid note data' });
  }
};

// Update a note by ID
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid note ID' });
    }

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const note = await Note.findByIdAndUpdate(
      id,
      { title, content, createdAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(400).json({ message: error.message || 'Invalid update data' });
  }
};

// Delete a note by ID
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid note ID' });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Server error while deleting note' });
  }
};

// Search notes by title or content
export const searchNotes = async (req, res) => {
  try {
    const { query } = req.query;        
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return res.status(400).json({ message: 'Query parameter is required and must be a non-empty string' });
    }

    const notes = await Note.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });

    res.status(200).json(notes);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error while searching notes' });
  }
};