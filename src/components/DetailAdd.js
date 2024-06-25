import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addtask } from '../api'; // Import addtask from your API file

const DetailAdd = ({ onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [units, setUnits] = useState('');
  const [date, setDate] = useState(null);

  const onSubmit = async () => {
    try {
      if (!taskName || !units || !date) {
        alert('All fields are mandatory');
        return;
      }

      const selectedDate = new Date(date);

      // Format the date into dd/mm/yyyy format
      const formattedDate = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;
      console.log('Formatted Date:', formattedDate);

      const values = {
        name: taskName,
        units,
        endDate: formattedDate
      };

      const response = await addtask(values); // Assuming addtask is an async function
      console.log('Task added:', response); // Log the response from the API call

      // Optionally handle success (e.g., show success message)
      onClose(); // Close the modal or perform any other action upon successful submission

    } catch (error) {
      console.error('Error adding task:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="detail-add-overlay">
      <div className="detail-add-container">
        <button className="close-button" onClick={onClose}>Close</button>
        <div className='innerContent'>
          <div className="input_element">
            <label htmlFor="taskName">Enter the Task Name</label>
            <input
              type="text"
              id="taskName"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>

          <div className="input_element">
            <label htmlFor="units">Number of Units</label>
            <input
              type="number"
              id="units"
              placeholder="Units to Complete"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
            />
          </div>

          <div className="input_element">
            <label htmlFor="date">Pick the Date</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Pick the Date"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  className='color-white'
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <button className="submit_button" onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default DetailAdd;