// src/pages/EditActivities.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditActivities() {
  const navigate = useNavigate();

  // all activities for this user
  const [activities, setActivities] = useState([]);
  // currently selected activity ID
  const [selectedId, setSelectedId] = useState('');
  // form fields
  const [formData, setFormData] = useState({
    activityType:        '',
    activityDate:        '',
    slideshowStartDate:  '',
    slideshowEndDate:    '',
    activityName:        '',
    activityDesc:        '',
    calendarDayOfWeek:   '',
    calendarFrequency:   '',
    calendarTimeOfDay:   '',
  });

  // fetch once on mount
  useEffect(() => {
    fetch('http://localhost:8500/api/events', { credentials: 'include' })
      .then(r => r.json())
      .then(setActivities)
      .catch(console.error);
  }, []);

  // when you pick a different activity, load its data
  useEffect(() => {
    if (!selectedId) return;
    const act = activities.find(a => String(a.id) === selectedId);
    if (!act) return;
    setFormData({
      activityType:        act.activityType        || '',
      activityDate:        act.activityDate?.slice(0,10)       || '',
      slideshowStartDate:  act.slideshowStartDate?.slice(0,10) || '',
      slideshowEndDate:    act.slideshowEndDate?.slice(0,10)   || '',
      activityName:        act.activityName        || '',
      activityDesc:        act.activityDesc        || '',
      calendarDayOfWeek:   act.calendarDayOfWeek   || '',
      calendarFrequency:   act.calendarFrequency   || '',
      calendarTimeOfDay:   act.calendarTimeOfDay   || '',
    });
  }, [selectedId, activities]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleUpdate = async e => {
    e.preventDefault();
    if (!selectedId) return alert('Pick an activity first');
    try {
      const res = await fetch(
        `http://localhost:8500/api/updateActivity/${selectedId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      if (res.ok) {
        alert('Activity updated!');
        navigate('/');
      } else {
        alert('Error updating');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating');
    }
  };

  const handleDelete = async () => {
    if (!selectedId || !window.confirm('Really delete?')) return;
    try {
      const res = await fetch(
        `http://localhost:8500/api/deleteActivity/${selectedId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
      if (res.ok) {
        alert('Deleted!');
        navigate('/');
      } else {
        alert('Error deleting');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Edit Activity</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Select one:
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            style={{ marginLeft: 8 }}
          >
            <option value="">-- pick --</option>
            {activities.map(a => (
              <option key={a.id} value={a.id}>
                {a.activityName} ({a.activityDate?.slice(0,10)})
              </option>
            ))}
          </select>
        </label>
      </div>

      <form onSubmit={handleUpdate} style={styles.formGrid}>
        {/* Activity Information */}
        <div style={styles.section}>
          <h3 style={styles.sectionHeader}>Activity Information</h3>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Activity type:</label>
            <div style={styles.radioGroup}>
              {['School Sports','Club Meetings','School Events'].map(t => (
                <label key={t} style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="activityType"
                    value={t}
                    checked={formData.activityType === t}
                    onChange={handleChange}
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>
          <div style={styles.fieldGroup}>
  <label htmlFor="activityName" style={styles.label}>Activity Name:</label>
  <input
    type="text"
    id="activityName"
    name="activityName"
    style={styles.input}
    value={formData.activityName}
    onChange={handleChange}
  />
</div>
<div style={styles.fieldGroup}>
  <label htmlFor="activityDesc" style={styles.label}>Description:</label>
  <textarea
    id="activityDesc"
    name="activityDesc"
    style={{ ...styles.input, height: 60 }}
    value={formData.activityDesc}
    onChange={handleChange}
  />
</div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Description:</label>
            <textarea
              name="activityDesc"
              style={{ ...styles.input, height: 60 }}
              value={formData.activityDesc}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Slideshow Settings */}
        <div style={styles.section}>
          <h3 style={styles.sectionHeader}>Slideshow Settings</h3>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Start Date:</label>
            <input
              type="date"
              name="slideshowStartDate"
              style={styles.input}
              value={formData.slideshowStartDate}
              onChange={handleChange}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>End Date:</label>
            <input
              type="date"
              name="slideshowEndDate"
              style={styles.input}
              value={formData.slideshowEndDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Calendar Settings */}
        <div style={styles.section}>
          <h3 style={styles.sectionHeader}>Calendar Settings</h3>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Day of Week:</label>
            <select
              name="calendarDayOfWeek"
              style={styles.input}
              value={formData.calendarDayOfWeek}
              onChange={handleChange}
            >
              <option value="">--</option>
              {['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
                .map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Frequency:</label>
            <select
              name="calendarFrequency"
              style={styles.input}
              value={formData.calendarFrequency}
              onChange={handleChange}
            >
              <option value="">--</option>
              {['One-Time','Weekly','Biweekly','Monthly']
                .map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Time of Day:</label>
            <select
              name="calendarTimeOfDay"
              style={styles.input}
              value={formData.calendarTimeOfDay}
              onChange={handleChange}
            >
              <option value="">--</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div style={styles.buttonRow}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            style={styles.cancelButton}
          >
            Delete
          </button>
          <button type="submit" style={styles.submitButton}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

// reuse exactly the same styles as ActivitiesForm
const styles = {
  container: {
    maxWidth: '95%',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
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
  fieldGroup: { marginBottom: '0.8rem' },
  label:      { display: 'block', fontWeight: 600, marginBottom: '4px' },
  input:      { width: '100%', padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' },
  radioGroup: { display: 'flex', gap: '10px' },
  radioLabel: { display: 'flex', alignItems: 'center', gap: '4px' },
  buttonRow:  {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10
  },
  cancelButton: {
    padding: '8px 12px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
  submitButton: {
    padding: '8px 12px',
    backgroundColor: '#d0382d',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
};

export default EditActivities;