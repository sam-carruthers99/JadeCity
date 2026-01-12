require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://jadecityrecords.com',
    'https://www.jadecityrecords.com',
    'https://web-production-7e393.up.railway.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check (important)
app.get('/', (req, res) => {
  res.send('Jade City Records API running');
});

// API routes
app.use('/api/email', require('./routes/email'));
app.use('/api/artists', require('./routes/artists'));
app.use('/api/news', require('./routes/news'));
app.use('/api/shop', require('./routes/shop'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
