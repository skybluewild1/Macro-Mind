import React, { useState, useEffect } from "react";
import "./Motivation.css";

const breathingPatterns = {
  box: {
    name: "Box Breathing",
    steps: ["Breathe In…", "Hold…", "Breathe Out…", "Hold…"],
    durations: [4000, 4000, 4000, 4000],
  },
  fourSevenEight: {
    name: "4-7-8 Technique",
    steps: ["Breathe In…", "Hold…", "Breathe Out…"],
    durations: [4000, 7000, 8000],
  },
  focus: {
    name: "Focus Booster",
    steps: ["Breathe In…", "Breathe Out…"],
    durations: [5000, 5000],
  },
  calm: {
    name: "Calm & Sleep",
    steps: ["Breathe In…", "Breathe Out…"],
    durations: [4000, 6000],
  },
};

const Motivation = () => {
  // Breathing state & logic
  const [patternKey, setPatternKey] = useState(null);
  const [phase, setPhase] = useState("Select a technique below");
  const [isBreathing, setIsBreathing] = useState(false);
  const [circleSize, setCircleSize] = useState("normal");

  useEffect(() => {
    let timeout;
    if (isBreathing && patternKey) {
      const pattern = breathingPatterns[patternKey];
      let index = 0;

      const loop = () => {
        setPhase(pattern.steps[index]);
        if (pattern.steps[index].includes("In")) {
          setCircleSize("expand");
        } else if (pattern.steps[index].includes("Out")) {
          setCircleSize("shrink");
        } else {
          setCircleSize("hold");
        }

        timeout = setTimeout(() => {
          index = (index + 1) % pattern.steps.length;
          loop();
        }, pattern.durations[index]);
      };

      loop();
    }
    return () => clearTimeout(timeout);
  }, [isBreathing, patternKey]);

  const startBreathing = (key) => {
    setPatternKey(key);
    setIsBreathing(true);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setPhase("Select a technique below");
    setCircleSize("normal");
  };

  // Mood Selector
  const [moodResponse, setMoodResponse] = useState(null);
  const emojiAffirmations = {
    "😊": "Keep that positive energy flowing! 💛",
    "😐": "Neutral days are okay. Stay steady 🌿",
    "😢": "You are not alone — you're stronger than you think. 💙",
    "😠": "Deep breaths. Let it go. You’ve got this. 🔥",
  };

  // Affirmation Generator
  const [affirmation, setAffirmation] = useState("");
  const affirmations = [
    "I am capable and calm.",
    "I trust myself to get through anything.",
    "I am proud of how far I’ve come.",
    "Every breath I take is a step toward peace.",
    "Challenges help me grow stronger.",
    "I am worthy of happiness and peace.",
    "I choose to let go of what no longer serves me.",
    "I am resilient, strong, and brave.",
    "I can achieve anything I set my mind to.",
    "I embrace change and welcome growth.",
    "I am enough, just as I am.",
    "I deserve love, compassion, and respect.",
    "I believe in my ability to overcome any obstacle.",
    "I greet each day with gratitude.",
    "I am confident in who I am becoming.",
  ];
  const generateAffirmation = () => {
    const random =
      affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(random);
  };

  // Mindfulness Timer (existing)
  const [mindfulnessStarted, setMindfulnessStarted] = useState(false);
  const [countdown, setCountdown] = useState(60);
  useEffect(() => {
    let timer;
    if (mindfulnessStarted && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setMindfulnessStarted(false);
      setCountdown(60);
    }
    return () => clearTimeout(timer);
  }, [mindfulnessStarted, countdown]);
  const startMindfulness = () => {
    setMindfulnessStarted(true);
    setCountdown(60);
  };

  // Pomodoro Timer with Slider (New Feature)
  const [pomodoroStarted, setPomodoroStarted] = useState(false);
  const [pomodoroCountdown, setPomodoroCountdown] = useState(25 * 60);
  const [customPomodoroDuration, setCustomPomodoroDuration] = useState(25);
  useEffect(() => {
    let timer;
    if (pomodoroStarted && pomodoroCountdown > 0) {
      timer = setTimeout(
        () => setPomodoroCountdown(pomodoroCountdown - 1),
        1000
      );
    } else if (pomodoroCountdown === 0) {
      setPomodoroStarted(false);
      setPomodoroCountdown(customPomodoroDuration * 60);
    }
    return () => clearTimeout(timer);
  }, [pomodoroStarted, pomodoroCountdown, customPomodoroDuration]);
  const startPomodoro = () => {
    setPomodoroStarted(true);
    setPomodoroCountdown(customPomodoroDuration * 60);
  };
  const stopPomodoro = () => {
    setPomodoroStarted(false);
    setPomodoroCountdown(customPomodoroDuration * 60);
  };
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Sound Playback
  const [audio] = useState(new Audio());
  const playSound = (type) => {
    let src = "";
    if (type === "rain") src = "/sounds/rain.mp3";
    if (type === "waves") src = "/sounds/waves.mp3";
    if (type === "forest") src = "/sounds/forest.mp3";
    if (src) {
      audio.src = src;
      audio.loop = true;
      audio.play();
    }
  };
  const stopSound = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <div className="motivation-container">
      <h1 className="motivation-title">
        Stay Motivated, Keep Pushing Forward!
      </h1>
      <p className="motivation-text">
        Success is the sum of small efforts repeated day in and day out. Keep
        chasing your goals, and remember to celebrate small victories along the
        way.
      </p>
      <ul className="motivation-list">
        <li>Set clear goals and take action daily.</li>
        <li>Embrace challenges as opportunities to grow.</li>
        <li>Believe in yourself and your potential.</li>
      </ul>

      {/* 2-Column Layout (desktop) */}
      <div className="main-layout">
        {/* Left Column: Breathing Widget and Relaxing Sounds */}
        <div className="left-column">
          {/* Breathing Widget */}
          <section className="wellness-widget breathing-widget">
            <h2>Breathing Exercise</h2>
            <div className={`breathing-circle ${circleSize}`}>
              <p className="breathing-phase-inside">{phase}</p>
            </div>
            <div className="breathing-buttons">
              {Object.keys(breathingPatterns).map((key) => (
                <button
                  key={key}
                  onClick={() => startBreathing(key)}
                  className="start-btn"
                >
                  {breathingPatterns[key].name}
                </button>
              ))}
              <button onClick={stopBreathing} className="stop-btn">
                Stop
              </button>
            </div>
          </section>

          {/* Relaxing Sounds Widget moved under Breathing */}
          <section className="wellness-widget">
            <h2>Relaxing Sounds</h2>
            <div className="sound-buttons">
              <button onClick={() => playSound("rain")}>Rain 🌧️</button>
              <button onClick={() => playSound("waves")}>Ocean 🌊</button>
              <button onClick={() => playSound("forest")}>Forest 🌲</button>
              <button onClick={stopSound} className="stop-btn">
                Stop
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Other Widgets */}
        <div className="other-widgets-column">
          {/* Mood Selector */}
          <section className="wellness-widget">
            <h2>How are you feeling today?</h2>
            <div className="mood-options">
              {["😊", "😐", "😢", "😠"].map((emoji, idx) => (
                <button
                  key={idx}
                  className="mood-btn"
                  onClick={() => setMoodResponse(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
            {moodResponse && (
              <p className="mood-message">
                {emojiAffirmations[moodResponse] || "You're doing great!"}
              </p>
            )}
          </section>

          {/* Affirmation Generator */}
          <section className="wellness-widget">
            <h2>Need a Boost?</h2>
            <button className="affirm-btn" onClick={generateAffirmation}>
              Show Affirmation
            </button>
            {affirmation && <p className="affirm-text">{affirmation}</p>}
          </section>

          {/* Mindfulness Timer */}
          <section className="wellness-widget">
            <h2>1-Minute Mental Break</h2>
            {!mindfulnessStarted ? (
              <button className="mindfulness-btn" onClick={startMindfulness}>
                Start Timer
              </button>
            ) : (
              <p className="mindfulness-timer">{countdown} seconds remaining</p>
            )}
          </section>

          {/* Pomodoro Timer with Slider */}
          <section className="wellness-widget">
            <h2>Pomodoro Timer</h2>
            <div className="pomodoro-slider">
              <label htmlFor="pomodoro-duration">
                Set Duration: {customPomodoroDuration} minutes
              </label>
              <input
                type="range"
                id="pomodoro-duration"
                min="10"
                max="60"
                value={customPomodoroDuration}
                onChange={(e) => {
                  const newDuration = Number(e.target.value);
                  setCustomPomodoroDuration(newDuration);
                  if (!pomodoroStarted) {
                    setPomodoroCountdown(newDuration * 60);
                  }
                }}
              />
            </div>
            {!pomodoroStarted ? (
              <button className="mindfulness-btn" onClick={startPomodoro}>
                Start Pomodoro ({customPomodoroDuration} mins)
              </button>
            ) : (
              <>
                <p className="mindfulness-timer">
                  {formatTime(pomodoroCountdown)} remaining
                </p>
                <button className="stop-btn" onClick={stopPomodoro}>
                  Stop Pomodoro
                </button>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Motivation;
