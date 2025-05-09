import React, { useState } from 'react';
import '../styles/MusicGenerator.css';

const MusicGenerator = ({ onGenerationStart, onMusicGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const examplePrompts = [
    "Create a Jacko-style pop dance track with Billie Jean vibes",
    "Generate an upbeat song with Thriller-inspired elements",
    "Make a smooth R&B track with Jacko's vocal style",
    "Produce a 120 BPM dance track with Beat It guitar riffs"
  ];

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setError('');
  };

  const handleExampleClick = (example) => {
    setPrompt(example);
    setError('');
  };

  const generateMusic = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your music');
      return;
    }

    try {
      setIsGenerating(true);
      setError('');
      onGenerationStart();

      // Call to backend API
      const response = await fetch('http://localhost:5000/api/music/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate music');
      }

      const data = await response.json();
      onMusicGenerated(data);
    } catch (err) {
      setError(err.message || 'An error occurred while generating music');
      console.error('Music generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="music-generator">
      <div className="prompt-input-container">
        <textarea
          className="prompt-input"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Describe the Jacko-style music you want to create..."
          disabled={isGenerating}
        />
        
        <button 
          className="generate-button" 
          onClick={generateMusic}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Create Music'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="example-prompts">
        <h3>Try these examples:</h3>
        <div className="examples-list">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              className="example-button"
              onClick={() => handleExampleClick(example)}
              disabled={isGenerating}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {isGenerating && (
        <div className="generation-status">
          <div className="loader"></div>
          <p>Creating your Jacko-style masterpiece...</p>
        </div>
      )}
    </div>
  );
};

export default MusicGenerator;