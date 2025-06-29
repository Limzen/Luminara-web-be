const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

// Routes untuk Itinerary
router.get('/', itineraryController.getAllItineraries);
router.post('/', itineraryController.createItinerary);
router.get('/:id', itineraryController.getItineraryById);
router.put('/:id', itineraryController.updateItinerary);
router.delete('/:id', itineraryController.deleteItinerary);

module.exports = router;