// models/Note.js

// Note for myself: Mongoose is an Object Data Modeling (ODM) library that provides a structured way to define schemas
import {Schema, model} from 'mongoose';

const noteSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a text index on title and content for search feature
noteSchema.index({ title: 'text', content: 'text' });

export default model('Note', noteSchema);