import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Topnav from './Topnav';
import { task, editProgress, deleteTask } from '../api';
import trikSound from './tick.mp3';
import completionVideo from './vdo.mp4'; // Ensure you have the video file in your project

const View = () => {
  const { index } = useParams();
  const [taskData, setTaskData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedAll, setCompletedAll] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await task(index);
        setTaskData(data);
        setActiveIndex(data.completedUnits || 0);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };
    fetchData();
  }, [index]);

  const handleNext = async () => {
    if (activeIndex < taskData.units) {
      const newActiveIndex = activeIndex + 1;
      setActiveIndex(newActiveIndex);

      try {
        const { _id } = taskData;
        const updatedTask = await editProgress(_id, newActiveIndex);
        console.log('Progress updated:', updatedTask);

        const audio = new Audio(trikSound);
        audio.play();

        checkCompletion(newActiveIndex);
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  const checkCompletion = (currentIndex) => {
    if (currentIndex === taskData.units) {
      setCompletedAll(true);
      setShowVideo(true); // Show the video
    }
  };

  const handleVideoEnd = () => {
    setShowVideo(false); // Hide the video when it finishes
  };

  useEffect(() => {
    if (showVideo) {
      videoRef.current.play().catch(error => console.error('Error playing video:', error));
    }
  }, [showVideo]);

  const deletetask = async () => {
    try {
      const { _id } = taskData;
      const response = await deleteTask(_id);
      console.log(response);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete task:', error.message);
    }
  };

  return (
    <div className='view'>
      {taskData ? (
        <>
          <Topnav taskName={taskData._id} />
          <div className="progress-container">
            {[...Array(taskData.units)].map((_, i) => (
              <div
                key={i}
                className={`progress-step ${i < activeIndex ? 'active' : ''}`}
              >
                {i + 1}
                {i < activeIndex && (
                  <>
                    {/* <div className="water-droplet droplet1"></div> */}
                    <div className="water-droplet droplet2"></div>
                    <div className="water-droplet droplet3"></div>
                    <div className="water-droplet droplet4"></div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="buttons">
            <button
              className='next_button'
              onClick={handleNext}
              disabled={activeIndex === taskData.units}
            >
              Next
            </button>
          </div>
          {completedAll && showVideo && (
            <div className="video-container">
              <video ref={videoRef} onEnded={handleVideoEnd} className="completion-video">
                <source src={completionVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </>
      ) : (
        <p>Loading task data...</p>
      )}
      <button className='delete' onClick={deletetask}>Delete</button>
    </div>
  );
};

export default View;
