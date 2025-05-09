import React, { useState, useEffect, useRef } from 'react';
import '../styles/MusicPlayer.css';

const MusicPlayer = ({ track, isLoading }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('jacko');
  
  const audioRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    // Fetch available streaming platforms
    const fetchPlatforms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/streaming/platforms');
        if (response.ok) {
          const data = await response.json();
          setPlatforms(data.platforms);
        }
      } catch (error) {
        console.error('Error fetching platforms:', error);
      }
    };
    
    fetchPlatforms();
    
    // Cleanup animation frame on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    // Handle track changes
    if (track && audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.load();
      setDuration(0);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [track]);
  
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };
  
  const togglePlayPause = () => {
    if (!track) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(updateProgress);
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const updateProgress = () => {
    setCurrentTime(audioRef.current.currentTime);
    animationRef.current = requestAnimationFrame(updateProgress);
  };
  
  const handleTimeChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };
  
  const handlePlatformChange = async (platform) => {
    setSelectedPlatform(platform);
    
    // Fetch tracks from selected platform
    try {
      const response = await fetch(`http://localhost:5000/api/streaming/tracks?platform=${platform}`);
      if (response.ok) {
        // Handle platform change - in a real app, this would update available tracks
        console.log(`Switched to ${platform} platform`);
      }
    } catch (error) {
      console.error('Error changing platform:', error);
    }
  };
  
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="music-player">
      {isLoading ? (
        <div className="player-loading">
          <div className="loader"></div>
          <p>Preparing your music...</p>
        </div>
      ) : (
        <>
          <div className="player-info">
            <div className="track-info">
              <h3>{track ? track.title : 'No track selected'}</h3>
              <p>{track ? track.artist : 'Upload or generate a track'}</p>
            </div>
            
            <div className="audio-visualizer">
              {/* Simple visualizer placeholder */}
              <div className={`visualizer-bars ${isPlaying ? 'active' : ''}`}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="visualizer-bar" style={{
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.05}s`
                  }}></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="player-controls">
            <audio 
              ref={audioRef} 
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
            
            <button 
              className={`play-button ${isPlaying ? 'pause' : 'play'}`} 
              onClick={togglePlayPause}
              disabled={!track}
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>
            
            <div className="time-control">
              <span className="time">{formatTime(currentTime)}</span>
              <input
                type="range"
                className="progress-slider"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleTimeChange}
                disabled={!track}
              />
              <span className="time">{formatTime(duration)}</span>
            </div>
            
            <div className="volume-control">
              <span className="volume-icon">🔊</span>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
          
          <div className="platform-selector">
            <h4>Streaming Platforms</h4>
            <div className="platform-buttons">
              <button 
                className={`platform-button ${selectedPlatform === 'jacko' ? 'active' : ''}`}
                onClick={() => handlePlatformChange('jacko')}
              >
                JackoSinging
              </button>
              
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  className={`platform-button ${selectedPlatform === platform.id ? 'active' : ''}`}
                  onClick={() => handlePlatformChange(platform.id)}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MusicPlayer;