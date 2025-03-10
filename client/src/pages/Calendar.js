
import '../styles/calendarStyles.css';
import { Link } from 'react-router-dom'; 

import {useState} from 'react';
import Logo from '../images/homePageLogo.png'
import { Button } from "@mui/material";
 function Calendar() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = 'February';
    const numDays = 28; // Example for February
    const firstDayOffset = 2; 

    const events = {
        6: [
            { label: 'Tennis Practice', color: 'green', time: '3:00 PM', place: 'Tennis Courts', description: 'Practice for upcoming match' },
            { label: 'Team Meeting', color: 'blue', time: '5:00 PM', place: 'Room 10', description: 'Discuss strategy for the next match' }
        ],
        9: [
            { label: 'CS Club', color: 'red', time: '7:00 AM', place: 'Room 52', description: "We'll be having a typing competition today!" }
        ],
        13: [
            { label: '7th Period Assembly', color: 'blue', time: '12:00 PM - 12:20 PM', place: 'Main Gym', description: 'Learn about the winter assembly!' },
            { label: 'PARCC & Career Center', color: 'green', time: '2:00 PM', place: 'Auditorium', description: 'PARCC & Career Center' }
        ]
    };

    const [selectedEvent, setSelectedEvent] = useState(null);

    const renderDays = () => {
        let daySquares = [];
    
        // Empty spaces for days before Feb 1st
        for (let i = 0; i < firstDayOffset; i++) {
            daySquares.push(<div className="day-square empty" key={'empty-' + i}></div>);
        }
    
        for (let i = 1; i <= numDays; i++) {
            daySquares.push(
                <div className="day-square" key={i}>
                    <div className="day-number">{i}</div>
                    
                    {/* Check if there are multiple events for this day */}
                    {events[i] && events[i].map((event, index) => (
                        <div
                            key={index}
                            className="event-label"
                            style={{ backgroundColor: event.color }}
                            onClick={() => setSelectedEvent(event)}
                        >
                            {event.label}
                        </div>
                    ))}
                </div>
            );
        }
    
        return daySquares;
    };

    const EventPopup = ({ event, onClose }) => {
        if (!event) return null; // If no event is selected, don't render
    
        return (
            <div className="popup-overlay" onClick={onClose}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <h2>{event.label}</h2>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Place:</strong> {event.place}</p>
                    <p><strong>Description:</strong> {event.description}</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        );
    };
    

     return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
            <div className="calendar-container">
                <div className="month-header">
                <Button  component={Link}   to="/" className="logo"><img src={Logo} width="100" height="100" alt=""/></Button>
                    <div className="month-name" 
                    >{month}</div>
                </div>
                <div className="legend">
                    <span className="legend-item red">Club Meetings</span>
                    <span className="legend-item blue">School Events</span>
                    <span className="legend-item green">School Sports</span>
                </div>
                <div className="days-grid">
                    {days.map((day, index) => (
                        <div className="day-name" key={index}>{day}</div>
                    ))}
                    {renderDays()}
                </div>
                {selectedEvent && <EventPopup event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
            </div>
        </>
    );

}
export default Calendar;