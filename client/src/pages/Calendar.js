import '../styles/calendarStyles.css';
import { useState } from 'react';

function Calendar() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Get the current date
    const today = new Date();
    const currentMonth = today.getMonth(); 
    const currentYear = today.getFullYear();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const month = monthNames[currentMonth];

    // Get number of days in the current month
    const numDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOffset = new Date(currentYear, currentMonth, 1).getDay();

    // Event categories and colors
    const eventTypes = {
        sports: { color: 'green', label: 'Sports Event' },
        club: { color: 'red', label: 'Club Meeting' },
        school: { color: 'blue', label: 'School Event' }
    };

    // Example Events (Restricted to 3 types)
    const events = {
        4: [
            { type: 'club', label: 'CS Club Meeting', time: '7:00 AM', place: 'Room 52', description: 'Discuss upcoming hackathon' },

        ],
        6: [
            { type: 'sports', label: 'Tennis Match', time: '3:00 PM', place: 'Tennis Courts', description: 'Friendly match against rival school' },
            { type: 'school', label: 'Parent-Teacher Night', time: '6:30 PM', place: 'Auditorium', description: 'School-wide event' }
 
        ],
        9: [
            { type: 'club', label: 'Debate Club', time: '7:00 AM', place: 'Room 10', description: 'Prepping for state championship' }
        ],
        15: [
            { type: 'sports', label: 'Soccer Practice', time: '4:00 PM', place: 'Field', description: 'Training for weekend game' }
        ],
        22: [
            { type: 'school', label: 'Science Fair', time: '1:00 PM', place: 'Gym', description: 'Students showcase projects' }
        ]
    };

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventIndexes, setEventIndexes] = useState({}); 

    const goForward = (day) => {
        setEventIndexes((prev) => ({
            ...prev,
            [day]: Math.min((prev[day] || 0) + 3, events[day].length - 1)
        }));
    };

    const goBack = (day) => {
        setEventIndexes((prev) => ({
            ...prev,
            [day]: Math.max((prev[day] || 0) - 3, 0)
        }));
    };

    const renderDays = () => {
        let daySquares = [];

        for (let i = 0; i < firstDayOffset; i++) {
            daySquares.push(<div className="day-square empty" key={'empty-' + i}></div>);
        }

        for (let i = 1; i <= numDays; i++) {
            const visibleIndex = eventIndexes[i] || 0;
            const eventList = events[i] || [];
            const visibleEvents = eventList.slice(visibleIndex, visibleIndex + 3);

            daySquares.push(
                <div className="day-square" key={i}>
                    <div className="day-number">{i}</div>

                    {visibleEvents.map((event, index) => {
                        const eventType = eventTypes[event.type] || {}; 

                        return (
                            <div
                                key={index}
                                className="event-label"
                                style={{ backgroundColor: eventType.color }}
                                onClick={() => setSelectedEvent(event)}
                            >
                                {eventType.icon} {event.label}
                            </div>
                        );
                    })}

                    {eventList.length > 3 && (
                        <div className="event-pagination">
                            {visibleIndex > 0 && <button onClick={() => goBack(i)}>⬅</button>}
                            {visibleIndex + 3 < eventList.length && <button onClick={() => goForward(i)}>➡</button>}
                        </div>
                    )}
                </div>
            );
        }

        return daySquares;
    };

    const EventPopup = ({ event, onClose }) => {
        if (!event) return null;
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
            <div className="calendar-container">
                <div className="month-header">
                    <div className="logo">CSS</div>
                    <div className="month-name">{month} {currentYear}</div>
                </div>

                {/* Event Key (Legend) */}
                <div className="event-key">
                    {Object.values(eventTypes).map((event, index) => (
                        <div 
                            key={index} 
                            className="event-key-item" 
                            style={{ backgroundColor: event.color }}
                        >
                            <span className="event-key-color" style={{ backgroundColor: event.color }}></span>
                            {event.label}
                        </div>
                    ))}
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
