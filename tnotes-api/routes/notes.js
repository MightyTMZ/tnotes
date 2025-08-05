const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// CREATE
router.post('/', async (req, res) => {
  const note = new Note(req.body);
  try {
    const saved = await note.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// READ ONE
// e.g. /api/notes/68916c15f3a6d16ad4a683e1
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;


// {
//     "_id": "68916c15f3a6d16ad4a683e1",
//     "title": "Example Note",
//     "body": "Example note's body",
//     "createdAt": "2025-08-05T02:27:33.501Z",
//     "updatedAt": "2025-08-05T02:27:33.501Z",
//     "__v": 0
// }