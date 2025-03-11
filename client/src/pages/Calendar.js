import '../styles/calendarStyles.css';
import { useState } from 'react';

function Calendar() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Get the current date
    const today = new Date();
    const currentMonth = today.getMonth();  // 0 = Jan, 1 = Feb, etc.
    const currentYear = today.getFullYear();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const month = monthNames[currentMonth];

    // Get number of days in the current month
    const numDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Get the weekday index of the 1st day of the month
    const firstDayOffset = new Date(currentYear, currentMonth, 1).getDay();

    // Example Events
    const events = {
        6: [
            { label: 'Tennis Practice', color: 'green', time: '3:00 PM', place: 'Tennis Courts', description: 'Practice for upcoming match' },
            { label: 'Team Meeting', color: 'blue', time: '5:00 PM', place: 'Room 10', description: 'Discuss strategy for the next match' },
            { label: 'Music Class', color: 'purple', time: '6:30 PM', place: 'Room 20', description: 'Guitar lessons' },
            { label: 'Volunteer Work', color: 'orange', time: '8:00 AM', place: 'Community Center', description: 'Helping at the shelter' },
            { label: 'Dinner with Coach', color: 'yellow', time: '7:00 PM', place: 'Downtown Cafe', description: 'Team bonding dinner' }
        ],
        9: [
            { label: 'CS Club', color: 'red', time: '7:00 AM', place: 'Room 52', description: "We'll be having a typing competition today!" }
        ]
    };

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventIndexes, setEventIndexes] = useState({}); // Tracks visible event index per day

    // Function to handle forward pagination
    const goForward = (day) => {
        setEventIndexes((prev) => ({
            ...prev,
            [day]: Math.min((prev[day] || 0) + 3, events[day].length - 1)
        }));
    };

    // Function to handle backward pagination
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

                    {/* Display only 3 events at a time */}
                    {visibleEvents.map((event, index) => (
                        <div
                            key={index}
                            className="event-label"
                            style={{ backgroundColor: event.color }}
                            onClick={() => setSelectedEvent(event)}
                        >
                            {event.label}
                        </div>
                    ))}

                    {/* Navigation buttons if there are more than 3 events */}
                    {eventList.length > 3 && (
                        <div className="event-pagination">
                            {visibleIndex > 0 && <button onClick={() => goBack(i)}>⬅ Go Back</button>}
                            {visibleIndex + 3 < eventList.length && <button onClick={() => goForward(i)}>Go Forward ➡</button>}
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