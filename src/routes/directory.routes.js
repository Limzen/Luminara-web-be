const express = require('express');
const router = express.Router();
const directoryController = require('../controllers/directoryController');

router.get('/search', directoryController.searchDirectories);

// Get all directories
router.get('/', directoryController.getAllDirectories);

// Get directory by ID
router.get('/:id', directoryController.getDirectoryById);

// Create a new directory
router.post('/', directoryController.createDirectory);

// Update a directory
router.put('/:id', directoryController.updateDirectory);

// Delete a directory
router.delete('/:id', directoryController.deleteDirectory);

module.exports = router; 