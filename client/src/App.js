
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WidgetPage from './pages/WidgetPage';
import FAQ from './pages/faq';
import HomePage from './pages/test';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/faq" element={<FAQ />} />
      <Route path="/" element={<HomePage />} />
  <Route exact path="/widgets" element={<WidgetPage />} />
      </Routes>

      
    </Router>
    
  );
}

export default App;
