const express = require('express');
const os = require('os');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint principal
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Otros endpoints
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'Hello from the API!' });
});

app.get('/info', (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: os.uptime(),
  });
});

// Escuchar en 0.0.0.0 (OBLIGATORIO PARA DOCKER)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🩺 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
