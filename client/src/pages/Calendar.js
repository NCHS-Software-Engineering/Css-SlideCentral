
import '../styles/calendarStyles.css';
 
 function Calendar() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = 'February';
    const numDays = 31; // Example for February
    const firstDayOffset = 5; 

    const events = {
        6: { label: 'Tennis Practice', color: 'green' },
        9: { label: 'CS Club', color: 'red' },
        13: { label: '7th Period Assembly', color: 'blue' },
    };

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
                </div>
            );
        }

        return daySquares;
    };

     return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
            <div className="calendar-container">
                <div className="month-header">
                    <div className="logo">CSS</div>
                    <div className="month-name">{month}</div>
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
            </div>
        </>
    );

}
export default Calendar;