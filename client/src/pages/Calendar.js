import '../styles/calendarStyles.css';
import { useState, useEffect } from 'react';
import { Button, Chip, TextField, Checkbox, FormControlLabel, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../images/homePageLogo.png';
import { useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const redButtonStyle = {
  backgroundColor: '#d93632',
  color: '#fff',
  textTransform: 'none',
  transition: 'transform 0.3s, background-color 0.3s',
  whiteSpace: 'nowrap',
  fontSize: { xs: '0.875rem', md: '0.9rem' },
  '&:hover': {
    backgroundColor: '#b71c1c',
  },
};

const SearchModal = ({ onClose, onApply, filters, setFilters, searchText, setSearchText }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <>

    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Filter Events</h2>

        {/* Text Input for Search */}
        <div className="modal-section">
          <TextField
            id="searchText"
            label="Enter a name..."
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
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
                  color: '#d0382d ',
                  '&.Mui-checked': {
                    color: '#d0382d',
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
            onClick={() => onApply(searchText, filters)}
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
    </>
  );
};

function Calendar() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventIndexes, setEventIndexes] = useState({});
  const [allEvents, setAllEvents] = useState({});
  const [events, setEvents] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState({
    sports: false,
    meetings: false,
    events: false,
  });

  // Mobile detection and state
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const maxEventsPerDay = isMobile ? 1 : 3;
  
  // Mobile view state
  const [mobileView, setMobileView] = useState('week'); // 'week' | 'day'
  const [mobileWeekStart, setMobileWeekStart] = useState(1);
  const [mobileSelectedDay, setMobileSelectedDay] = useState(1);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = monthNames[currentMonth];
  const numDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOffset = new Date(currentYear, currentMonth, 1).getDay();

  const eventTypes = {
    'school sports': { color: 'green', label: 'School Sports' },
    'club meetings': { color: '#d0382d', label: 'Club Meeting' },
    'school events': { color: 'blue', label: 'School Event' },
  };

  const fetchEvents = () => {
    fetch('http://localhost:8500/api/events', {
      method: 'GET',
      credentials: 'include',
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

        setAllEvents(eventsGroupedByDay);
        setEvents(eventsGroupedByDay);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  };

  useEffect(() => {
    fetchEvents();
    // Reset mobile states when month changes
    setMobileView('week');
    setMobileWeekStart(1);
    setMobileSelectedDay(1);
  }, [currentMonth, currentYear]);

  const goForward = (day) => {
    setEventIndexes((prev) => ({
      ...prev,
      [day]: Math.min((prev[day] || 0) + maxEventsPerDay, events[day].length - maxEventsPerDay),
    }));
  };

  const goBack = (day) => {
    setEventIndexes((prev) => ({
      ...prev,
      [day]: Math.max((prev[day] || 0) - maxEventsPerDay, 0),
    }));
  };

  const changeMonth = (offset) => {
    setEventIndexes({});
    const newDate = new Date(currentYear, currentMonth + offset);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  // Mobile navigation functions
  const prevWeek = () => setMobileWeekStart(w => Math.max(1, w - 7));
  const nextWeek = () => setMobileWeekStart(w => (w + 7 <= numDays ? w + 7 : w));
  const prevDay = () => setMobileSelectedDay(d => Math.max(1, d - 1));
  const nextDay = () => setMobileSelectedDay(d => Math.min(numDays, d + 1));

  const applyFilters = (searchText, filters) => {
    const filteredEvents = {};

    Object.keys(allEvents).forEach((day) => {
      const dayEvents = allEvents[day].filter((event) => {
        const matchesSearchText = event.activityName.toLowerCase().includes(searchText.toLowerCase());
        const matchesFilter =
          (filters.sports && event.activityType.toLowerCase() === 'school sports') ||
          (filters.meetings && event.activityType.toLowerCase() === 'club meetings') ||
          (filters.events && event.activityType.toLowerCase() === 'school events');

        return matchesSearchText && (matchesFilter || (!filters.sports && !filters.meetings && !filters.events));
      });

      if (dayEvents.length > 0) {
        filteredEvents[day] = dayEvents;
      }
    });

    setEvents(filteredEvents);
  };

  const dayRefs = useRef({});

  // Mobile rendering functions
  const renderMobileWeek = () => {
    const start = mobileWeekStart;
    const end = Math.min(start + 6, numDays);
    
    return Array.from({ length: end - start + 1 }, (_, i) => {
      const day = start + i;
      const list = events[day] || [];
      const weekday = days[new Date(currentYear, currentMonth, day).getDay()];
      
      return (
        <div className="mobile-day-section" key={day}>
          <div
            className="mobile-day-header"
            onClick={() => {
              setMobileSelectedDay(day);
              setMobileView('day');
            }}
          >
            {`${weekday} ${month} ${day}`}
          </div>
          
          {list.length > 0 ? (
            list.slice(0, maxEventsPerDay).map((event, idx) => (
              <div
                key={idx}
                className="mobile-event-block"
                style={{
                  borderLeft: `4px solid ${eventTypes[event.activityType.toLowerCase()]?.color || 'gray'}`
                }}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="mobile-event-time">
                  {event.calendarTimeOfDay || 'All day'}
                </div>
                <div className="mobile-event-title">
                  {event.activityName}
                </div>
              </div>
            ))
          ) : (
            <div className="mobile-no-events">No events</div>
          )}
        </div>
      );
    });
  };

  const renderMobileDay = () => {
    const day = mobileSelectedDay;
    const list = events[day] || [];
    const weekday = days[new Date(currentYear, currentMonth, day).getDay()];
    
    return (
      <div className="mobile-day-section">
        <div
          className="mobile-day-header back-to-week"
          onClick={() => setMobileView('week')}
        >
          ← Week view
        </div>
        
        <div className="mobile-day-header">
          {`${weekday} ${month} ${day}`}
        </div>
        
        <div className="mobile-day-controls">
          <Button size="small" onClick={prevDay} disabled={day <= 1}>
            Prev Day
          </Button>
          <Button size="small" onClick={nextDay} disabled={day >= numDays}>
            Next Day
          </Button>
        </div>
        
        {list.length > 0 ? (
          list.map((event, idx) => (
            <div
              key={idx}
              className="mobile-event-block"
              style={{
                borderLeft: `4px solid ${eventTypes[event.activityType.toLowerCase()]?.color || 'gray'}`
              }}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="mobile-event-time">
                {event.calendarTimeOfDay || 'All day'}
              </div>
              <div className="mobile-event-title">
                {event.activityName}
              </div>
            </div>
          ))
        ) : (
          <div className="mobile-no-events">No events</div>
        )}
      </div>
    );
  };

  const renderDays = () => {
    let daySquares = [];

    for (let i = 0; i < firstDayOffset; i++) {
      daySquares.push(<div className="day-square empty" key={'empty-' + i}></div>);
    }

    for (let i = 1; i <= numDays; i++) {
      const visibleIndex = eventIndexes[i] || 0;
      const eventList = events[i] || [];
      const visibleEvents = eventList.slice(visibleIndex, visibleIndex + maxEventsPerDay);

      daySquares.push(
        <div
          className="day-square"
          key={i}
          ref={(el) => (dayRefs.current[i] = el)}
        >
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
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '75%',
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

          {eventList.length > maxEventsPerDay && (
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
              {visibleIndex + maxEventsPerDay < eventList.length && (
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
    const eventColor = eventTypes[eventType]?.color || 'gray';

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

  if (isMobile) {
    return (
      <div className="calendar-container mobile">
<div
  className="month-header"
  style={{
    display: 'flex',
    flexWrap: 'wrap', // Allow wrapping for smaller screens
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    padding: '10px', // Add padding to prevent content from touching edges
    overflowX: 'hidden', // Prevent horizontal scrolling
    width: '100%', // Ensure the container fits within the viewport
    boxSizing: 'border-box', // Include padding in width calculation
  }}
>
  <Link to="/" style={{ flex: '0 0 auto' }}>
    <img
      src={Logo}
      alt="Logo"
      className="logo"
      style={{
        maxWidth: '100px',
        height: 'auto',
      }}
    />
  </Link>
  <div
    className="month-controls"
    style={{
      display: 'flex',
      flexWrap: 'wrap', // Allow wrapping for child elements
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
      flex: '1 1 auto', // Allow the controls to grow and shrink
    }}
  >
    <div
      className="month-name"
      style={{
        fontSize: '1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: '1 1 100%', // Take full width on smaller screens
      }}
    >
      {month} {currentYear}
    </div>
    <Button
      sx={{
        ...redButtonStyle,
        fontSize: '0.8rem',
        padding: '5px 10px',
        minWidth: '40px',
      }}
      onClick={() => changeMonth(-1)}
    >
      &lt;
    </Button>
    <Button
      sx={{
        ...redButtonStyle,
        fontSize: '0.8rem',
        padding: '5px 10px',
        minWidth: '40px',
      }}
      onClick={() => changeMonth(1)}
    >
      &gt;
    </Button>
    <Button
      variant="contained"
      sx={{
        backgroundColor: 'gray',
        color: 'white',
        textTransform: 'none',
        fontSize: '0.8rem',
        padding: '5px 10px',
        '&:hover': {
          backgroundColor: '#555',
        },
        flex: '1 1 auto', // Allow the button to grow and shrink
      }}
      startIcon={<SearchIcon />}
      onClick={() => setShowSearchModal(true)}
    >
      Filter
    </Button>
  </div>
</div>

        <div className="mobile-view-toggle">
          <Button
            size="small"
            variant={mobileView === 'week' ? 'contained' : 'outlined'}
            onClick={() => setMobileView('week')}
          >
            Week
          </Button>
          <Button
            size="small"
            variant={mobileView === 'day' ? 'contained' : 'outlined'}
            onClick={() => setMobileView('day')}
          >
            Day
          </Button>
        </div>

        {mobileView === 'week' && (
          <div className="mobile-week-controls">
            <Button size="small" onClick={prevWeek} disabled={mobileWeekStart <= 1}>
              Prev Week
            </Button>
            <Button size="small" onClick={nextWeek} disabled={mobileWeekStart + 7 > numDays}>
              Next Week
            </Button>
          </div>
        )}

        {mobileView === 'week' ? renderMobileWeek() : renderMobileDay()}

        {selectedEvent && <EventPopup event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        {showDeleteModal && (
          <DeleteConfirmationModal
            onConfirm={() => {
              // Handle delete confirmation
              setShowDeleteModal(false);
            }}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
        {showSearchModal && (
          <SearchModal
            filters={filters}
            setFilters={setFilters}
            searchText={searchText}
            setSearchText={setSearchText}
            onClose={() => setShowSearchModal(false)}
            onApply={(searchText, filters) => {
              applyFilters(searchText, filters);
              setShowSearchModal(false);
            }}
          />
        )}
      </div>
    );
  }

  // Desktop view
  return (
    <>
      <div className="calendar-container">
        <div className="month-header">
          <Link to="/">
            <img src={Logo} alt="Logo" className="logo" />
          </Link>
          <div className="month-controls">
            <div className="month-name">{month} {currentYear}</div>
            <Button sx={redButtonStyle} onClick={() => changeMonth(-1)}>&lt;</Button>
            <Button sx={redButtonStyle} onClick={() => changeMonth(1)}>&gt;</Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: 'gray',
                color: 'white',
                marginLeft: 'auto',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#555',
                },
              }}
              startIcon={<SearchIcon />}
              onClick={() => setShowSearchModal(true)}
            >
              Filter
            </Button>
          </div>
        </div>

        <div className="event-key">
          {Object.values(eventTypes).map((event, index) => (
            <Chip
              key={index}
              label={event.label}
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
        {showDeleteModal && (
          <DeleteConfirmationModal
            onConfirm={() => {
              // Handle delete confirmation
              setShowDeleteModal(false);
            }}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>

      {showSearchModal && (
        <SearchModal
          filters={filters}
          setFilters={setFilters}
          searchText={searchText}
          setSearchText={setSearchText}
          onClose={() => setShowSearchModal(false)}
          onApply={(searchText, filters) => {
            applyFilters(searchText, filters);
            setShowSearchModal(false);
          }}
        />
      )}
    </>
  );
}

export default Calendar;