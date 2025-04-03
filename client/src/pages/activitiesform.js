// src/pages/ActivitiesForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ActivitiesForm() {
  const navigate = useNavigate();

  // State for each form field
  const [activityType, setActivityType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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

    // Basic validation checks
    if (!startDate || !endDate) {
      alert('Please select both a start and end date.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert('Start date cannot be after end date.');
      return;
    }

    // TODO: Add your logic to process form data here (e.g., send to an API or store in state management).
    console.log({
      activityType,
      startDate,
      endDate,
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
    maxWidth: '800px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'sans-serif',
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '1.8rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  radioGroup: {
    display: 'flex',
    gap: '15px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '1rem',
  },
  uploadButton: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '1rem',
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
