import React, { useState } from 'react';

const App = () => {
  const [textInput, setTextInput] = useState('');
  const [speechBlob, setSpeechBlob] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSpeech = async () => {
    try {
      setIsGenerating(true);

      if (speechBlob !== null) {
        URL.revokeObjectURL(URL.createObjectURL(speechBlob)); // Clean up previous blob
        setSpeechBlob(null); // Delete old audio clip
      }

      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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', // Replace with your OpenAI API key
        },
        body: JSON.stringify({
          model: 'tts-1-hd',
          voice: 'nova',
          input: textInput,
        }),
      });

      if (response.ok) {
        const stream = response.body;
        const reader = stream.getReader();

        let chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }

        const blob = new Blob(chunks, { type: 'audio/mpeg' });
        setSpeechBlob(blob);
      } else {
        console.error('Failed to generate speech');
      }
    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <h1>TTS - aalhadxx</h1>
      <textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Enter text to convert to speech"
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleGenerateSpeech} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate Speech'}
      </button>
      <br />
      {speechBlob && !isGenerating && (
        <audio controls>
          <source src={URL.createObjectURL(speechBlob)} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default App;
