import '../styles/styles.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Button } from '@mui/material';
import Logo from '../images/homePageLogo.png';

function SlideshowPage() {
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgColor, setBgColor] = useState("#ffffff");

  // Fetch activities from the backend
  useEffect(() => {
    fetch("http://localhost:8500/api/events", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        console.log("Fetched activities:", data); // <== Add this

      })
      .catch(err => console.error("Failed to load events:", err));
  }, []);

  // Cycle through activities every 10s
  useEffect(() => {
    if (activities.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activities.length);
    }, 12000); // 10 seconds

    return () => clearInterval(interval);
  }, [activities]);

  

  const current = activities[currentIndex];

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />

      <Button
        component={Link}
        to="/"
        className="logo"
        sx={{ padding: 0, minWidth: "auto" }}
      >
        <img src={Logo} width="150" height="150" alt="Logo" style={{ display: 'block', margin: '0 auto' }} />
      </Button>

      <h1 className="page-title">Slideshow</h1>

      
      {activities.length === 0 || !current ? (
  <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>
    Loading slideshow... (no activities or data not yet fetched)
  </p>
) : (
  <div className="slide-content" style={{ backgroundColor: bgColor, transition: 'background-color 1s' }}>
    <h1 className="slide-header">{current.activityName}</h1>
    <div className="slide-body">
      <div className="slide-text">
      <p><strong>Type:</strong> {current.activityType}</p>
        <p><strong>Date(s):</strong> {new Date(current.activityDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {current.calendarTimeOfDay}</p>
        <p><strong>Frequency:</strong> {current.calendarFrequency}</p>
        <p><strong>Desc:</strong> {current.activityDesc}</p>
      </div>
      <div className="slide-image">
        <img
          src={current.imagePath ? `/uploads/${current.imagePath}` : Logo}
          alt="Activity"
        />
      </div>
    </div>
  </div>
)}

      
    </>
  );
}

export default SlideshowPage;
