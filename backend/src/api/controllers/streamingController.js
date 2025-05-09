/**
 * Controller for handling cross-platform streaming functionality
 */

const streamingService = require('../../services/streamingService');

// Mock data for available streaming platforms
const platforms = [
  { id: 'spotify', name: 'Spotify', icon: 'spotify-icon.png' },
  { id: 'apple', name: 'Apple Music', icon: 'apple-music-icon.png' },
  { id: 'audius', name: 'Audius', icon: 'audius-icon.png' },
  { id: 'soundxyz', name: 'Sound.xyz', icon: 'soundxyz-icon.png' }
];

// Mock data for tracks from different platforms
const mockTracks = {
  spotify: [
    { id: 'sp1', title: 'Billie Jean', artist: 'Michael Jackson', platform: 'spotify', coverUrl: 'billie-jean.jpg' },
    { id: 'sp2', title: 'Thriller', artist: 'Michael Jackson', platform: 'spotify', coverUrl: 'thriller.jpg' }
  ],
  apple: [
    { id: 'am1', title: 'Beat It', artist: 'Michael Jackson', platform: 'apple', coverUrl: 'beat-it.jpg' },
    { id: 'am2', title: 'Smooth Criminal', artist: 'Michael Jackson', platform: 'apple', coverUrl: 'smooth-criminal.jpg' }
  ],
  audius: [
    { id: 'au1', title: 'Web3 Remix of Dangerous', artist: 'CryptoProducer', platform: 'audius', coverUrl: 'dangerous-remix.jpg' },
    { id: 'au2', title: 'Decentralized Jam', artist: 'BlockchainBeats', platform: 'audius', coverUrl: 'decentralized-jam.jpg' }
  ],
  soundxyz: [
    { id: 'sx1', title: 'NFT Moonwalk', artist: 'TokenArtist', platform: 'soundxyz', coverUrl: 'nft-moonwalk.jpg' },
    { id: 'sx2', title: 'Metaverse Pop', artist: 'VirtualProducer', platform: 'soundxyz', coverUrl: 'metaverse-pop.jpg' }
  ]
};

/**
 * Get list of available streaming platforms
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getPlatforms = (req, res) => {
  res.json({ platforms });
};

/**
 * Get tracks from a specific platform
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getTracks = (req, res) => {
  const { platform } = req.query;
  
  if (!platform) {
    return res.status(400).json({ message: 'Platform parameter is required' });
  }
  
  // For demo purposes, return mock data
  if (platform === 'jacko') {
    // Return generated tracks from the mock database
    return res.json({ tracks: [] }); // In a real app, this would return actual generated tracks
  }
  
  const platformTracks = mockTracks[platform] || [];
  res.json({ tracks: platformTracks });
};

/**
 * Search for tracks across all platforms
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.searchTracks = (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }
  
  // Search across all platforms (mock implementation)
  const results = [];
  
  Object.values(mockTracks).forEach(platformTracks => {
    const matches = platformTracks.filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) || 
      track.artist.toLowerCase().includes(query.toLowerCase())
    );
    results.push(...matches);
  });
  
  res.json({ results });
};

/**
 * Get streaming URL for a specific track
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getStreamUrl = async (req, res, next) => {
  try {
    const { platform, trackId } = req.params;
    
    if (!platform || !trackId) {
      return res.status(400).json({ message: 'Platform and trackId are required' });
    }
    
    // In a real implementation, this would call the streaming service to get the actual URL
    const streamUrl = await streamingService.getStreamUrl(platform, trackId);
    
    res.json({ streamUrl });
  } catch (error) {
    console.error('Error getting stream URL:', error);
    next(error);
  }
};