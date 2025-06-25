const express = require('express');
const router = express.Router();

// Import route modules
const directoryRoutes = require('./directory.routes');
const itineraryRoutes = require('./itinerary.routes'); 

// Use route modules
router.use('/directories', directoryRoutes);
router.use('/itineraries', itineraryRoutes); 

module.exports = router;