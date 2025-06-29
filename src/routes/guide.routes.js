const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');

// Search guides
router.get('/search', guideController.searchGuides);
// Get all guides
router.get('/', guideController.getAllGuides);
// Get guide by ID
router.get('/:id', guideController.getGuideById);
// Create a new guide
router.post('/', guideController.createGuide);
// Update a guide
router.put('/:id', guideController.updateGuide);
// Delete a guide
router.delete('/:id', guideController.deleteGuide);

module.exports = router; 