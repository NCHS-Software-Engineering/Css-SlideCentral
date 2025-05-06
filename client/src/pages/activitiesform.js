import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ActivitiesForm() {
  const navigate = useNavigate();

  // State for Activity Details
  const [activityType, setActivityType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activityName, setActivityName] = useState('');
  const [activityDesc, setActivityDesc] = useState('');
  const [image, setImage] = useState(null);

  // State for Calendar Settings
  const [calendarDayOfWeek, setCalendarDayOfWeek] = useState('');
  const [calendarFrequency, setCalendarFrequency] = useState('');
  const [calendarTimeOfDay, setCalendarTimeOfDay] = useState('');

  // Handle file upload (for slideshow image)
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!startDate || !endDate) {
      alert('Please select both a start and end date.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert('Start date cannot be after end date.');
      return;
    }

    // Build payload matching database columns
    const formData = {
      activityType,
      activityDate:       startDate,         // required NOT NULL
      slideshowStartDate: startDate,         // optional slideshow start
      slideshowEndDate:   endDate,           // required slideshow end
      activityName,
      activityDesc,
      calendarDayOfWeek,
      calendarFrequency,
      calendarTimeOfDay,
      image: image ? { name: image.name } : null,
    };

    try {
      const response = await fetch('http://localhost:8500/api/addActivity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Activity submitted!');
        navigate('/');
      } else {
        alert('Error submitting activity');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error submitting activity');
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Enter Activity</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.twoColumn}>
          {/* Left Column: Activity Details */}
          <div style={styles.leftColumn}>
            <h3 style={styles.sectionHeader}>Activity Details</h3>

            {/* Activity Type */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Activity type:</label>
              <div style={styles.radioGroup}>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="activityType"
                    value="School Sports"
                    checked={activityType === 'School Sports'}
                    onChange={(e) => setActivityType(e.target.value)}
                  />
                  School Sports
                </label>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="activityType"
                    value="Club Meetings"
                    checked={activityType === 'Club Meetings'}
                    onChange={(e) => setActivityType(e.target.value)}
                  />
                  Club Meetings
                </label>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="activityType"
                    value="School Events"
                    checked={activityType === 'School Events'}
                    onChange={(e) => setActivityType(e.target.value)}
                  />
                  School Events
                </label>
              </div>
            </div>

            {/* Start Date */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* End Date */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Activity Name */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Activity Name:</label>
              <input
                type="text"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                style={styles.input}
                placeholder="e.g. Soccer Practice"
              />
            </div>

            {/* Activity Description */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Activity Desc:</label>
              <textarea
                value={activityDesc}
                onChange={(e) => setActivityDesc(e.target.value)}
                style={{ ...styles.input, height: '60px' }}
                placeholder="Describe the activity..."
              />
            </div>
          </div>

          {/* Right Column: Calendar & Slideshow */}
          <div style={styles.rightColumn}>
            <h3 style={styles.sectionHeader}>Calendar Settings</h3>

            {/* Day of the Week */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Day of the Week:</label>
              <select
                value={calendarDayOfWeek}
                onChange={(e) => setCalendarDayOfWeek(e.target.value)}
                style={styles.input}
              >
                <option value="">--Select Day--</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>

            {/* Frequency */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Frequency:</label>
              <select
                value={calendarFrequency}
                onChange={(e) => setCalendarFrequency(e.target.value)}
                style={styles.input}
              >
                <option value="">--Select Frequency--</option>
                <option value="One-Time">One-Time</option>
                <option value="Weekly">Weekly</option>
                <option value="Biweekly">Biweekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            {/* Time of Day */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Time of Day:</label>
              <select
                value={calendarTimeOfDay}
                onChange={(e) => setCalendarTimeOfDay(e.target.value)}
                style={styles.input}
              >
                <option value="">--Select Time--</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
              </select>
            </div>

            <h3 style={styles.sectionHeader}>Slideshow Settings</h3>
            {/* Slideshow Image */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>(Optional) Slideshow Image:</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="file-upload" style={styles.uploadButton}>
                  File Upload
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={styles.buttonContainer}>
          <button type="button" onClick={handleCancel} style={styles.cancelButton}>
            Cancel
          </button>
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'sans-serif',
  },
  header: {
    marginBottom: '15px',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  twoColumn: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  sectionHeader: {
    fontSize: '1.2rem',
    margin: '0 0 5px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '5px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '0.95rem',
  },
  input: {
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '0.9rem',
  },
  radioGroup: {
    display: 'flex',
    gap: '10px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.9rem',
  },
  uploadButton: {
    padding: '6px 10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  submitButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default ActivitiesForm;
