# Note Keeping Backend

Backend for a note-keeping application built with Node.js, Express.js, and MongoDB.

## Features

- CRUD operations for notes (title, content, creation date)
- Search notes by title or content
- Organized with MVC pattern (Model, Controller, Routes)
- Error handling with appropriate status codes

## Setup

1. Clone the repository: `git clone https://github.com/YOUR_USERNAME/note-keeping-backend.git`
2. Install dependencies: `npm install`
3. Create a `.env` file with `MONGODB_URI` and `PORT`
4. Run the server: `npm start`

## Endpoints

- `GET /notes`: Retrieve all notes (supports pagination with `?page=1&limit=10`)
- `POST /notes`: Create a new note
- `PUT /notes/:id`: Update a note by ID
- `DELETE /notes/:id`: Delete a note by ID
- `GET /notes/search?query=YOUR_QUERY`: Search notes by title or content

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)