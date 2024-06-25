import React, { useState } from 'react';
import DetailAdd from './DetailAdd';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "bootstrap/dist/css/bootstrap.min.css";

const Add = () => {
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const variants = {
    hidden: { y: "1vw", opacity: 0.2 },
    visible: { y: 0, opacity: 1 },
  };

  return (

    <div className='projectLink col-12 col-lg-6'>
      <motion.div
        ref={ref}
        className="motion"
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onClick={toggleDetail}
      >
        <div
          className="projectCard d-flex align-items-center justify-content-center p-5"
          onClick={() => {}}
        >
Add

        </div>

      </motion.div>
      {showDetail && <DetailAdd onClose={toggleDetail} />}
      </div>


   
  );
}

export default Add;
