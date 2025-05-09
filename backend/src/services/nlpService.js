/**
 * Natural Language Processing Service
 * Processes natural language prompts to extract musical attributes
 */

// In a real implementation, this would use a transformer-based model like RoBERTa or T5
// For this demo, we'll use a simple rule-based approach

/**
 * Process a natural language prompt to extract musical attributes
 * @param {string} prompt - User's natural language description
 * @returns {Object} Extracted musical attributes
 */
exports.processPrompt = async (prompt) => {
  const promptLower = prompt.toLowerCase();
  
  // Extract genre
  let genre = 'pop'; // Default genre
  if (promptLower.includes('dance') || promptLower.includes('edm')) {
    genre = 'dance';
  } else if (promptLower.includes('r&b') || promptLower.includes('soul')) {
    genre = 'r&b';
  } else if (promptLower.includes('rock')) {
    genre = 'rock';
  }
  
  // Extract tempo
  let tempo = 120; // Default tempo (BPM)
  const tempoMatch = promptLower.match(/\d+\s*bpm/);
  if (tempoMatch) {
    tempo = parseInt(tempoMatch[0], 10);
  } else if (promptLower.includes('fast') || promptLower.includes('upbeat')) {
    tempo = 140;
  } else if (promptLower.includes('slow') || promptLower.includes('ballad')) {
    tempo = 80;
  }
  
  // Extract mood
  let mood = 'energetic'; // Default mood
  if (promptLower.includes('happy') || promptLower.includes('upbeat')) {
    mood = 'happy';
  } else if (promptLower.includes('sad') || promptLower.includes('melancholy')) {
    mood = 'sad';
  } else if (promptLower.includes('dramatic') || promptLower.includes('thriller')) {
    mood = 'dramatic';
  } else if (promptLower.includes('smooth') || promptLower.includes('chill')) {
    mood = 'smooth';
  }
  
  // Extract Jacko-style elements
  const jackoElements = [];
  if (promptLower.includes('billie jean')) {
    jackoElements.push('billie_jean_bassline');
  }
  if (promptLower.includes('thriller')) {
    jackoElements.push('thriller_synths');
  }
  if (promptLower.includes('beat it')) {
    jackoElements.push('beat_it_guitar');
  }
  if (promptLower.includes('smooth criminal')) {
    jackoElements.push('smooth_criminal_rhythm');
  }
  
  // Add default Jacko element if none specified
  if (jackoElements.length === 0) {
    jackoElements.push('jacko_vocal_style');
  }
  
  // Simulate processing delay for a more realistic experience
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    genre,
    tempo,
    mood,
    jackoElements,
    originalPrompt: prompt
  };
};