import '../styles/calendarStyles.css';
import { useState, useEffect } from 'react';
import {Button, Chip, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../images/homePageLogo.png';
import { useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';


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
    const [showSearchModal, setShowSearchModal] = useState(false);

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
        'school event': { color: 'blue', label: 'School Event' },
    };

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventIndexes, setEventIndexes] = useState({}); 
    const [allEvents, setAllEvents] = useState({}); // Store all events
    const [events, setEvents] = useState({}); 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    

    const fetchEvents = () => {
        fetch('http://localhost:8500/api/events', {
            method: 'GET',
            credentials: 'include', // Include cookies or other credentials
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const eventsGroupedByDay = {};
                const targetMonth = currentMonth;
                const targetYear = currentYear;
    
                data.forEach((event) => {
                    const start = new Date(event.activityDate);
                    const end = new Date(event.activityDate);
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
    
                setAllEvents(eventsGroupedByDay); // Store all events
                setEvents(eventsGroupedByDay); // Initially, show all events
                console.log('Fetched events:', eventsGroupedByDay);
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });
    };


    useEffect(() => {
        fetchEvents();
    }, [currentMonth, currentYear]);

    const goForward = (day) => {
        setEventIndexes((prev) => ({
            ...prev,
            [day]: Math.min((prev[day] || 0) + 3, events[day].length - 3),
        }));
    };
    
    const goBack = (day) => {
        setEventIndexes((prev) => ({
            ...prev,
            [day]: Math.max((prev[day] || 0) - 3, 0),
        }));
    };

    const changeMonth = (offset) => {
        setEventIndexes({});
        const newDate = new Date(currentYear, currentMonth + offset);
        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
    };

    const dayRefs = useRef({}); // Move useRef to the top level of the component


    const renderDays = () => {
        let daySquares = [];
    
        // Add empty squares for days before the first day of the month
        for (let i = 0; i < firstDayOffset; i++) {
            daySquares.push(<div className="day-square empty" key={'empty-' + i}></div>);
        }
    
        // Render days with events
        for (let i = 1; i <= numDays; i++) {
            const visibleIndex = eventIndexes[i] || 0; // Starting index of visible events
            const eventList = events[i] || []; // Events for the current day
            const visibleEvents = eventList.slice(visibleIndex, visibleIndex + 3); // Show 3 events at a time
    
            daySquares.push(
                <div
                    className="day-square"
                    key={i}
                    ref={(el) => (dayRefs.current[i] = el)} // Store the ref for this day
                >
                    <div className="day-number">{i}</div>
    
                    {/* Render visible events */}
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
                                    display: 'inline-block', // Required for ellipsis
                                    whiteSpace: 'nowrap', // Prevent text wrapping
                                    overflow: 'hidden', // Hide overflowing text
                                    textOverflow: 'ellipsis', // Add ellipsis for overflowing text
                                    maxWidth: '75%', // Ensure the text fits within the button
                                    '&:hover': {
                                        backgroundColor: eventType.color,
                                        opacity: 0.9,
                                    },
                                }}
                                onClick={() => setSelectedEvent(event)}
                                className="event-text"
                            >
                                {event.activityName || eventType.label}
                            </Button>
                        );
                    })}
    
                    {/* Add navigation buttons if there are more events */}
                    {eventList.length > 3 && (
                        <div className="event-pagination">
                            {visibleIndex > 0 && (
                                <Button
                                    variant="text"
                                    onClick={() => goBack(i)}
                                    sx={{
                                        fontSize: '1.2rem',
                                        color: 'black',
                                        minWidth: '30px',
                                        padding: '0',
                                    }}
                                >
                                    ⬅
                                </Button>
                            )}
                            {visibleIndex + 3 < eventList.length && (
                                <Button
                                    variant="text"
                                    onClick={() => goForward(i)}
                                    sx={{
                                        fontSize: '1.2rem',
                                        color: 'black',
                                        minWidth: '30px',
                                        padding: '0',
                                    }}
                                >
                                    ➡
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            );
        }
    
        return daySquares;
    };

    const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Are you sure you want to delete this event?</h2>
                    <div className="modal-buttons">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onConfirm}
                            sx={{
                                backgroundColor: 'red',
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#b71c1c',
                                },
                                marginRight: '10px',
                            }}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onCancel}
                            sx={{
                                backgroundColor: 'gray',
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#555',
                                },
                            }}
                        >
                            No
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    const EventPopup = ({ event, onClose }) => {
        if (!event) return null;
    
        const eventType = event.activityType.toLowerCase();
        const eventColor = eventTypes[eventType]?.color || 'gray'; // Default to gray if no color is found
    
        return (
            <div className="popup-overlay" onClick={onClose}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <h2>{event.activityName}</h2>
                    <p><strong>Time:</strong> {event.calendarTimeOfDay || 'TBD'}</p>
                    <p><strong>Description:</strong> {event.activityDesc || 'No description available.'}</p>
    
                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{
                            backgroundColor: eventColor,
                            color: 'white',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: eventColor,
                                opacity: 0.9,
                            },
                            marginTop: '20px',
                        }}
                    >
                        Close
                    </Button>
                </div>
            </div>
        );
    };

    const [filters, setFilters] = useState({
        sports: false,
        meetings: false,
        events: false,
    });

    const [searchText, setSearchText] = useState('');  

    const SearchModal = ({ onClose, onApply, filters, setFilters, searchText, setSearchText }) => {
        const handleCheckboxChange = (e) => {
            const { name, checked } = e.target;
            setFilters((prev) => ({
                ...prev,
                [name]: checked,
            }));
        };
    
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Filter Events</h2>
    
                    {/* Text Input for Search */}
                    <div className="modal-section">
                        <TextField
                            id="searchText"
                            label="Enter a name..."
                            variant="outlined"
                            value={searchText} // Use the searchText prop
                            onChange={(e) => setSearchText(e.target.value)} // Update the parent state
                            placeholder="Type to search..."
                            fullWidth
                            sx={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        />
                    </div>
    
                    {/* Material-UI Checkboxes for Filters */}
                    <div className="modal-section">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="sports"
                                    checked={filters.sports}
                                    onChange={handleCheckboxChange}
                                    sx={{
                                        color: 'green',
                                        '&.Mui-checked': {
                                            color: 'green',
                                        },
                                    }}
                                />
                            }
                            label="School Sports"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="meetings"
                                    checked={filters.meetings}
                                    onChange={handleCheckboxChange}
                                    sx={{
                                        color: 'red',
                                        '&.Mui-checked': {
                                            color: 'red',
                                        },
                                    }}
                                />
                            }
                            label="Club Meetings"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="events"
                                    checked={filters.events}
                                    onChange={handleCheckboxChange}
                                    sx={{
                                        color: 'blue',
                                        '&.Mui-checked': {
                                            color: 'blue',
                                        },
                                    }}
                                />
                            }
                            label="School Events"
                        />
                    </div>
    
                    {/* Action Buttons */}
                    <div className="modal-buttons">
                        <Button
                            variant="contained"
                            onClick={() => onApply(searchText, filters)} // Pass searchText and filters to the parent
                            sx={{
                                backgroundColor: 'green',
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#2ecc71',
                                },
                                marginRight: '10px',
                            }}
                        >
                            Apply
                        </Button>
                        <Button
                            variant="contained"
                            onClick={onClose}
                            sx={{
                                backgroundColor: 'gray',
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#555',
                                },
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    const applyFilters = (searchText, filters) => {
        const filteredEvents = {};
    
        // Loop through all events and apply filters
        Object.keys(allEvents).forEach((day) => {
            const dayEvents = allEvents[day].filter((event) => {
                const matchesSearchText = event.activityName.toLowerCase().includes(searchText.toLowerCase());
                const matchesFilter =
                    (filters.sports && event.activityType.toLowerCase() === 'school sports') ||
                    (filters.meetings && event.activityType.toLowerCase() === 'club meetings') ||
                    (filters.events && event.activityType.toLowerCase() === 'school event');
    
                // If no filters are selected, show all events that match the search text
                return matchesSearchText && (matchesFilter || (!filters.sports && !filters.meetings && !filters.events));
            });
    
            if (dayEvents.length > 0) {
                filteredEvents[day] = dayEvents;
            }
        });
    
        setEvents(filteredEvents); // Update the events state with filtered events
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
            <Button style={redButtonStyle} onClick={() => changeMonth(-1)}>&lt;</Button>
            <Button style={redButtonStyle} onClick={() => changeMonth(1)}>&gt;</Button>

                {/* Search Button */}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'gray',
                        color: 'white',
                        marginLeft: 'auto', // Push the button to the far right
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#555',
                        },
                    }}
                    startIcon={<SearchIcon />}
                    onClick={() => setShowSearchModal(true)} // Show the modal
                    >
                    Filter
                </Button>
            </div>
                </div>

                <div className="event-key">
                 {Object.values(eventTypes).map((event, index) => (
        <Chip
            key={index}
            label={event.label} // Use the label from the event type
            sx={{
                backgroundColor: event.color,  
                color: 'white',  
                fontWeight: 'bold',
                margin: '5px',
            }}
            />
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
        
            {showSearchModal && (
            <SearchModal
            filters={filters}
            setFilters={setFilters}
            searchText={searchText}
            setSearchText={setSearchText}
            onClose={() => setShowSearchModal(false)} // Close the modal
            onApply={(searchText, filters) => {
                applyFilters(searchText, filters); // Apply the filters
                setShowSearchModal(false); // Close the modal after applying filters
            }}
        />
        )}
        
        </>

        

    );
}

export default Calendar;