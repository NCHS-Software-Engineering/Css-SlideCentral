// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home           from './pages/Home';
import ActivitiesForm from './pages/ActivitiesForm';
import EditActivities from './pages/EditActivities';
import Calendar       from './pages/Calendar';
import AccountPage    from './pages/AccountPage';
import WidgetPage     from './pages/WidgetPage';
import FAQ            from './pages/FAQ';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/activities"      element={<ActivitiesForm />} />
        <Route path="/edit-activities" element={<EditActivities />} />
        <Route path="/calendar"        element={<Calendar />} />
        <Route path="/account"         element={<AccountPage />} />
        <Route path="/WidgetPage"      element={<WidgetPage />} />
        <Route path="/faq"             element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;