import React, { useState } from "react";
import "./MuscleModel.css";

const MuscleModel = () => {
  const [selectedMuscle, setSelectedMuscle] = useState(null);

  const muscles = [
    { name: "Biceps", x: 150, y: 350, width: 40, height: 40, info: "Front of the upper arm." },
    { name: "Triceps", x: 450, y: 340, width: 30, height: 60, info: "Back of the upper arm." },
    // Add more muscles as needed
  ];

  const handleMuscleClick = (muscle) => {
    setSelectedMuscle(muscle);
  };

  return (
    <div className="muscle-container">
      <h1>Interactive Muscle Model</h1>
      {/* Display your anatomy image */}
      <div className="image-wrapper">
        <img src="/anatomyM.png" alt="Anatomy" className="anatomy-image" />
        {/* Add clickable regions */}
        {muscles.map((muscle) => (
          <div
            key={muscle.name}
            className="muscle-region"
            style={{
              left: muscle.x,
              top: muscle.y,
              width: muscle.width,
              height: muscle.height,
            }}
            onClick={() => handleMuscleClick(muscle)}
          ></div>
        ))}
      </div>
      {/* Display muscle info when clicked */}
      {selectedMuscle && (
        <div className="muscle-info">
          <h3>{selectedMuscle.name}</h3>
          <p>{selectedMuscle.info}</p>
        </div>
      )}
    </div>
  );
};

export default MuscleModel;
