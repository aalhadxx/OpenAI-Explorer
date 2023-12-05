import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import TTS from './components/TTS';
import Image from './components/Image';
import './App.css'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/TTS" element={<TTS />} />
        <Route path="/Image" element={<Image />} />
      </Routes>
    </Router>
  );
};

export default App;
