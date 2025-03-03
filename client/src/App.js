
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import logo from './logo.svg';
import Calendar from '../src/pages/Calendar.js'; 
import './App.css';
import ActivitiesForm from './pages/activitiesform'; // <-- Import your new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add the new ActivitiesForm route */}
        <Route path="/activities" element={<ActivitiesForm />} />
          <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>

  );
}

export default App;