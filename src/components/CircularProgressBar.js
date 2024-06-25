import React from 'react';

const CircularProgressBar = ({ percentage }) => {
  const radius = 120; // Radius of the circle
  const strokeWidth = 30; // Width of the stroke
  const normalizedRadius = radius - strokeWidth * 2; // Normalize radius for proper sizing
  const circumference = normalizedRadius * 2 * Math.PI; // Circumference of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference; // Calculate stroke dash offset based on percentage

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="circular-progress-bar"
      style={{
        filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))'
      }}
    >
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="#1df264" />
          <stop offset="20%" stopColor="#16d957" />
          <stop offset="100%" stopColor="#11bf4b" />
        </linearGradient>
      </defs>
      <circle
        stroke="white"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{
          strokeLinecap: 'round', // Smooth the circle edge
        }}
      />
      <circle
        stroke="url(#gradient)"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + ' ' + circumference}
        style={{
          strokeDashoffset,
          strokeLinecap: 'round', // Smooth the circle edge
          transition: 'stroke-dashoffset 0.5s ease'
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".34em"
        fontSize="24px"
        fill="black"
        transform={`rotate(225, ${radius}, ${radius}) translate(0, 0)`}
        className="text_circular"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

export default CircularProgressBar;
