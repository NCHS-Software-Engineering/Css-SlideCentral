import '../styles/calendarStyles.css';
import { useState, useEffect } from 'react';
import {Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../images/homePageLogo.png';



const redButtonStyle = {
    backgroundColor: 'red',
    color: '#fff',
    textTransform: 'none',
    transition: 'transform 0.3s, background-color 0.3s',
    whiteSpace: 'nowrap',
    // Use a slightly larger font on mobile (xs) and smaller on desktop (md)
    fontSize: { xs: '0.875rem', md: '0.75rem' },
    '&:hover': {
      backgroundColor: '#b71c1c',
      transform: 'scale(1.05)',
    },
    
  };
  

function Calendar() {
    console.log('Calendar component rendered');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const month = monthNames[currentMonth];
    const numDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOffset = new Date(currentYear, currentMonth, 1).getDay();

    const eventTypes = {
        'school sports': { color: 'green', label: 'School Sports' },
        'club meetings': { color: 'red', label: 'Club Meeting' },
        'school events': { color: 'blue', label: 'School Event' },
    };

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventIndexes, setEventIndexes] = useState({}); 
    const [events, setEvents] = useState({}); 

    useEffect(() => {
        fetch('http://localhost:8500/api/events')  
            .then((response) => response.json())
            .then((data) => {
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
                            date.setDate(startDay);
                            addEvent(date);
                        }
                    }
                });

                setEvents(eventsGroupedByDay);
                console.log('Fetched events:', eventsGroupedByDay);
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });
    }, [currentMonth, currentYear]);

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

    const changeMonth = (offset) => {
        setEventIndexes({});
        const newDate = new Date(currentYear, currentMonth + offset);
        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
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
                        const eventType = eventTypes[event.activityType.toLowerCase()] || {};

                        return (
                            <Button
                            key={index}
                            variant="contained"
                            sx={{
                                backgroundColor: eventType.color,
                                color: 'white',
                                fontSize: '0.8rem',
                                padding: '4px 8px',
                                margin: '2px 0',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: eventType.color,
                                    opacity: 0.9,
                                },
                            }}
                            onClick={() => setSelectedEvent(event)}
                        >
                            {event.activityName || eventType.label}
                        </Button>
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
        return (
            <div className="popup-overlay" onClick={onClose}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <h2>{event.activityName}</h2>
                    <p><strong>Time:</strong> {event.calendarTimeOfDay || 'TBD'}</p>
                    <p><strong>Description:</strong> {event.activityDesc || 'No description available.'}</p>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                    sx={{
                        backgroundColor: 'red',
                        color: 'white',
                        textTransform: 'none',
                        '&:hover': {
                        backgroundColor: '#b71c1c',
                        },
                    }}
                    >
                    Close
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="calendar-container">
                <div className="month-header">
                     {/* Add the logo image and make it clickable */}
                     <Link to="/"> {/* Navigate back to the home page */}
                        <img src={Logo} alt="Logo" className="logo" />
                    </Link>
                    <div className="month-controls">
                        <div className="month-name">{month} {currentYear}</div>
                        <Button style = {redButtonStyle} onClick={() => changeMonth(-1)} >&lt;</Button>
                        <Button style = {redButtonStyle} onClick={() => changeMonth(1)}>&gt;</Button>
                    </div>
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