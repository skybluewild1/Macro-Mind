import React, { useState } from "react";
import "./MuscleModel.css";

const MuscleModel = () => {
  const [selectedMuscle, setSelectedMuscle] = useState(null);

  const muscles = [
    //front body muscles
    { name: "Brain", x: 228, y: 105, width: 43, height: 55, info: "Brain." },
    { name: "Traps/Neck", x: 215, y: 168, width: 70, height: 15, info: "Upper back and neck." },
    { name: "Left Bicep", x: 157, y: 245, width: 25, height: 55, info: "Front of the upper arm." },
    { name: "Right Bicep", x: 317, y: 245, width: 25, height: 55, info: "Front of the upper arm." },
    { name: "Left Forearm", x: 149, y: 310, width: 20, height: 60, info: "Back of the lower arm." },
    { name: "Right Forearm", x: 330, y: 310, width: 20, height: 60, info: "Back of the lower arm." },
    { name: "Left Delts", x: 164, y: 193, width: 17, height: 47, info: "Front of the shoulder." },
    { name: "Right Delts", x: 319, y: 193, width: 17, height: 47, info: "Front of the shoulder." },
    { name: "Left Pectorial", x: 184, y: 190, width: 65, height: 65, info: "Front upper torso." },
    { name: "Right Pectorial", x: 251, y: 190, width: 65, height: 65, info: "Front upper torso." },
    { name: "Abdominal", x: 205, y: 290, width: 90, height: 80, info: "Abs." },
    { name: "Left Obliques", x: 195, y: 260, width: 33, height: 23, info: "Obliques." },
    { name: "Rigth Obliques", x: 270, y: 260, width: 33, height: 23, info: "Obliques." },
    { name: "Left Quadricep", x: 197, y: 380, width: 35, height: 130, info: "Front of upper leg." },
    { name: "Right Quadricep", x: 268, y: 380, width: 35, height: 130, info: "Front of upper leg." },
    { name: "Left Abbductor", x: 235, y: 415, width: 7, height: 70, info: "Inner upper leg." },
    { name: "Right Abbductor", x: 258, y: 415, width: 7, height: 70, info: "Inner upper leg." },
    { name: "Left Hip Flexor", x: 191, y: 415, width: 5, height: 80, info: "Outer upper leg." },
    { name: "Right Hip Flexor", x: 304, y: 415, width: 5, height: 80, info: "Outer upper leg." },
    { name: "Front Left Calf", x: 206, y: 570, width: 32, height: 50, info: "Back of lower leg." },
    { name: "Front Right Calf", x: 262, y: 570, width: 32, height: 50, info: "Back of lower leg." },
    //back body muscles 
    { name: "Brain", x: 525, y: 105, width: 44, height: 55, info: "Brain." },
    { name: "Traps/Neck", x: 513, y: 168, width: 70, height: 15, info: "Upper back and neck." },
    { name: "Upper Back", x: 480, y: 186, width: 134, height: 60, info: "Upper back torso." },
    { name: "Middle Back", x: 485, y: 247, width: 123, height: 25, info: "Middle back torso." },
    { name: "Lower Back", x: 500, y: 273, width: 93, height: 90, info: "Middle back torso." },
    { name: "Left Rear Delts", x: 462, y: 193, width: 17, height: 47, info: "Back of the shoulder." },
    { name: "Right Rear Delts", x: 615, y: 193, width: 17, height: 47, info: "Back of the shoulder." },
    { name: "Left Tricep", x: 455, y: 240, width: 23, height: 60, info: "Back of the upper arm." },
    { name: "Right Tricep", x: 615, y: 240, width: 23, height: 60, info: "Back of the upper arm." },
    { name: "Left Forearm", x: 445, y: 310, width: 20, height: 60, info: "Back of the lower arm." },
    { name: "Right Forearm", x: 628, y: 310, width: 20, height: 60, info: "Back of the lower arm." },
    { name: "Left Glute", x: 495, y: 364, width: 52, height: 59, info: "Gluteus maximus." },
    { name: "Right Glute", x: 548, y: 364, width: 51, height: 59, info: "Gluteus maximus." },
    { name: "Left Abbductor", x: 533, y: 423, width: 6, height: 80, info: "Inner upper leg." },
    { name: "Right Abbductor", x: 555, y: 423, width: 6, height: 80, info: "Inner upper leg." },
    { name: "Left Hip Flexor", x: 488, y: 415, width: 6, height: 80, info: "Outer upper leg." },
    { name: "Right Hip Flexor", x: 600, y: 415, width: 6, height: 80, info: "Outer upper leg." },
    { name: "Left Hamstring", x: 497, y: 424, width: 35, height: 100, info: "Back of upper leg." },
    { name: "Right Hamstring", x: 562, y: 424, width: 35, height: 100, info: "Back of upper leg." },
    { name: "Back Left Calf", x: 504, y: 560, width: 30, height: 65, info: "Back of lower leg." },
    { name: "Back Right Calf", x: 559, y: 560, width: 30, height: 65, info: "Back of lower leg." }
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
