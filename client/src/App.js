// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ActivitiesForm from './pages/activitiesform'; // <-- Import your new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add the new ActivitiesForm route */}
        <Route path="/activities" element={<ActivitiesForm />} />
      </Routes>
    </Router>
  );
}

export default App;