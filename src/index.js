const express = require('express');
const os = require('os');
const app = express();

const PORT = 3000;

// Endpoints
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'Hello from the API!' });
});

app.get('/info', (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: os.uptime()
  });
});

// --------------------------------------------
// Only start server when NOT running Jest
// --------------------------------------------
if (process.env.NODE_ENV !== 'test') {
  console.log('🚀 Server running on port 3000');
  console.log('🩺 Health check: http://localhost:3000/health');
  app.listen(PORT);
}

module.exports = app;


