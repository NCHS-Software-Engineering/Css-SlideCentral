// src/pages/Calendar.js
import '../styles/calendarStyles.css';
import { useState, useEffect } from 'react';
import { Button, useMediaQuery, useTheme } from '@mui/material';

const redButtonStyle = {
  backgroundColor: 'red',
  color: '#fff',
  textTransform: 'none',
  transition: 'transform 0.3s, background-color 0.3s',
  whiteSpace: 'nowrap',
  fontSize: { xs: '0.875rem', md: '0.75rem' },
  '&:hover': { backgroundColor: '#b71c1c', transform: 'scale(1.05)' },
};

function Calendar() {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear,  setCurrentYear]  = useState(today.getFullYear());

  const [events, setEvents]             = useState({});
  const [eventIndexes, setEventIndexes] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ─── MOBILE DETECTION + PAGINATION STATE ────────────────────────────
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const maxEventsPerDay = isMobile ? 1 : 3;

  // Week-view pages in chunks of 7 days
  const [mobileView, setMobileView]           = useState('week');  // 'week' | 'day'
  const [mobileWeekStart, setMobileWeekStart] = useState(1);
  const prevWeek = () => setMobileWeekStart(w => Math.max(1, w - 7));
  const nextWeek = () => setMobileWeekStart(w => (w + 7 <= numDays ? w + 7 : w));

  // Day-view pages one day at a time
  const [mobileSelectedDay, setMobileSelectedDay] = useState(1);
  const prevDay = () => setMobileSelectedDay(d => Math.max(1, d - 1));
  const nextDay = () => setMobileSelectedDay(d => Math.min(numDays, d + 1));

  // ─── FETCH & GROUP EVENTS ─────────────────────────────────────────────
  useEffect(() => {
    fetch('http://localhost:8500/api/events')
      .then(r => r.json())
      .then(data => {
        const grouped = {};
        const m = currentMonth, y = currentYear;
        data.forEach(evt => {
          const start = new Date(evt.startDate),
                end   = new Date(evt.endDate),
                freq  = evt.calendarFrequency?.toLowerCase(),
                dow   = evt.calendarDayOfWeek?.toLowerCase(),
                d0    = start.getDate();

          const add = d => {
            if (d.getMonth()!==m || d.getFullYear()!==y) return;
            const day = d.getDate();
            grouped[day] = grouped[day]||[];
            grouped[day].push({ ...evt, displayDate: new Date(d) });
          };

          if (freq === 'one-time') {
            add(start);
          } else if (freq === 'weekly' || freq === 'biweekly') {
            const interval = freq==='weekly'?7:14;
            let first = new Date(start);
            while (
              first.toLocaleString('en-US',{weekday:'long'}).toLowerCase()
              !== dow
            ) {
              first.setDate(first.getDate()+1);
            }
            for (let d=new Date(first); d<=end; d.setDate(d.getDate()+interval)) {
              add(new Date(d));
            }
          } else if (freq==='monthly') {
            for (let d=new Date(start); d<=end; d.setMonth(d.getMonth()+1)) {
              const dd = new Date(d);
              dd.setDate(d0);
              add(dd);
            }
          }
        });
        setEvents(grouped);
      })
      .catch(console.error);
  }, [currentMonth, currentYear]);

  // ─── MONTH + GRID SETUP ───────────────────────────────────────────────
  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  const month = monthNames[currentMonth];
  const numDays = new Date(currentYear, currentMonth+1, 0).getDate();
  const firstDayOffset = new Date(currentYear, currentMonth, 1).getDay();

  // Reset mobile pagers when month changes
  const changeMonth = offset => {
    setEventIndexes({});
    setMobileView('week');
    setMobileWeekStart(1);
    setMobileSelectedDay(1);
    const d = new Date(currentYear, currentMonth+offset);
    setCurrentMonth(d.getMonth());
    setCurrentYear(d.getFullYear());
  };

  const eventTypes = {
    'school sports': { color:'green',  label:'School Sports' },
    'club meetings': { color:'red',    label:'Club Meeting' },
    'school events': { color:'blue',   label:'School Event' },
    'workshop':      { color:'orange', label:'Workshop' },
    'meetup':        { color:'purple', label:'Meetup' },
  };

  // Desktop pagination (unchanged)
  const goForward = day =>
    setEventIndexes(p => ({
      ...p,
      [day]: Math.min((p[day]||0)+maxEventsPerDay, (events[day]?.length||0)-1)
    }));
  const goBack = day =>
    setEventIndexes(p => ({
      ...p,
      [day]: Math.max((p[day]||0)-maxEventsPerDay, 0)
    }));

  // ─── MOBILE RENDERS ────────────────────────────────────────────────────
  const renderMobileWeek = () => {
    const start = mobileWeekStart;
    const end = Math.min(start+6, numDays);
    return Array.from({length: end-start+1}, (_,i) => {
      const day = start+i;
      const list = events[day]||[];
      const weekday = days[new Date(currentYear,currentMonth,day).getDay()];
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
          {list.length>0 ? list.map((evt,idx) => (
            <div
              key={idx}
              className="mobile-event-block"
              style={{
                borderLeft:`4px solid ${
                  eventTypes[evt.activityType.toLowerCase()]?.color
                }`
              }}
              onClick={()=>setSelectedEvent(evt)}
            >
              <div className="mobile-event-time">
                {evt.calendarTimeOfDay||'All day'}
              </div>
              <div className="mobile-event-title">
                {evt.activityName}
              </div>
            </div>
          )) : (
            <div className="mobile-no-events">No events</div>
          )}
        </div>
      );
    });
  };

  const renderMobileDay = () => {
    const day = mobileSelectedDay;
    const list = events[day]||[];
    const weekday = days[new Date(currentYear,currentMonth,day).getDay()];
    return (
      <div className="mobile-day-section">
        <div
          className="mobile-day-header back-to-week"
          onClick={()=>setMobileView('week')}
        >
          ← Week view
        </div>
        <div className="mobile-day-header">{`${weekday} ${month} ${day}`}</div>
        <div className="mobile-day-controls">
          <Button size="small" onClick={prevDay} disabled={day<=1}>Prev Day</Button>
          <Button size="small" onClick={nextDay} disabled={day>=numDays}>Next Day</Button>
        </div>
        {list.length>0 ? list.map((evt,idx) => (
          <div
            key={idx}
            className="mobile-event-block"
            style={{
              borderLeft:`4px solid ${
                eventTypes[evt.activityType.toLowerCase()]?.color
              }`
            }}
            onClick={()=>setSelectedEvent(evt)}
          >
            <div className="mobile-event-time">
              {evt.calendarTimeOfDay||'All day'}
            </div>
            <div className="mobile-event-title">
              {evt.activityName}
            </div>
          </div>
        )) : (
          <div className="mobile-no-events">No events</div>
        )}
      </div>
    );
  };

  // Popup (unchanged)
  const EventPopup = ({event,onClose}) => {
    if(!event) return null;
    return (
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={e=>e.stopPropagation()}>
          <h2>{event.activityName}</h2>
          <p><strong>Time:</strong> {event.calendarTimeOfDay||'TBD'}</p>
          <p><strong>Description:</strong> {event.activityDesc||'No description available.'}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

  // ─── RENDER ─────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="calendar-container mobile">
        <div className="month-header">
          <div className="logo">CSS</div>
          <div className="month-controls">
            <div className="month-name">{month} {currentYear}</div>
            <Button style={redButtonStyle} onClick={()=>changeMonth(-1)}>‹</Button>
            <Button style={redButtonStyle} onClick={()=>changeMonth(1)}>›</Button>
          </div>
        </div>

        <div className="mobile-view-toggle">
          <Button
            size="small"
            variant={mobileView==='week'?'contained':'outlined'}
            onClick={()=>setMobileView('week')}
          >Week</Button>
          <Button
            size="small"
            variant={mobileView==='day'?'contained':'outlined'}
            onClick={()=>setMobileView('day')}
          >Day</Button>
        </div>

        {mobileView==='week' && (
          <div className="mobile-week-controls">
            <Button size="small" onClick={prevWeek} disabled={mobileWeekStart<=1}>
              Prev Week
            </Button>
            <Button size="small" onClick={nextWeek} disabled={mobileWeekStart+7>numDays}>
              Next Week
            </Button>
          </div>
        )}

        {mobileView==='week' ? renderMobileWeek() : renderMobileDay()}

        {selectedEvent && (
          <EventPopup event={selectedEvent} onClose={()=>setSelectedEvent(null)} />
        )}
      </div>
    );
  }

  // ─── DESKTOP GRID VIEW (exactly as before) ─────────────────────────────
  const renderDays = () => {
    const squares = [];
    for(let i=0;i<firstDayOffset;i++){
      squares.push(<div className="day-square empty" key={'e'+i}/>);
    }
    for(let d=1;d<=numDays;d++){
      const idx = eventIndexes[d]||0;
      const list = events[d]||[];
      const slice = list.slice(idx, idx+maxEventsPerDay);
      squares.push(
        <div className="day-square" key={d}>
          <div className="day-number">{d}</div>
          {slice.map((evt,i)=> {
            const t = eventTypes[evt.activityType.toLowerCase()]||{};
            return (
              <div
                key={i}
                className="event-label"
                style={{ backgroundColor: t.color }}
                onClick={()=>setSelectedEvent(evt)}
              >{evt.activityName||t.label}</div>
            );
          })}
          {list.length>maxEventsPerDay && (
            <div className="event-pagination">
              {idx>0 && <button onClick={()=>goBack(d)}>⬅</button>}
              {idx+maxEventsPerDay<list.length &&
               <button onClick={()=>goForward(d)}>➡</button>}
            </div>
          )}
        </div>
      );
    }
    return squares;
  };

  return (
    <div className="calendar-container">
      <div className="month-header">
        <div className="logo">CSS</div>
        <div className="month-controls">
          <div className="month-name">{month} {currentYear}</div>
          <Button style={redButtonStyle} onClick={()=>changeMonth(-1)}>‹</Button>
          <Button style={redButtonStyle} onClick={()=>changeMonth(1)}>›</Button>
        </div>
      </div>

      <div className="event-key">
        {Object.values(eventTypes).map((e,i)=>(
          <div key={i} className="event-key-item" style={{backgroundColor:e.color}}>
            <span className="event-key-color" style={{backgroundColor:e.color}}/>
            {e.label}
          </div>
        ))}
      </div>

      <div className="days-grid">
        {days.map((d,i)=><div className="day-name" key={i}>{d}</div>)}
        {renderDays()}
      </div>

      {selectedEvent && (
        <EventPopup event={selectedEvent} onClose={()=>setSelectedEvent(null)} />
      )}
    </div>
  );
}

export default Calendar;
