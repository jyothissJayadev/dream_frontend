import React, { useState, useEffect } from 'react';
import Individual from './Individual';
import Add from './Add';
import { gettasks } from '../api';
import CircularProgressBar from './CircularProgressBar';

const Task = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksData = await gettasks(); // Assuming gettasks returns an array of tasks
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className='container task1 '>
      <h1  className='top_task'>Today is the youngest you will ever be</h1>

      <div className="row">
          {/* Display the list of projects */}
          {tasks.map((task, index) => (
        <Individual
          key={index}
          id={task._id}
          task={task}
        />
      ))}
           <Add />

        </div>
     
 
    </div>
  );
};

export default Task;
