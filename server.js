const express = require('express');
const path = require('path');
const app = express();

const questionsData = require('./questions.js');

app.use(express.static(path.join(__dirname, 'public')));

// Get all questions
app.get('/api/questions', (req, res) => {
  res.json(questionsData);
});

// Get question by ID
app.get('/api/questions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const flat = questionsData.parts.flat();
  if (!isNaN(id) && id >= 0 && id < flat.length) {
    res.json(flat[id]);
  } else {
    res.status(404).json({ error: 'Invalid ID' });
  }
});

// Fallback route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use PORT provided by Render or fallback to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
