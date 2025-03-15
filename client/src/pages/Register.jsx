import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      setData((prevData) => {
        const updated = [...prevData[field], value];
        console.log(`Updated ${field}:`, updated);
        return { ...prevData, [field]: updated };
      });
    } else {
      setData((prevData) => {
        const updated = prevData[field].filter((item) => item !== value);
        console.log(`Updated ${field}:`, updated);
        return { ...prevData, [field]: updated };
      });
    }
  };
  

  const RegisteredUser = async (e) => {
    e.preventDefault();
    const { username, email, password, age, sex, weight, height, workoutStyle, goals, equipment, level, diet, activity } = data;
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
        activity
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "10px",
        color: "#333", // Ensures default text color is dark
      }}
    >
      <form
        onSubmit={RegisteredUser}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "600px",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "1.8rem", color: "#333" }}>Register</h2>

        {/* Username */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username" style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "1rem", color: "#333" }}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "1rem", color: "#333" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "1rem", color: "#333" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Additional User Information */}
        <h3 style={{ marginTop: "30px", marginBottom: "15px", fontSize: "1.4rem", color: "#333" }}>User Information</h3>

        {/* Age */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="age" style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "1rem", color: "#333" }}>
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Enter your age"
            value={data.age}
            onChange={(e) => setData({ ...data, age: e.target.value })}
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        {/* Sex */}
        <div style={{ marginBottom: "15px" }}>
          <span style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "1rem", color: "#333" }}>Sex</span>
          <label style={{ marginRight: "10px" }}>
            <input
              type="radio"
              name="sex"
              value="Male"
              checked={data.sex === "Male"}
              onChange={(e) => setData({ ...data, sex: e.target.value })}
            />
            Male
          </label>
          <label>
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

        {/* Weight */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="weight" style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "1rem", color: "#333" }}>
            Weight (lbs)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            placeholder="Enter your weight"
            value={data.weight}
            onChange={(e) => setData({ ...data, weight: e.target.value })}
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        {/* Height */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="height" style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "1rem", color: "#333" }}>
            Height (in)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            placeholder="Enter your height in inches"
            value={data.height}
            onChange={(e) => setData({ ...data, height: e.target.value })}
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        {/* Workout Style */}
        <div style={{ marginBottom: "15px" }}>
          <span style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "1rem", color: "#333" }}>Preferred Method of Workout</span>
          {["Calisthenics", "Resistance Training", "HIIT", "Running", "Weight Training", "Pilates", "Plyometrics"].map((styleOption) => (
            <label key={styleOption} style={{ display: "block", marginBottom: "5px" }}>
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
        <div style={{ marginBottom: "15px" }}>
          <span style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "1rem", color: "#333" }}>Fitness Goals</span>
          {["Weight Loss", "Maintenance", "Hypertrophy", "Strength", "Cardiovascular Health", "Endurance", "Overall Wellness", "Mental Health"].map((goal) => (
            <label key={goal} style={{ display: "block", marginBottom: "5px" }}>
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
        <div style={{ marginBottom: "15px" }}>
          <span style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "1rem", color: "#333" }}>Select all equipment you have access to</span>
          {["None", "Bands", "Dumbbells", "Barbell and Weights", "Gym Machines", "Pulley System", "Pull Up Bar"].map((equip) => (
            <label key={equip} style={{ display: "block", marginBottom: "5px" }}>
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
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="level" style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "1rem", color: "#333" }}>
            Level
          </label>
          <select
            id="level"
            name="level"
            value={data.level}
            onChange={(e) => setData({ ...data, level: e.target.value })}
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
          >
            <option value="">Select your skill level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Dietary Restrictions */}
        <div style={{ marginBottom: "15px" }}>
          <span style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "1rem", color: "#333" }}>Dietary Restrictions</span>
          {[
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
          ].map((dietOption) => (
            <label key={dietOption} style={{ display: "block", marginBottom: "5px" }}>
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
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="activity" style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "1rem", color: "#333" }}>
            Activity Level
          </label>
          <select
            id="activity"
            name="activity"
            value={data.activity}
            onChange={(e) => setData({ ...data, activity: e.target.value })}
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
          >
            <option value="">Select your daily activity level</option>
            <option value="1.2">Little or no exercise</option>
            <option value="1.375">Light exercise 1-3 times/week</option>
            <option value="1.55">Moderate exercise 3-5 times/week</option>
            <option value="1.725">Hard exercise 6-7 times/week</option>
            <option value="1.9">Physical job or daily intense exercise</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Register User
        </button>

        <p style={{ textAlign: "center", marginTop: "15px", fontSize: "0.9rem", color: "#777" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#007BFF", textDecoration: "none" }}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
