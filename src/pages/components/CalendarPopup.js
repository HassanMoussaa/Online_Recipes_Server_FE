import React, { useState } from 'react';
import axios from 'axios';
import './CalendarPopup.css';

function CalendarPopup({ onClose, recipeId, jwtToken }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setErrorMessage('');
  };

  const handleAddToCalendar = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/meal-calendar/add',
        {
          recipe_id: recipeId,
          date: selectedDate,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      onClose();
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error('Error adding planned meal:', error);
      }
    }
  };

  return (
    <div className="calendar-popup-overlay">
      <div className="calendar-popup">
        <h3>Add to Calendar</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button onClick={handleAddToCalendar}>Add</button>
        <button onClick={onClose}>Cancel</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default CalendarPopup;
