import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import noteRoutes from './routes/notes.js';

// To load .env file
dotenv.config();

const app = express();

// using CORS is very important in this kind of applications (frontend and backend are on separate servers)
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));