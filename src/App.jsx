import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GuitarProvider } from './context/GuitarContext';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

const App = () => (
  <GuitarProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  </GuitarProvider>
);

export default App;
