import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './MeetingSchedulerPage.css';

const MeetingSchedulerPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    startTime: '',
    duration: 30,
    date: selectedDate
  });
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setMeetingDetails({ ...meetingDetails, date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails({ ...meetingDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingDetails),
      });
      if (response.ok) {
        const data = await response.json(); // Get the response data to access the generated ID
        alert(`Meeting scheduled successfully! Meeting Code: ${data.id}`); // Show the meeting code
        console.log('Meeting Details:', meetingDetails);
      } else {
        console.error('Failed to save meeting:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving meeting:', error);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const goBack = () => {
    navigate('/dashboard'); // Navigate to Dashboard
  };

  return (
    <div className="meeting-scheduler-container">
      <div className="back-arrow" onClick={goBack} style={{ cursor: 'pointer', marginBottom: '20px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6v12z" />
        </svg>
      </div>

      <h2>Welcome!</h2>
      <p>
        Book your appointment in a few simple steps: Choose a service, pick your date and time, and fill in your details. See you soon!
      </p>

      <div className="scheduler-wrapper">
        <div className="calendar-section">
          <h3>Select Date</h3>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date()}
            className="transparent-calendar"
          />
        </div>

        <div className="details-section">
          <h3>Meeting Details</h3>
          <div className="service-info">
            <h4>Service</h4>
            <p>Comprehensive sales support session to address your needs and drive your business forward.</p>
          </div>

          <div className="time-fixing">
            <h4>Fix Your Time</h4>
            <input
              type="time"
              name="startTime"
              value={meetingDetails.startTime}
              onChange={handleInputChange}
              required
              min={getCurrentTime()}
            />
          </div>

          <form onSubmit={handleSubmit} className="meeting-form">
            <div className="form-group">
              <label>Meeting Title</label>
              <input
                type="text"
                name="title"
                value={meetingDetails.title}
                onChange={handleInputChange}
                placeholder="Enter meeting title"
                required
              />
            </div>

            <div className="form-group">
              <label>Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={meetingDetails.duration}
                onChange={handleInputChange}
                min="15"
                step="15"
                required
              />
            </div>

            <button type="submit">Confirm Meeting</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MeetingSchedulerPage;
