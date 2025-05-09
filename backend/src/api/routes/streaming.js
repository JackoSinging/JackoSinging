const express = require('express');
const router = express.Router();
const streamingController = require('../controllers/streamingController');

/**
 * @route GET /api/streaming/platforms
 * @desc Get list of available streaming platforms
 * @access Public
 */
router.get('/platforms', streamingController.getPlatforms);

/**
 * @route GET /api/streaming/tracks
 * @desc Get tracks from a specific platform
 * @access Public
 */
router.get('/tracks', streamingController.getTracks);

/**
 * @route GET /api/streaming/search
 * @desc Search for tracks across all platforms
 * @access Public
 */
router.get('/search', streamingController.searchTracks);

/**
 * @route GET /api/streaming/play/:platform/:trackId
 * @desc Get streaming URL for a specific track
 * @access Public
 */
router.get('/play/:platform/:trackId', streamingController.getStreamUrl);

module.exports = router;