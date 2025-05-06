// src/pages/Calendar.js
import '../styles/calendarStyles.css';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

const redButtonStyle = {
  backgroundColor: 'red',
  color: '#fff',
  textTransform: 'none',
  transition: 'transform 0.3s, background-color 0.3s',
  whiteSpace: 'nowrap',
  fontSize: { xs: '0.875rem', md: '0.75rem' },
  '&:hover': {
    backgroundColor: '#b71c1c',
    transform: 'scale(1.05)',
  },
};

function Calendar() {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear,  setCurrentYear]  = useState(today.getFullYear());

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  const month          = monthNames[currentMonth];
  const numDays        = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOffset = new Date(currentYear, currentMonth, 1).getDay();

  const [events,        setEvents]        = useState({});
  const [eventIndexes,  setEventIndexes]  = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventTypes = {
    'school sports': { color:'green',  label:'School Sports' },
    'club meetings': { color:'red',    label:'Club Meeting'  },
    'school events': { color:'blue',   label:'School Event'  },
    'workshop':      { color:'orange', label:'Workshop'      },
    'meetup':        { color:'purple', label:'Meetup'        },
  };

  // fetch only this user's one-time events
  useEffect(() => {
    fetch('http://localhost:8500/api/events', {
      credentials: 'include'
    })
      .then(r => r.json())
      .then(data => {
        const grouped = {};
        data.forEach(ev => {
          // only use activityDate now
          const d = new Date(ev.activityDate);
          if (d.getMonth() !== currentMonth || d.getFullYear() !== currentYear) {
            return;
          }
          const day = d.getDate();
          grouped[day] = grouped[day] || [];
          grouped[day].push(ev);
        });
        setEvents(grouped);
      })
      .catch(console.error);
  }, [currentMonth, currentYear]);

  const changeMonth = offset => {
    setEventIndexes({});
    const d = new Date(currentYear, currentMonth + offset);
    setCurrentMonth(d.getMonth());
    setCurrentYear(d.getFullYear());
  };

  const goBack = day => {
    setEventIndexes(prev => ({
      ...prev,
      [day]: Math.max((prev[day] || 0) - 1, 0)
    }));
  };
  const goForward = day => {
    setEventIndexes(prev => ({
      ...prev,
      [day]: Math.min((prev[day] || 0) + 1, (events[day]?.length||1) - 1)
    }));
  };

  const renderDays = () => {
    const squares = [];

    // leading blanks
    for (let i = 0; i < firstDayOffset; i++) {
      squares.push(<div key={`e${i}`} className="day-square empty" />);
    }

    // actual days
    for (let dayNum = 1; dayNum <= numDays; dayNum++) {
      const list = events[dayNum] || [];
      const idx  = eventIndexes[dayNum] || 0;

      squares.push(
        <div key={dayNum} className="day-square">
          <div className="day-number">{dayNum}</div>

          {list.slice(idx, idx + 1).map((ev, i) => {
            const type = eventTypes[ev.activityType.toLowerCase()] || {};
            return (
              <div
                key={i}
                className="event-label"
                style={{ backgroundColor: type.color }}
                onClick={() => setSelectedEvent(ev)}
              >
                {ev.activityName || type.label}
              </div>
            );
          })}

          {list.length > 1 && (
            <div className="event-pagination">
              {idx > 0 && <button onClick={() => goBack(dayNum)}>⬅</button>}
              {idx + 1 < list.length && (
                <button onClick={() => goForward(dayNum)}>➡</button>
              )}
            </div>
          )}
        </div>
      );
    }

    return squares;
  };

  const EventPopup = ({ event, onClose }) => {
    if (!event) return null;
    return (
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={e => e.stopPropagation()}>
          <h2>{event.activityName}</h2>
          <p><strong>Time:</strong> {event.calendarTimeOfDay || 'TBD'}</p>
          <p><strong>Description:</strong> {event.activityDesc || ''}</p>
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
          <div className="month-controls">
            <div className="month-name">{month} {currentYear}</div>
            <Button style={redButtonStyle} onClick={() => changeMonth(-1)}>
              &lt;
            </Button>
            <Button style={redButtonStyle} onClick={() => changeMonth(1)}>
              &gt;
            </Button>
          </div>
        </div>

        <div className="event-key">
          {Object.values(eventTypes).map((et,i)=>(
            <div key={i} className="event-key-item" style={{backgroundColor:et.color}}>
              <span className="event-key-color" style={{backgroundColor:et.color}}/>
              {et.label}
            </div>
          ))}
        </div>

        <div className="days-grid">
          {days.map((d,i)=><div key={i} className="day-name">{d}</div>)}
          {renderDays()}
        </div>
      </div>

      {selectedEvent && (
        <EventPopup event={selectedEvent} onClose={()=>setSelectedEvent(null)} />
      )}
    </>
  );
}

export default Calendar;