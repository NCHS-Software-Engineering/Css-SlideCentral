

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WidgetPage from './pages/WidgetPage';
import FAQ from './pages/faq';

// src/App.js
import React from 'react';
import Home from './pages/Home';
// Import other pages as needed


function App() {
  return (
    <Router>
      <Routes>

      <Route path="/faq" element={<FAQ />} />  {/* route to FAQ page */}

  <Route exact path="/widgets" element={<WidgetPage />} /> {/* route to widget page */}
<Route path="/" element={<Home />} />
        {/* Add more routes here */}
      </Routes>

      
    </Router>
    

  );
}

export default App;
