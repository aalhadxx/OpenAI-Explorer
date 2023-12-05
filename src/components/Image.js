// ImageGeneration.js

import React, { useState } from 'react';

const Image = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const imageUrl = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-1CIZA90eX3a77YZGiR9ij9C3/user-79USCfNppEx3vArC7eHmzFZ6/img-qkV0B4p28GGfowOP8kg1cKvO.png"; // Replace this with your URL
  const handleGenerateImage = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer YOUR_OPENAI_API_KEY' // Replace with your OpenAI API key
          'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}` // Replace with your OpenAI API key
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024'
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        const imageUrl = result?.data?.url; // Assuming the URL of the generated image is present in the response
        console.log(result.data);
        console.log(result.data.data[0].url);
        if (imageUrl) {
          setGeneratedImageUrl(imageUrl);
        }
      } else {
        console.error('Failed to generate image');
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
      <h2>Generated Image</h2>
      <img src={imageUrl} alt="Generated" />
    </div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
      />
      <br />
      <button onClick={handleGenerateImage} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>
      {generatedImageUrl && (
        <div>
          <h2>Generated Image</h2>
          <img src={generatedImageUrl} alt="Generated" />
        </div>
      )}
    </div>
  );
};

export default Image;
