import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "bootstrap/dist/css/bootstrap.min.css";
import CircularProgressBar2 from './CircularProgressBar2';

const Individual = ({ task, id }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/view/${id}`);
  }
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const variants = {
    hidden: { y: "1vw", opacity: 0.2 },
    visible: { y: 0, opacity: 1 },
  };

  var percent=(task.completedUnits/task.units )*100
  console.log(percent)

  const { name, dateOfRecording, endDate, completedUnits, units } = task;

  // Calculate left units
  const leftUnits = Math.abs(units - completedUnits);

  // Format dates
  const startDate = new Date(dateOfRecording);
  const endDateFormatted = new Date(endDate);

  // Calculate days difference
  const leftDays = Math.ceil((endDateFormatted.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className='projectLink col-12 col-lg-6'>
      <motion.div
        ref={ref}
        className="motion"
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onClick={handleClick}
      >
        <div
          className="projectCard  p-5"
          onClick={() => {}}
        >
         <div className='textContent'>
          <div className='top'>
            {name}
          </div>
          <div className='bottom'>
          {leftDays} Days
          </div>
         </div>
        <div className='progressbar'>
        <CircularProgressBar2 percentage={Math.floor(percent)}/>
        </div>
        </div>

      </motion.div>
      </div>
  
  );
};
//  ({ id,index, name, endDate, startDate }) => {


//   return (
//     <div>
//       <button onClick={handleClick}>
//         <h3>Task {index + 1}</h3>
//         <p>Name: {name}</p>
//         <p>Start Date: {startDate}</p>
//         <p>End Date: {endDate}</p>
//       </button>
//     </div>
//   );
// }

export default Individual;
