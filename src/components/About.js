// About.js

import React, { useState } from 'react';
import '../styles/vision.css'; // Import the CSS file

const About = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [output, setOutput] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (selectedImage) {
      try {
        // Convert selected image to base64
        const base64Image = selectedImage.split(',')[1];

        // Make a POST request to OpenAI API with the selected image data
        // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}` // Replace with your OpenAI API key
            // 'Authorization': 'Bearer YOUR_OPENAI_API_KEY' // Replace with your OpenAI API key
          },
          body: JSON.stringify({
            // Include payload here similar to your Python code
            // ...
            model: "gpt-4-vision-preview",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: "What’s in this image?" },
                  {
                    type: "image_url",
                    image_url: {
                      "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                    },
                  },
                ],
              },
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          setOutput(JSON.stringify(data, null, 2)); // Display the response in a readable format
        } else {
          console.error('Failed to analyze image');
        }
      } catch (error) {
        console.error('Error analyzing image:', error);
      }
    } else {
      console.error('Please upload an image first');
    }
  };

  return (
    <div className="upload-container">
      <label htmlFor="fileInput" className="upload-button">
        Choose File
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      {selectedImage && (
        <div>
          <h2>Selected Image</h2>
          <img src={selectedImage} alt="Selected" className="selected-image" />
        </div>
      )}
      <button onClick={analyzeImage} className="upload-button">
        Analyze Image
      </button>
      {output && (
        <div className="output">
          <h2>Output</h2>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default About;
