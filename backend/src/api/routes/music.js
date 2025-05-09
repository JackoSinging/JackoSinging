const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');

/**
 * @route POST /api/music/generate
 * @desc Generate music based on natural language prompt
 * @access Public
 */
router.post('/generate', musicController.generateMusic);

/**
 * @route GET /api/music/tracks
 * @desc Get list of generated tracks
 * @access Public
 */
router.get('/tracks', musicController.getTracks);

/**
 * @route GET /api/music/track/:id
 * @desc Get a specific track by ID
 * @access Public
 */
router.get('/track/:id', musicController.getTrackById);

module.exports = router;