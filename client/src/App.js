import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// src/App.js
import React from 'react';
import Calendar from '../src/pages/Calendar.js'; 
import './App.css';
import ActivitiesForm from './pages/activitiesform'; // <-- Import your new component
import AccountPage  from './pages/AccountPage.js';

function App() {
  return (
    <Router>
      <Routes>


      <Route path="/faq" element={<FAQ />} />  {/* route to FAQ page */}

  <Route exact path="/WidgetPage" element={<WidgetPage />} /> {/* route to widget page */}

  <Route path="/account" element={<AccountPage />} />
        <Route path="/" element={<Home />} />
        {/* Add the new ActivitiesForm route */}
        <Route path="/activities" element={<ActivitiesForm />} />
          <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;