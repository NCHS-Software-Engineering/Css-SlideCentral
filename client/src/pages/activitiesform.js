// src/pages/ActivitiesForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ActivitiesForm({ originalStartDate = '' }) {
  const navigate = useNavigate();

  // detect mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Activity Information
  const [activityType, setActivityType]           = useState('');
  const [activityDate, setActivityDate]           = useState('');
  const [activityName, setActivityName]           = useState('');
  const [activityDesc, setActivityDesc]           = useState('');

  // Slideshow Settings
  const [slideshowStartDate, setSlideshowStartDate] = useState('');
  const [slideshowEndDate, setSlideshowEndDate]   = useState('');
  const [image, setImage]                         = useState(null);

  // Calendar Settings
  const [calendarDayOfWeek, setCalendarDayOfWeek] = useState('');
  const [calendarFrequency, setCalendarFrequency] = useState('');
  const [calendarTimeOfDay, setCalendarTimeOfDay] = useState('');

  // if you pass an originalStartDate in via props
  useEffect(() => {
    setActivityDate(originalStartDate);
  }, [originalStartDate]);

  const handleFileChange = e => {
    if (e.target.files?.[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // simple slideshow date validation
    if (!slideshowStartDate || !slideshowEndDate) {
      return alert('Please select both slideshow start and end dates.');
    }
    if (new Date(slideshowStartDate) > new Date(slideshowEndDate)) {
      return alert('Slideshow start date cannot be after slideshow end date.');
    }

    const formData = {
      activityType,
      activityDate,
      slideshowStartDate,
      slideshowEndDate,
      activityName,
      activityDesc,
      calendarDayOfWeek,
      calendarFrequency,
      calendarTimeOfDay,
      image: image ? { name: image.name } : null,
    };

    try {
      const res = await fetch('/api/addActivity', {
        method: 'POST',
        credentials: 'include',              // send session cookie
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);
      alert('Activity submitted!');
      navigate('/');
    } catch (err) {
      console.error('Submit error:', err);
      alert('Error submitting activity');
    }
  };

  const handleCancel = () => navigate('/');

  const formLayout = isMobile
    ? { display: 'flex', flexDirection: 'column', gap: '20px' }
    : styles.formGrid;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Enter Activity</h2>
      <form onSubmit={handleSubmit} style={formLayout}>

        {/* Activity Information */}
        <div style={styles.section}>
          <h3 style={styles.sectionHeader}>Activity Information</h3>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Activity type:</label>
            <div style={styles.radioGroup}>
              {['School Sports','Club Meetings','School Events'].map(type => (
                <label key={type} style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="activityType"
                    value={type}
                    checked={activityType === type}
                    onChange={e => setActivityType(e.target.value)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Activity Date:</label>
            <input
              type="date"
              value={activityDate}
              onChange={e => setActivityDate(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Activity Name:</label>
            <input
              type="text"
              value={activityName}
              onChange={e => setActivityName(e.target.value)}
              placeholder="e.g. Soccer Practice"
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Activity Description:</label>
            <textarea
              value={activityDesc}
              onChange={e => setActivityDesc(e.target.value)}
              placeholder="Describe the activity..."
              style={{ ...styles.input, height: '60px', resize: 'vertical' }}
            />
          </div>
        </div>

        {/* Slideshow Settings */}
        <div style={styles.section}>
          <h3 style={styles.sectionHeader}>Slideshow Settings</h3>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Slideshow Start Date:</label>
            <input
              type="date"
              value={slideshowStartDate}
              onChange={e => setSlideshowStartDate(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Slideshow End Date:</label>
            <input
              type="date"
              value={slideshowEndDate}
              onChange={e => setSlideshowEndDate(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>(Optional) Slideshow Image:</label>
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

        {/* Calendar Settings */}
        <div style={styles.section}>
          <h3 style={styles.sectionHeader}>Calendar Settings</h3>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Day of the Week:</label>
            <select
              value={calendarDayOfWeek}
              onChange={e => setCalendarDayOfWeek(e.target.value)}
              style={styles.input}
            >
              <option value="">--Select Day--</option>
              {['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
                .map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Frequency:</label>
            <select
              value={calendarFrequency}
              onChange={e => setCalendarFrequency(e.target.value)}
              style={styles.input}
            >
              <option value="">--Select Frequency--</option>
              {['One-Time','Weekly','Biweekly','Monthly']
                .map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Time of Day:</label>
            <select
              value={calendarTimeOfDay}
              onChange={e => setCalendarTimeOfDay(e.target.value)}
              style={styles.input}
            >
              <option value="">--Select Time--</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div style={styles.buttonRow}>
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
    maxWidth: '95%',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
  },
  header: {
    textAlign: 'center',
    fontSize: '1.6rem',
    marginBottom: '1rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '20px',
    alignItems: 'start',
  },
  section: {
    padding: '10px',
    border: '1px solid #eee',
    borderRadius: '4px',
  },
  sectionHeader: {
    fontSize: '1.1rem',
    marginBottom: '0.8rem',
    borderBottom: '1px solid #ddd',
    paddingBottom: '4px',
  },
  fieldGroup: {
    marginBottom: '0.8rem',
  },
  label: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '4px',
  },
  input: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '6px 8px',
    fontSize: '0.9rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
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
    backgroundColor: '#39853c',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    display: 'inline-block',
  },
  buttonRow: {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  cancelButton: {
    padding: '8px 12px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  submitButton: {
    padding: '8px 12px',
    backgroundColor: '#d0382d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ActivitiesForm;