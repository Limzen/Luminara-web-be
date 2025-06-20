const express = require('express');
const router = express.Router();

// Import route modules
const directoryRoutes = require('./directory.routes');
const guideRoutes = require('./guide.routes');
const articleRoutes = require('./article.routes');

// Use route modules
router.use('/directories', directoryRoutes);
router.use('/guides', guideRoutes);
router.use('/articles', articleRoutes);

module.exports = router; 