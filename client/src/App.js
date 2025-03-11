import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// src/App.js
import React from 'react';
import Calendar from '../src/pages/Calendar.js'; 
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;