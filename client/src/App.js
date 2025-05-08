

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WidgetPage from './pages/WidgetPage';
import FAQ from './pages/faq';

// src/App.js
import React from 'react';
import Home from './pages/Home';
import logo from './logo.svg';
import Calendar from '../src/pages/Calendar.js'; 
import './App.css';
import ActivitiesForm from './pages/activitiesform'; // <-- Import your new component
import AccountPage  from './pages/AccountPage.js';
import SlideshowPage from './pages/Slideshow.js';
function App() {
  return (
    <Router>
      <Routes>


      <Route path="/faq" element={<FAQ />} />  {/* route to FAQ page */}
      <Route exact path="/Slideshow" element={<SlideshowPage />}/>
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