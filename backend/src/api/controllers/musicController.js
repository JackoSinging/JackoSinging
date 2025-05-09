const nlpService = require('../../services/nlpService');
const musicGenerationService = require('../../services/musicGenerationService');

// Mock database for storing generated tracks
let tracks = [];

/**
 * Generate music based on natural language prompt
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.generateMusic = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }
    
    // Process natural language prompt to extract musical attributes
    const attributes = await nlpService.processPrompt(prompt);
    
    // Generate music based on extracted attributes
    const generatedTrack = await musicGenerationService.generateTrack(attributes);
    
    // Add to mock database
    const trackId = Date.now().toString();
    const newTrack = {
      id: trackId,
      title: `Jacko ${attributes.genre} Track`,
      artist: 'JackoSinging AI',
      genre: attributes.genre,
      tempo: attributes.tempo,
      mood: attributes.mood,
      createdAt: new Date().toISOString(),
      prompt,
      audioUrl: generatedTrack.audioUrl,
      duration: generatedTrack.duration,
      waveform: generatedTrack.waveform
    };
    
    tracks.push(newTrack);
    
    res.status(201).json(newTrack);
  } catch (error) {
    console.error('Music generation error:', error);
    next(error);
  }
};

/**
 * Get list of generated tracks
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getTracks = (req, res) => {
  res.json({ tracks });
};

/**
 * Get a specific track by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getTrackById = (req, res) => {
  const { id } = req.params;
  const track = tracks.find(t => t.id === id);
  
  if (!track) {
    return res.status(404).json({ message: 'Track not found' });
  }
  
  res.json(track);
};