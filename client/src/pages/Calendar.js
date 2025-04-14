import '../styles/calendarStyles.css';
import { useState, useEffect } from 'react';

function Calendar() {
    console.log('Calendar component rendered');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const month = monthNames[currentMonth];
    const numDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOffset = new Date(currentYear, currentMonth, 1).getDay();

    // Updated event types
    const eventTypes = {
        'school sports': { color: 'green', label: 'School Sports' },
        'club meetings': { color: 'red', label: 'Club Meeting' },
        'school events': { color: 'blue', label: 'School Event' },
        'workshop': { color: 'orange', label: 'Workshop' },
        'meetup': { color: 'purple', label: 'Meetup' }
    };

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventIndexes, setEventIndexes] = useState({}); 
    const [events, setEvents] = useState({}); 

    useEffect(() => {
        fetch('http://localhost:8500/api/events')  
            .then((response) => response.json())
            .then((data) => {
                // Group events by the day of the month
                const eventsGroupedByDay = {};
const targetMonth = currentMonth;
const targetYear = currentYear;

data.forEach((event) => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    const frequency = event.calendarFrequency?.toLowerCase();
    const targetDayOfWeek = event.calendarDayOfWeek?.toLowerCase();
    const startDay = start.getDate();

    const addEvent = (date) => {
            if (date.getMonth() !== targetMonth || date.getFullYear() !== targetYear) return;

            const day = date.getDate();
            if (!eventsGroupedByDay[day]) eventsGroupedByDay[day] = [];
            eventsGroupedByDay[day].push({ ...event, displayDate: new Date(date) });
        };

            if (frequency === 'one-time') {
                addEvent(new Date(start));
            } else if (frequency === 'weekly' || frequency === 'biweekly') {
                const interval = frequency === 'weekly' ? 7 : 14;
                const startWeekday = start.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();

                // Align start to the correct weekday
                let firstEventDate = new Date(start);
                while (firstEventDate.toLocaleString('en-US', { weekday: 'long' }).toLowerCase() !== targetDayOfWeek) {
                    firstEventDate.setDate(firstEventDate.getDate() + 1);
                }

                for (let d = new Date(firstEventDate); d <= end; d.setDate(d.getDate() + interval)) {
                    addEvent(new Date(d));
                }
            } else if (frequency === 'monthly') {
                for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
                    const date = new Date(d);
                    date.setDate(startDay); // Use same day of the month
                    addEvent(date);
                }
            }
        });

                
                setEvents(eventsGroupedByDay);
                console.log('Fetched events:', eventsGroupedByDay); // Check the grouped events
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });
    }, []);
    

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
    
        // Fill empty days before the first day of the month
        for (let i = 0; i < firstDayOffset; i++) {
            daySquares.push(<div className="day-square empty" key={'empty-' + i}></div>);
        }
    
        // Render days of the current month
        for (let i = 1; i <= numDays; i++) {
            const visibleIndex = eventIndexes[i] || 0;
            const eventList = events[i] || [];
            const visibleEvents = eventList.slice(visibleIndex, visibleIndex + 3);
    
            daySquares.push(
                <div className="day-square" key={i}>
                    <div className="day-number">{i}</div>
    
                    {visibleEvents.map((event, index) => {
                        const eventType = eventTypes[event.activityType.toLowerCase()] || {}; // Map to correct event type
    
                        return (
                            <div
                                key={index}
                                className="event-label"
                                style={{ backgroundColor: eventType.color }}
                                onClick={() => setSelectedEvent(event)}
                            >
                                {event.activityName || eventType.label} {/* Display activity name if label is missing */}
                                
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

        const { label, time, place, description } = event;
        console.log('Event details:', event); // Check the event details
        console.log('Description:', event.activityDesc); // Check the event
        console.log('Label:', label); // Check the label    
        console.log('Time:', time); // Check the time
        console.log('Place:', place); // Check the place
        console.log('Description:', description); // Check the description
        return (
            <div className="popup-overlay" onClick={onClose}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <h2>{event.activityName}</h2>
                    <p><strong>Time:</strong> {event.calendarTimeOfDay || 'TBD'}</p>
                    <p><strong>Description:</strong> {event.activityDesc || 'No description available.'}</p>
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