import React, { useState } from 'react';
import './App.css';
import MusicGenerator from './components/MusicGenerator';
import MusicPlayer from './components/MusicPlayer';
import Header from './components/Header';

function App() {
  const [generatedTrack, setGeneratedTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleMusicGenerated = (track) => {
    setGeneratedTrack(track);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <Header />
      <main className="app-content">
        <section className="generator-section">
          <h2>Create with Jacko</h2>
          <MusicGenerator 
            onGenerationStart={() => setIsLoading(true)}
            onMusicGenerated={handleMusicGenerated} 
          />
        </section>
        
        <section className="player-section">
          <h2>Stream the World</h2>
          <MusicPlayer 
            track={generatedTrack} 
            isLoading={isLoading} 
          />
        </section>
      </main>
      <footer className="app-footer">
        <p>JackoSinging - Powered by Solana</p>
      </footer>
    </div>
  );
}

export default App;