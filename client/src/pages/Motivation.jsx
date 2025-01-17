// Motivation.jsx
import React from "react";
import "./Motivation.css";

const Motivation = () => {
  return (
    <div className="motivation-container">
      <h1 className="motivation-title">Stay Motivated, Keep Pushing Forward!</h1>
      <p className="motivation-text">
        Success is the sum of small efforts repeated day in and day out. Keep chasing your goals, and remember to celebrate small victories along the way.
      </p>
      <ul className="motivation-list">
        <li>Set clear goals and take action daily.</li>
        <li>Embrace challenges as opportunities to grow.</li>
        <li>Believe in yourself and your potential.</li>
      </ul>
      <button className="motivation-button">Get Inspired</button>
    </div>
  );
};

export default Motivation;
