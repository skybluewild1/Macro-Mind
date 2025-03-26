import React, { useState } from "react";
import "./MuscleModel.css";

const MuscleModel = () => {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showMuscles, setShowMuscles] = useState(true);

  const muscles = [
    //front body muscles
    { name: "Brain", x: 228, y: 105, width: 43, height: 55, info: "Brain.", side: "front", group: "Brain", description: "The brain controls voluntary muscle movements and coordinates physical activity" },
    { name: "Traps/Neck", x: 215, y: 168, width: 70, height: 15, info: "Upper back and neck.", side:"front", group: "Neck", description: "The traps and neck muscles stabilize and move the neck and shoulders, especially during lifting or shrugging." },
    { name: "Left Bicep", x: 157, y: 245, width: 25, height: 55, info: "Front of the upper arm.", side:"front", group: "Bicep", description: "The bicep flexes the elbow and rotates the forearm, allowing you to lift and pull objects."  },
    { name: "Right Bicep", x: 317, y: 245, width: 25, height: 55, info: "Front of the upper arm.", side:"front", group: "Bicep", description: "The bicep flexes the elbow and rotates the forearm, allowing you to lift and pull objects."  },
    { name: "Left Forearm", x: 149, y: 310, width: 20, height: 60, info: "Back of the lower arm.", side:"front", group: "Forearm", description: "The forearm muscles control wrist and finger movement, helping you grip and rotate your hand."  },
    { name: "Right Forearm", x: 330, y: 310, width: 20, height: 60, info: "Back of the lower arm.", side:"front", group: "Forearm", description: "The forearm muscles control wrist and finger movement, helping you grip and rotate your hand."  },
    { name: "Left Delts", x: 164, y: 193, width: 17, height: 47, info: "Front of the shoulder.", side:"front", group: "Frontdelt", description: "The front deltoid raises the arm forward and to the side, helping with pressing and lifting motions."  },
    { name: "Right Delts", x: 319, y: 193, width: 17, height: 47, info: "Front of the shoulder.", side:"front", group: "Frontdelt", description: "The front deltoid raises the arm forward and to the side, helping with pressing and lifting motions."  },
    { name: "Left Pectorial", x: 184, y: 190, width: 65, height: 65, info: "Front upper torso.", side:"front", group: "Chest", description: "The pectoral muscle moves the arms across the chest and helps with pushing movements."  },
    { name: "Right Pectorial", x: 251, y: 190, width: 65, height: 65, info: "Front upper torso.", side:"front", group: "Chest", description: "The pectoral muscle moves the arms across the chest and helps with pushing movements."  },
    { name: "Abdominal", x: 205, y: 290, width: 90, height: 80, info: "Abs.", side:"front", group: "abs", description: "The abdominal muscles flex the torso, stabilize the core, and support breathing and posture."  },
    { name: "Left Obliques", x: 195, y: 260, width: 33, height: 23, info: "Obliques.", side:"front", group: "Obliques", description: "The obliques rotate and bend the torso, playing a key role in side movement and core stability."  },
    { name: "Rigth Obliques", x: 270, y: 260, width: 33, height: 23, info: "Obliques.", side:"front", group: "Obliques", description: "The obliques rotate and bend the torso, playing a key role in side movement and core stability."  },
    { name: "Left Quadricep", x: 197, y: 380, width: 35, height: 130, info: "Front of upper leg.", side:"front", group: "Quadricep", description: "The quadricep extends the knee and is important for walking, squatting, and jumping."  },
    { name: "Right Quadricep", x: 268, y: 380, width: 35, height: 130, info: "Front of upper leg.", side:"front", group: "Quadricep", description: "The quadricep extends the knee and is important for walking, squatting, and jumping."  },
    { name: "Left Abbductor", x: 235, y: 415, width: 7, height: 70, info: "Inner upper leg.", side:"front", group: "Abbductor", description: "The adductor muscle pulls the thigh inward and helps stabilize leg movement while walking."  },
    { name: "Right Abbductor", x: 258, y: 415, width: 7, height: 70, info: "Inner upper leg.", side:"front", group: "Abbductor", description: "The adductor muscle pulls the thigh inward and helps stabilize leg movement while walking."  },
    { name: "Left Hip Flexor", x: 191, y: 415, width: 5, height: 80, info: "Outer upper leg.", side:"front", group: "Flexor", description: "The hip flexor lifts the thigh toward the torso and supports leg motion during running and climbing."  },
    { name: "Right Hip Flexor", x: 304, y: 415, width: 5, height: 80, info: "Outer upper leg.", side:"front", group: "Flexor", description: "The hip flexor lifts the thigh toward the torso and supports leg motion during running and climbing."  },
    { name: "Front Left Calf", x: 206, y: 570, width: 32, height: 50, info: "Back of lower leg.", side:"front", group: "Calf", description: "The calf muscle helps raise the heel and is essential for walking, running, and jumping."  },
    { name: "Front Right Calf", x: 262, y: 570, width: 32, height: 50, info: "Back of lower leg.", side:"front", group: "Calf", description: "The calf muscle helps raise the heel and is essential for walking, running, and jumping."  },
    //back body muscles 
    { name: "Brain", x: 525, y: 105, width: 44, height: 55, info: "Brain.", side: "back", group: "Brain", description: "The brain directs and regulates muscular movements and controls motor coordination."  },
    { name: "Traps/Neck", x: 513, y: 168, width: 70, height: 15, info: "Upper back and neck.", side:"back", group: "Neck/Traps", description: "The traps and neck muscles elevate and stabilize the shoulders and support head movement."  },
    { name: "Upper Back", x: 480, y: 186, width: 134, height: 60, info: "Upper back torso.", side:"back", group: "Upper Back", description: "The upper back muscles pull the shoulder blades together and help maintain posture."  },
    { name: "Middle Back", x: 485, y: 247, width: 123, height: 25, info: "Middle back torso.", side:"back", group: "Mid Back", description: "The middle back supports pulling movements and helps keep the spine stable."  },
    { name: "Lower Back", x: 500, y: 273, width: 93, height: 90, info: "Middle back torso.", side:"back", group: "Lower Back", description: "The lower back muscles extend the spine and are key in bending and lifting tasks."  },
    { name: "Left Rear Delts", x: 462, y: 193, width: 17, height: 47, info: "Back of the shoulder.", side:"back", group: "Reardelt", description: "The rear deltoid moves the arm backward and outward, supporting posture and pulling motions."  },
    { name: "Right Rear Delts", x: 615, y: 193, width: 17, height: 47, info: "Back of the shoulder.", side:"back", group: "Reardelt", description: "The rear deltoid moves the arm backward and outward, supporting posture and pulling motions."  },
    { name: "Left Tricep", x: 455, y: 240, width: 23, height: 60, info: "Back of the upper arm.", side:"back", group: "Tricep", description: "The tricep extends the elbow and is important for pushing and straightening the arm."  },
    { name: "Right Tricep", x: 615, y: 240, width: 23, height: 60, info: "Back of the upper arm.", side:"back", group: "Tricep", description: "The tricep extends the elbow and is important for pushing and straightening the arm."  },
    { name: "Left Forearm", x: 445, y: 310, width: 20, height: 60, info: "Back of the lower arm.", side:"back", group: "Forearm", description: "The forearm muscles control wrist extension and fine motor skills like gripping."  },
    { name: "Right Forearm", x: 628, y: 310, width: 20, height: 60, info: "Back of the lower arm.", side:"back", group: "Forearm", description: "The forearm muscles control wrist extension and fine motor skills like gripping."  },
    { name: "Left Glute", x: 495, y: 364, width: 52, height: 59, info: "Gluteus maximus.", side:"back", group: "Glute", description: "The glute extends and rotates the hip and provides power for walking, climbing, and lifting."  },
    { name: "Right Glute", x: 548, y: 364, width: 51, height: 59, info: "Gluteus maximus.", side:"back", group: "Glute", description: "The glute extends and rotates the hip and provides power for walking, climbing, and lifting."  },
    { name: "Left Abbductor", x: 533, y: 423, width: 6, height: 80, info: "Inner upper leg.", side:"back", group: "Abbductor", description: "The adductor draws the leg inward and helps control balance and stability while moving."  },
    { name: "Right Abbductor", x: 555, y: 423, width: 6, height: 80, info: "Inner upper leg.", side:"back", group: "Abbductor", description: "The adductor draws the leg inward and helps control balance and stability while moving."  },
    { name: "Left Hip Flexor", x: 488, y: 415, width: 6, height: 80, info: "Outer upper leg.", side:"back", group: "Flexor", description: "The hip flexor helps lift the leg and plays a key role in fast movements like sprinting and kicking."  },
    { name: "Right Hip Flexor", x: 600, y: 415, width: 6, height: 80, info: "Outer upper leg.", side:"back", group: "Flexor", description: "The hip flexor helps lift the leg and plays a key role in fast movements like sprinting and kicking."  },
    { name: "Left Hamstring", x: 497, y: 424, width: 35, height: 100, info: "Back of upper leg.", side:"back", group: "Hamstring", description: "The hamstring bends the knee and extends the hip, crucial for running and jumping."  },
    { name: "Right Hamstring", x: 562, y: 424, width: 35, height: 100, info: "Back of upper leg.", side:"back", group: "Hamstring", description: "The hamstring bends the knee and extends the hip, crucial for running and jumping."  },
    { name: "Back Left Calf", x: 504, y: 560, width: 30, height: 65, info: "Back of lower leg.", side:"back", group: "Calf", description: "The calf muscle helps raise the heel and is essential for walking, running, and jumping."  },
    { name: "Back Right Calf", x: 559, y: 560, width: 30, height: 65, info: "Back of lower leg.", side:"back", group: "Calf", description: "The calf muscle helps raise the heel and is essential for walking, running, and jumping." }
    // Add more muscles as needed
  ];

  const handleMuscleClick = (muscle) => {
    setSelectedMuscle((prev) =>
      prev && prev.name === muscle.name ? null : muscle
    );
    setSelectedOption(null);
    setSelectedWorkout(null);
  };

  const getWorkoutVideoLink = (type) => {
    const links = {
      "Calisthenics": "https://youtu.be/xJiD2j1gRBs?si=EDVSQquozk7T_Cz0",
      "Machine": "https://www.youtube.com/watch?v=Xx2MAc_sMRc",
      "Free Weight": "https://youtu.be/FGy6JDIltx8?si=0F-JedyTwxPet3Qe",
      "Bands": "https://www.youtube.com/watch?v=R5MGxRSkfNc",
    };
  
    return links[type] || "#";
  };
  

  const renderInfoBox = (side) => (
    <div className={`muscle-info-box ${side === "front" ? "fixed-left" : "fixed-right"}`}>
      <h2 className="info-title">Muscle: {selectedMuscle.name}</h2>
      <p>Location: {selectedMuscle.info}</p>
      <p>Description: {selectedMuscle.description}</p>

      <div className="option-buttons">
      <button
        className={selectedOption === "stretching" ? "active" : ""}
        onClick={() => {
          const confirmStretch = window.confirm(
            "Would you like to watch the stretching video on YouTube?"
          );
          if (confirmStretch) {
            window.open(
              "https://www.youtube.com/@MacroMind-k8o",
              "_blank"
            );
          }
          setSelectedOption("stretching");
          setSelectedWorkout(null);
        }}
        >
          Stretching
        </button>
        <button
          className={selectedOption === "workouts" ? "active" : ""}
          onClick={() => {
            setSelectedOption("workouts");
            setSelectedWorkout(null);
          }}
        >
          Workouts
        </button>
      </div>

      {selectedOption === "workouts" && (
        <div className="option-content">
          <p>Select a workout style:</p>
          <div className="workout-buttons">
            {["Calisthenics", "Machine", "Free Weight", "Banded"].map((type) => (
              <button
                key={type}
                className={selectedWorkout === type ? "active" : ""}
                onClick={() => {
                  const confirmed = window.confirm(
                    `Would you like to watch the ${type} workout video on YouTube?`
                  );
                  if (confirmed) {
                    const link = getWorkoutVideoLink(type);
                    window.open(link, "_blank"); 
                  }
                  setSelectedWorkout(type); 
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="muscle-heading">
        <h1>Interactive Muscle Model</h1>
      </div>

      <div className="muscle-wrapper">
        {selectedMuscle?.side === "front" && renderInfoBox("front")}

        <div className="muscle-container">
          <div className="image-wrapper">
            <button
              className="toggle-muscle-button"
              onClick={() => setShowMuscles(!showMuscles)}
            >
              {showMuscles ? "Hide Muscles" : "Show Muscles"}
            </button>

            <img src="/anatomyM.png" alt="Anatomy" className="anatomy-image" />

            {muscles.map((muscle) => {
              const isHighlighted =
                selectedMuscle && muscle.group === selectedMuscle.group;

              return (
                <div
                  key={muscle.name}
                  className={`muscle-region 
                    ${isHighlighted ? "highlighted" : ""} 
                    ${!showMuscles ? "transparent-mode" : ""}`}
                  style={{
                    left: muscle.x,
                    top: muscle.y,
                    width: muscle.width,
                    height: muscle.height,
                  }}
                  onClick={() => handleMuscleClick(muscle)}
                />
              );
            })}
          </div>
        </div>

        {selectedMuscle?.side === "back" && renderInfoBox("back")}
      </div>
    </>
  );
};

export default MuscleModel;