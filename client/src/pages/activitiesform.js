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
            style={{ ...styles.input, height: '80px' }}
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

// Inline styles
const styles = {
  container: {
    maxWidth: '800px',        // <-- Increased width
    margin: '50px auto',      // <-- Adjust margin to suit your needs
    padding: '30px',          // <-- Increased padding for a bigger feel
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'sans-serif',
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '1.8rem',       // <-- Larger font for the heading
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',              // <-- Increase the gap for spacing
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',         // <-- Increase label font size
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',         // <-- Increase input font size
  },
  radioGroup: {
    display: 'flex',
    gap: '15px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '1rem',         // <-- Increase radio label font size
  },
  uploadButton: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '1rem',         // <-- Increase button font size
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    padding: '12px 18px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  submitButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '12px 18px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default ActivitiesForm;