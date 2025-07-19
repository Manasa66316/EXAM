const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const questionsData = require('./questions.js');

// serve frontend from public folder
app.use(express.static(path.join(__dirname, 'public')));

// get all questions
app.get('/api/questions', (req, res) => {
  res.json(questionsData);
});

// get a specific question by index
app.get('/api/questions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const flat = questionsData.parts.flat();
  if (!isNaN(id) && id >= 0 && id < flat.length) {
    res.json(flat[id]);
  } else {
    res.status(404).json({ error: 'Invalid ID' });
  }
});

// fallback for React/SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// port from .env or default
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
