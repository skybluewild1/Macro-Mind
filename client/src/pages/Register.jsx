import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Adjust the path to your actual logo location
import logo from "../images/MacroMind.jpg";

import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    sex: "",
    weight: "",
    height: "",
    workoutStyle: [],
    goals: [],
    equipment: [],
    level: "",
    diet: [],
    activity: "",
  });

  const handleCheckboxChange = (e, field) => {
    const value = e.target.value;
    if (e.target.checked) {
      setData((prevData) => ({
        ...prevData,
        [field]: [...prevData[field], value],
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [field]: prevData[field].filter((item) => item !== value),
      }));
    }
  };

  const RegisteredUser = async (e) => {
    e.preventDefault();
    const {
      username,
      email,
      password,
      age,
      sex,
      weight,
      height,
      workoutStyle,
      goals,
      equipment,
      level,
      diet,
      activity,
    } = data;
    try {
      const response = await axios.post("/register", {
        username,
        email,
        password,
        age,
        sex,
        weight,
        height,
        workoutStyle,
        goals,
        equipment,
        level,
        diet,
        activity,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          username: "",
          email: "",
          password: "",
          age: "",
          sex: "",
          weight: "",
          height: "",
          workoutStyle: [],
          goals: [],
          equipment: [],
          level: "",
          diet: [],
          activity: "",
        });
        toast.success("Registration successful. Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while registering.");
    }
  };

  const workoutOptions = [
    "Calisthenics",
    "Resistance Training",
    "HIIT",
    "Running",
    "Weight Training",
    "Pilates",
    "Plyometrics",
  ];
  const goalOptions = [
    "Weight Loss",
    "Maintenance",
    "Hypertrophy",
    "Strength",
    "Cardiovascular Health",
    "Endurance",
    "Overall Wellness",
    "Mental Health",
  ];
  const equipmentOptions = [
    "None",
    "Bands",
    "Dumbbells",
    "Barbell and Weights",
    "Gym Machines",
    "Pulley System",
    "Pull Up Bar",
  ];
  const dietOptions = [
    "Vegetarian",
    "Vegan",
    "Keto",
    "Paleo",
    "Lactose and Dairy Free",
    "Gluten Free",
    "Pescatarian",
    "Sugar Free",
    "Nut Free",
    "No Shellfish",
  ];

  return (
    <div className="register-wrapper">
      {/* Logo at the top */}
      <img src={logo} alt="Macro Mind Logo" className="register-logo" />

      {/* Gradient background container */}
      <div className="register-background">
        <form onSubmit={RegisteredUser} className="register-form">
          <h2 className="register-title">Register</h2>

          {/* Username */}
          <div className="form-field">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="form-input"
            />
          </div>

          {/* Email */}
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="form-input"
            />
          </div>

          {/* Password */}
          <div className="form-field">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="form-input"
            />
          </div>

          {/* Additional User Information */}
          <h3 className="section-title">User Information</h3>

          {/* Age */}
          <div className="form-field">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter your age"
              value={data.age}
              onChange={(e) => setData({ ...data, age: e.target.value })}
              className="form-input"
            />
          </div>

          {/* Sex */}
          <div className="form-field">
            <span className="form-label">Sex</span>
            <div className="radio-group">
              <label className="form-label">
                <input
                  type="radio"
                  name="sex"
                  value="Male"
                  checked={data.sex === "Male"}
                  onChange={(e) => setData({ ...data, sex: e.target.value })}
                />
                Male
              </label>
              <label className="form-label">
                <input
                  type="radio"
                  name="sex"
                  value="Female"
                  checked={data.sex === "Female"}
                  onChange={(e) => setData({ ...data, sex: e.target.value })}
                />
                Female
              </label>
            </div>
          </div>

          {/* Weight */}
          <div className="form-field">
            <label htmlFor="weight" className="form-label">
              Weight (lbs)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              placeholder="Enter your weight"
              value={data.weight}
              onChange={(e) => setData({ ...data, weight: e.target.value })}
              className="form-input"
            />
          </div>

          {/* Height */}
          <div className="form-field">
            <label htmlFor="height" className="form-label">
              Height (in)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              placeholder="Enter your height in inches"
              value={data.height}
              onChange={(e) => setData({ ...data, height: e.target.value })}
              className="form-input"
            />
          </div>

          {/* Workout Style */}
          <div className="form-field columns">
            <span className="form-label">Preferred Method of Workout</span>
            {workoutOptions.map((styleOption) => (
              <label key={styleOption} className="checkbox-container">
                <input
                  type="checkbox"
                  name="workoutStyle"
                  value={styleOption}
                  checked={data.workoutStyle.includes(styleOption)}
                  onChange={(e) => handleCheckboxChange(e, "workoutStyle")}
                />
                {styleOption}
              </label>
            ))}
          </div>

          {/* Fitness Goals */}
          <div className="form-field columns">
            <span className="form-label">Fitness Goals</span>
            {goalOptions.map((goal) => (
              <label key={goal} className="checkbox-container">
                <input
                  type="checkbox"
                  name="goals"
                  value={goal}
                  checked={data.goals.includes(goal)}
                  onChange={(e) => handleCheckboxChange(e, "goals")}
                />
                {goal}
              </label>
            ))}
          </div>

          {/* Equipment */}
          <div className="form-field columns">
            <span className="form-label">
              Select all equipment you have access to
            </span>
            {equipmentOptions.map((equip) => (
              <label key={equip} className="checkbox-container">
                <input
                  type="checkbox"
                  name="equipment"
                  value={equip}
                  checked={data.equipment.includes(equip)}
                  onChange={(e) => handleCheckboxChange(e, "equipment")}
                />
                {equip}
              </label>
            ))}
          </div>

          {/* Level */}
          <div className="form-field">
            <label htmlFor="level" className="form-label">
              Level
            </label>
            <select
              id="level"
              name="level"
              value={data.level}
              onChange={(e) => setData({ ...data, level: e.target.value })}
              className="form-select"
            >
              <option value="">Select your skill level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

{/* Dietary Restrictions */}
<div className="form-field columns">
  <label className="form-label">Dietary Restrictions</label>
  {dietOptions.map((dietOption) => (
    <label key={dietOption} className="checkbox-container">
      <input
        type="checkbox"
        name="diet"
        value={dietOption}
        checked={data.diet.includes(dietOption)}
        onChange={(e) => handleCheckboxChange(e, "diet")}
      />
      {dietOption}
    </label>
  ))}
</div>


          {/* Activity Level */}
          <div className="form-field">
            <label htmlFor="activity" className="form-label">
              Activity Level
            </label>
            <select
              id="activity"
              name="activity"
              value={data.activity}
              onChange={(e) => setData({ ...data, activity: e.target.value })}
              className="form-select"
            >
              <option value="">Select your daily activity level</option>
              <option value="1.2">Little or no exercise</option>
              <option value="1.375">Light exercise 1-3 times/week</option>
              <option value="1.55">Moderate exercise 3-5 times/week</option>
              <option value="1.725">Hard exercise 6-7 times/week</option>
              <option value="1.9">
                Physical job or daily intense exercise
              </option>
            </select>
          </div>

          <button type="submit" className="register-button">
            Register User
          </button>

          <p className="register-login">
            Already have an account?{" "}
            <a href="/login" className="login-link">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
