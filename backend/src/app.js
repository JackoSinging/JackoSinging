const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const musicRoutes = require('./api/routes/music');
const streamingRoutes = require('./api/routes/streaming');

// Import middleware
const errorHandler = require('./api/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (for production)
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// API Routes
app.use('/api/music', musicRoutes);
app.use('/api/streaming', streamingRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'JackoSinging API is running' });
});

// Error handling middleware
app.use(errorHandler);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`JackoSinging server running on port ${PORT}`);
});

module.exports = app;