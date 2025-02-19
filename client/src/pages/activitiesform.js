// src/pages/activitiesform.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ActivitiesForm() {
  const navigate = useNavigate();

  // State for each form field
  const [activityType, setActivityType] = useState('');
  const [scheduleDay, setScheduleDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [activityName, setActivityName] = useState('');
  const [activityDesc, setActivityDesc] = useState('');
  const [image, setImage] = useState(null);

  // Handle file upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your logic to process form data here, e.g., send to an API or store in state management.
    console.log({
      activityType,
      scheduleDay,
      startTime,
      endTime,
      activityName,
      activityDesc,
      image,
    });
    // Navigate away or clear the form if needed
    alert('Activity submitted!');
    navigate('/');
  };

  // Handle cancel (e.g., navigate back to home)
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Enter Activity</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
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
                value="Club meetings"
                checked={activityType === 'Club meetings'}
                onChange={(e) => setActivityType(e.target.value)}
              />
              Club meetings
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="activityType"
                value="School meetings"
                checked={activityType === 'School meetings'}
                onChange={(e) => setActivityType(e.target.value)}
              />
              School meetings
            </label>
          </div>
        </div>

        {/* Schedule Day */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Schedule Day:</label>
          <input
            type="text"
            value={scheduleDay}
            onChange={(e) => setScheduleDay(e.target.value)}
            style={styles.input}
            placeholder="e.g. Monday"
          />
        </div>

        {/* Start - End Time */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Start - End Time:</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Start"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="End"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={styles.input}
            />
          </div>
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

        {/* Optional Image */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>(Optional) Image:</label>
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

// Inline styles (optional; you can move them to a CSS file if you prefer)
const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'sans-serif',
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  radioGroup: {
    display: 'flex',
    gap: '15px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  uploadButton: {
    padding: '8px 12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  submitButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ActivitiesForm;
