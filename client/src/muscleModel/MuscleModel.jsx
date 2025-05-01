import React, { useState, useRef } from "react";
import { useEffect } from 'react';
import "./MuscleModel.css";

// Converts muscle coordinates to percentages
const convertToPercentages = (muscles, baseWidth = 750, baseHeight = 750) => {
  return muscles.map(muscle => ({
    ...muscle,
    x: `${((muscle.x / baseWidth) * 100).toFixed(2)}%`,
    y: `${((muscle.y / baseHeight) * 100).toFixed(2)}%`,
    width: `${((muscle.width / baseWidth) * 100).toFixed(2)}%`,
    height: `${((muscle.height / baseHeight) * 100).toFixed(2)}%`
  }));
};

const MuscleModel = () => {
  // Currently selected muscle
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  // Showing either stretching or workout options
  const [selectedOption, setSelectedOption] = useState(null);
  // Which workout type is selected
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  // Controls visibility of muscle overlays
  const [showMuscles, setShowMuscles] = useState(true);
  // Ref to scroll to workout section
  const workoutRef = useRef(null);
  // Ref to scroll to muscle info box
  const infoBoxRef = useRef(null);

  const [fetchedExercises, setFetchedExercises] = useState([]);

  useEffect(() => {
    if (selectedMuscle) {
      const group = encodeURIComponent(selectedMuscle.group); 
      const apiUrl = `http://localhost:8000/api/exercises/muscle/${group}`;
  
      console.log("Fetching from:", apiUrl);
      console.log("Fetching exercises for group:", group);
  
      fetch(apiUrl)
        .then(async res => {
          const text = await res.text();
          try {
            const json = JSON.parse(text); 
            setFetchedExercises(json);
          } catch (e) {
            console.error("Failed to parse JSON:", e);
            console.error("Raw response was:", text);
            throw new Error("Response was not valid JSON");
          }
        })
        .catch(err => {
          console.error("Error fetching exercises:", err);
        });
    }
  }, [selectedMuscle]);

  const muscles = convertToPercentages([
    //front body muscles
    { name: "Brain", x: 213, y: 95, width: 44, height: 55, side: "front", group: "Brain", description: "The brain controls voluntary muscle movements and coordinates physical activity" },
    { name: "Traps/Neck", x: 200, y: 158, width: 70, height: 15, side: "front", group: "Neck", description: "The traps and neck muscles stabilize and move the neck and shoulders, especially during lifting or shrugging." },
    { name: "Left Bicep", x: 147, y: 235, width: 23, height: 55, side: "front", group: "Bicep", description: "The bicep flexes the elbow and rotates the forearm, allowing you to lift and pull objects." },
    { name: "Right Bicep", x: 300, y: 235, width: 23, height: 55, side: "front", group: "Bicep", description: "The bicep flexes the elbow and rotates the forearm, allowing you to lift and pull objects." },
    { name: "Left Forearm", x: 138, y: 300, width: 18, height: 60, side: "front", group: "Forearm", description: "The forearm muscles control wrist and finger movement, helping you grip and rotate your hand." },
    { name: "Right Forearm", x: 314, y: 300, width: 18, height: 60, side: "front", group: "Forearm", description: "The forearm muscles control wrist and finger movement, helping you grip and rotate your hand." },
    { name: "Left Delts", x: 154, y: 183, width: 17, height: 47, side: "front", group: "Delts", description: "The front deltoid raises the arm forward and to the side, helping with pressing and lifting motions." },
    { name: "Right Delts", x: 298, y: 183, width: 17, height: 47, side: "front", group: "Delts", description: "The front deltoid raises the arm forward and to the side, helping with pressing and lifting motions." },
    { name: "Left Pectorial", x: 171, y: 179, width: 65, height: 65, side: "front", group: "Pectorals", description: "The pectoral muscle moves the arms across the chest and helps with pushing movements." },
    { name: "Right Pectorial", x: 233, y: 179, width: 65, height: 65, side: "front", group: "Pectorals", description: "The pectoral muscle moves the arms across the chest and helps with pushing movements." },
    { name: "Abdominal", x: 190, y: 267, width: 90, height: 80, side: "front", group: "Abdominal", description: "The abdominal muscles flex the torso, stabilize the core, and support breathing and posture." },
    { name: "Left Obliques", x: 181, y: 245, width: 33, height: 23, side: "front", group: "Obliques", description: "The obliques rotate and bend the torso, playing a key role in side movement and core stability." },
    { name: "Rigth Obliques", x: 255, y: 245, width: 33, height: 23, side: "front", group: "Obliques", description: "The obliques rotate and bend the torso, playing a key role in side movement and core stability." },
    { name: "Left Quadricep", x: 187, y: 365, width: 35, height: 130, side: "front", group: "Quadriceps", description: "The quadricep extends the knee and is important for walking, squatting, and jumping." },
    { name: "Right Quadricep", x: 247, y: 365, width: 35, height: 130, side: "front", group: "Quadriceps", description: "The quadricep extends the knee and is important for walking, squatting, and jumping." },
    { name: "Left Abbductor", x: 222, y: 388, width: 7, height: 70, side: "front", group: "Abbductor", description: "The adductor muscle pulls the thigh inward and helps stabilize leg movement while walking." },
    { name: "Right Abbductor", x: 242, y: 388, width: 7, height: 70, side: "front", group: "Abbductor", description: "The adductor muscle pulls the thigh inward and helps stabilize leg movement while walking." },
    { name: "Left Hip Flexor", x: 181, y: 388, width: 7, height: 85, side: "front", group: "Flexor", description: "The hip flexor lifts the thigh toward the torso and supports leg motion during running and climbing." },
    { name: "Right Hip Flexor", x: 282, y: 388, width: 7, height: 85, side: "front", group: "Flexor", description: "The hip flexor lifts the thigh toward the torso and supports leg motion during running and climbing." },
    { name: "Front Left Calf", x: 193, y: 535, width: 32, height: 50, side: "front", group: "Front Calves", description: "The calf muscle helps raise the heel and is essential for walking, running, and jumping." },
    { name: "Front Right Calf", x: 245, y: 535, width: 32, height: 50, side: "front", group: "Front Calves", description: "The calf muscle helps raise the heel and is essential for walking, running, and jumping." },
    //back body muscles 
    { name: "Brain", x: 492, y: 95, width: 44, height: 55, side: "back", group: "Brain", description: "The brain directs and regulates muscular movements and controls motor coordination." },
    { name: "Traps/Neck", x: 478, y: 158, width: 70, height: 15, side: "back", group: "Neck/Traps", description: "The traps and neck muscles elevate and stabilize the shoulders and support head movement." },
    { name: "Upper Back", x: 450, y: 173, width: 127, height: 60, side: "back", group: "Upper Back", description: "The upper back muscles pull the shoulder blades together and help maintain posture." },
    { name: "Middle Back", x: 454, y: 232, width: 122, height: 25, side: "back", group: "Mid Back", description: "The middle back supports pulling movements and helps keep the spine stable." },
    { name: "Lower Back", x: 470, y: 255, width: 88, height: 90, side: "back", group: "Lower Back", description: "The lower back muscles extend the spine and are key in bending and lifting tasks." },
    { name: "Left Rear Delts", x: 433, y: 183, width: 17, height: 47, side: "back", group: "Delts", description: "The rear deltoid moves the arm backward and outward, supporting posture and pulling motions." },
    { name: "Right Rear Delts", x: 577, y: 183, width: 17, height: 47, side: "back", group: "Delts", description: "The rear deltoid moves the arm backward and outward, supporting posture and pulling motions." },
    { name: "Left Tricep", x: 425, y: 235, width: 23, height: 60, side: "back", group: "Tricep", description: "The tricep extends the elbow and is important for pushing and straightening the arm." },
    { name: "Right Tricep", x: 579, y: 235, width: 23, height: 60, side: "back", group: "Tricep", description: "The tricep extends the elbow and is important for pushing and straightening the arm." },
    { name: "Left Forearm", x: 415, y: 300, width: 20, height: 60, side: "back", group: "Forearm", description: "The forearm muscles control wrist extension and fine motor skills like gripping." },
    { name: "Right Forearm", x: 591, y: 300, width: 20, height: 60, side: "back", group: "Forearm", description: "The forearm muscles control wrist extension and fine motor skills like gripping." },
    { name: "Left Glute", x: 462, y: 344, width: 52, height: 59, side: "back", group: "Glutes", description: "The glute extends and rotates the hip and provides power for walking, climbing, and lifting." },
    { name: "Right Glute", x: 514, y: 344, width: 51, height: 59, side: "back", group: "Glutes", description: "The glute extends and rotates the hip and provides power for walking, climbing, and lifting." },
    { name: "Left Abbductor", x: 501, y: 402, width: 6, height: 80, side: "back", group: "Abbductor", description: "The adductor draws the leg inward and helps control balance and stability while moving." },
    { name: "Right Abbductor", x: 520, y: 402, width: 6, height: 80, side: "back", group: "Abbductor", description: "The adductor draws the leg inward and helps control balance and stability while moving." },
    { name: "Left Hip Flexor", x: 458, y: 390, width: 6, height: 80, side: "back", group: "Flexor", description: "The hip flexor helps lift the leg and plays a key role in fast movements like sprinting and kicking." },
    { name: "Right Hip Flexor", x: 563, y: 390, width: 6, height: 80, side: "back", group: "Flexor", description: "The hip flexor helps lift the leg and plays a key role in fast movements like sprinting and kicking." },
    { name: "Left Hamstring", x: 465, y: 402, width: 35, height: 100, side: "back", group: "Hamstrings", description: "The hamstring bends the knee and extends the hip, crucial for running and jumping." },
    { name: "Right Hamstring", x: 526, y: 402, width: 35, height: 100, side: "back", group: "Hamstrings", description: "The hamstring bends the knee and extends the hip, crucial for running and jumping." },
    { name: "Back Left Calf", x: 472, y: 535, width: 30, height: 50, side: "back", group: "Back Calf", description: "The calf muscle helps raise the heel and is essential for walking, running, and jumping." },
    { name: "Back Right Calf", x: 525, y: 535, width: 30, height: 50, side: "back", group: "Back Calf", description: "The calf muscle helps raise the heel and is essential for walking, running, and jumping." }
  ]);

  // Handles clicking on a muscle region
  const handleMuscleClick = (muscle) => {
    // Toggle selection off if clicking the same muscle again
    setSelectedMuscle((prev) =>
      prev && prev.name === muscle.name ? null : muscle
    );
    setSelectedOption(null);
    setSelectedWorkout(null);

    // Scroll to info box after state updates
    setTimeout(() => {
      infoBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Maps workout type to YouTube video links
  // const getWorkoutVideoLink = (type) => {
  //   const links = {
  //     "Calisthenics": "https://youtu.be/xJiD2j1gRBs?si=EDVSQquozk7T_Cz0",
  //     "Machine": "https://www.youtube.com/watch?v=Xx2MAc_sMRc",
  //     "Free Weight": "https://youtu.be/FGy6JDIltx8?si=0F-JedyTwxPet3Qe",
  //     "Bands": "https://www.youtube.com/watch?v=R5MGxRSkfNc",
  //   };
  //   return links[type] || "#";
  // };

  // Render muscle info box and workout/stretching options
  const renderInfoBox = (side) => (
    <div ref={infoBoxRef} className={`muscle-info-box ${side === "front" ? "fixed-left" : "fixed-right"}`}>
      <h2 className="info-title">Muscle: {selectedMuscle.name}</h2>
      <p>Description: {selectedMuscle.description}</p>

      {/* Stretching and workout option buttons */}
      <div className="option-buttons">
        <button
          className={selectedOption == "stretching" ? "active" : ""}
          onClick={() => {
            const confirmStretch = window.confirm("Would you like to watch the stretching video on YouTube?");
            if (confirmStretch) {
              window.open("https://www.youtube.com/@MacroMind-k8o", "_blank");
            }
            setSelectedOption("stretching");
            setSelectedWorkout(null);
          }}
        >
          Stretching
        </button>
        <button
          className={selectedOption == "workouts" ? "active" : ""}
          onClick={() => {
            setSelectedOption("workouts");
            setSelectedWorkout(null);
            setTimeout(() => {
              workoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }}
        >
          Workouts
        </button>
      </div>

      {/* Workout video selector if workouts are chosen */}
      {selectedOption === "workouts" && (
        <div className="option-content" ref={workoutRef}>
          <h4>{selectedMuscle.group} Workouts – Click to view demo videos</h4>
          <ul className="exercise-list">
            {fetchedExercises.length > 0 ? (
              fetchedExercises.map((ex, idx) => (
                <li
                  key={idx}
                  onClick={() => window.open("https://www.youtube.com/@MacroMind-k8o", "_blank")}
                  style={{ cursor: "pointer" }}
                >
                  <strong>{ex.Name}</strong> – {ex.Sets}, {ex.Reps}<br />
                  <em>{ex.Description}</em>
                </li>
              ))
            ) : (
              <p>No exercises found for this muscle group.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Title */}
      <div className="muscle-heading">
        <h1>Interactive Muscle Model</h1>
      </div>

      <div className="muscle-main">
        <div className="muscle-wrapper">
          <div className="muscle-container">
            <p className="muscle-container-heading">
              Click on a muscle to explore targeted stretches and workouts.
            </p>
            <div className="image-wrapper">
              {/* Toggle button to show/hide muscle overlays */}
              <button
                className="toggle-muscle-button"
                onClick={() => setShowMuscles(!showMuscles)}
              >
                {showMuscles ? "Hide Muscles" : "Show Muscles"}
              </button>

              {/* Static anatomy image */}
              <img src="./anatomyM.png" alt="Anatomy" className="anatomy-image" />
              {/* Muscle overlays */}
              {muscles.map((muscle, index) => {
                const isHighlighted = selectedMuscle && muscle.group === selectedMuscle.group;
                return (
                  <div
                    key={`${muscle.name}-${index}`} // unique key
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
        </div>
        {/* Info box appears only if a muscle is selected */}
        {selectedMuscle && (
          <div className="info-box-container">
            {renderInfoBox(selectedMuscle.side)}
          </div>
        )}
      </div>
    </>
  );
};

export default MuscleModel;