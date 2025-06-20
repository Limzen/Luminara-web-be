const express = require('express');
const router = express.Router();

// Import route modules
const directoryRoutes = require('./directory.routes');

// Use route modules
router.use('/directories', directoryRoutes);

module.exports = router; 