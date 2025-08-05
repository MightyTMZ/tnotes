const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('TNotes API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('🟢 Connected to MongoDB'))
.catch(err => console.error('🔴 MongoDB connection error:', err));

const noteRoutes = require('./routes/notes');
app.use('/api/notes', noteRoutes);

// use MongoDB Compass (connected added)