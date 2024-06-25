import React, { useState, useEffect } from 'react';
import CircularProgressBar from './CircularProgressBar';
import CircularProgressBar1 from './CircularProgressBar1';
import { task } from '../api'; // Assuming task is a function that fetches task data by name

const Topnav = ({ taskName }) => {
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const data = await task(taskName);
        setTaskData(data);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();

    const intervalId = setInterval(fetchTaskData, 5000); // Fetch new data every 5 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [taskName]);

  if (!taskData) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  const { name, dateOfRecording, endDate, completedUnits, units } = taskData;

  // Calculate left units
  const leftUnits = Math.abs(units - completedUnits);

  // Format dates
  const startDate = new Date(dateOfRecording);
  const endDateFormatted = new Date(endDate);
  const currentDate = new Date();

  // Calculate days difference
  const totalDays = Math.ceil((endDateFormatted.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const leftDays = Math.ceil((endDateFormatted.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate time elapsed percentage
  const elapsedTimePercentage = ((currentDate.getTime() - startDate.getTime()) / (endDateFormatted.getTime() - startDate.getTime())) * 100;

  return (
    <div className="navbar">
      <span className='fixedDate'>{startDate.toLocaleDateString()}</span>
      <div className="leftBlock">
        <div className="leftTop">
          {name}
        </div>
        <div className="leftBottom">
          <div className="leftp1">
            <CircularProgressBar percentage={Math.floor((completedUnits / units) * 100)} />
          </div>
          <div className="leftp2">
            <CircularProgressBar1 percentage={Math.floor(elapsedTimePercentage)} />
          </div>
        </div>
      </div>
      <div className="rightBlock">
        <div className="rightday">
          {leftDays} Days
        </div>
        <div className="rightunits">
          {leftUnits} Units
        </div>
      </div>
    </div>
  );
};

export default Topnav;
