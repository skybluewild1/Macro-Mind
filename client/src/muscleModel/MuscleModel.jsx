import React, { useState } from "react";
import "./MuscleModel.css";

const MuscleModel = () => {
  const [selectedMuscle, setSelectedMuscle] = useState(null);

  const muscles = [
    { name: "Brain", x: 215, y: 80, width: 70, height: 80, info: "Brain." },
    { name: "Biceps", x: 155, y: 245, width: 29, height: 50, info: "Front of the upper arm." },
    { name: "Triceps", x: 455, y: 240, width: 25, height: 60, info: "Back of the upper arm." },
    { name: "Forearms", x: 145, y: 310, width: 35, height: 90, info: "Back of the upper arm." },
    { name: "Shoulders", x: 155, y: 180, width: 30, height: 45, info: "Back of the upper arm." },
    { name: "Chest", x: 190, y: 200, width: 120, height: 55, info: "Front upper torso." },
    { name: "Abdominal", x: 200, y: 290, width: 100, height: 80, info: "Abs." },
    { name: "Obliques", x: 190, y: 260, width: 120, height: 25, info: "Obliques." },
    { name: "Back", x: 485, y: 170, width: 120, height: 180, info: "Back of the torso." },
    { name: "Quadriceps", x: 190, y: 380, width: 120, height: 140, info: "Front of upper leg." },
    { name: "Hamstrings", x: 487, y: 430, width: 120, height: 100, info: "Back of upper leg." },
    { name: "Glutes", x: 487, y: 360, width: 120, height: 60, info: "Gluteus maximus." },
    { name: "Calves", x: 490, y: 560, width: 110, height: 70, info: "Back of lower leg." }
    // Add more muscles as needed
  ];

  const handleMuscleClick = (muscle) => {
    setSelectedMuscle(muscle);
  };

  return (
    <div className="muscle-container">
      <h1></h1>
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
