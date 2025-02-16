
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WidgetPage from './pages/WidgetPage';
import FAQ from './pages/faq';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/faq" element={<FAQ />} />  {/* route to FAQ page */}
      <Route path="/" element={< f/>} /> {/* needs to be intergrated with home page*/}
  <Route exact path="/widgets" element={<WidgetPage />} /> {/* route to widget page */}
      </Routes>

      
    </Router>
    
  );
}

export default App;
