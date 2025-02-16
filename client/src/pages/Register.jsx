import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    sex: '',
    weight: '',
    height: '',
    workoutStyle: [],
    goals: [],
    equipment: [],
    level: '',
    diet: [],
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
    const { username, email, password, age, sex, weight, height, workoutStyle, goals, equipment, level, diet } = data;
    try {
      const response = await axios.post('/register', {
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
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({ username: '', email: '', password: '', age: '', sex: '', weight: '', height: '', workoutStyle: [], goals: [], equipment: [], level: '', diet: [] });
        toast.success('Registration successful. Welcome!');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while registering.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9f9f9',
      padding: '10px',
    }}>
      <form
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          boxSizing: 'border-box',
        }}
        onSubmit={RegisteredUser} // Attach handler here
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem', color: '#333' }}>Register</h2>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem', color: '#555' }}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem', color: '#555' }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem', color: '#555' }}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <form
  onSubmit={RegisteredUser} // or your final submit handler for registration
  style={{
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box',
  }}
>
  <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem', color: '#333' }}>
    User Information
  </h2>

  {/* Age */}
  <div style={{ marginBottom: '15px' }}>
    <label htmlFor="age" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Age</label>
    <input
      type="number"
      id="age"
      name="age"
      placeholder="Enter your age"
      value={data.age}
      onChange={(e) => setData({ ...data, age: e.target.value })}
      style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
    />
  </div>

  {/* Sex */}
  <div style={{ marginBottom: '15px' }}>
  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Sex</label>
  <label style={{ marginRight: '10px' }}>
    <input
      type="radio"
      name="sex"
      value="Male"
      checked={data.sex === 'Male'}
      onChange={(e) => setData({ ...data, sex: e.target.value })}
    />
    Male
  </label>
  <label>
    <input
      type="radio"
      name="sex"
      value="Female"
      checked={data.sex === 'Female'}
      onChange={(e) => setData({ ...data, sex: e.target.value })}
    />
    Female
  </label>
</div>

  {/* Weight */}
  <div style={{ marginBottom: '15px' }}>
    <label htmlFor="weight" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Weight (lbs)</label>
    <input
      type="number"
      id="weight"
      name="weight"
      placeholder="Enter your weight"
      value={data.weight}
      onChange={(e) => setData({ ...data, weight: e.target.value })}
      style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
    />
  </div>

  {/* Height */}
  <div style={{ marginBottom: '15px' }}>
    <label htmlFor="height" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Height (in)</label>
    <input
      type="number"
      id="height"
      name="height"
      placeholder="Enter your height in inches"
      value={data.height}
      onChange={(e) => setData({ ...data, height: e.target.value })}
      style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
    />
  </div>

  {/* Workout Style */}
  <div style={{ marginBottom: '15px' }}>
  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
    Preferred Method of Workout
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="workoutStyle"
      value="Calisthenics"
      checked={data.workoutStyle.includes("Calisthenics")}
      onChange={(e) => handleCheckboxChange(e, 'workoutStyle')}
    />
    Calisthenics
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="workoutStyle"
      value="Resistance Training"
      checked={data.workoutStyle.includes("Resistance Training")}
      onChange={(e) => handleCheckboxChange(e, 'workoutStyle')}
    />
    Resistance Training
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="workoutStyle"
      value="HIIT"
      checked={data.workoutStyle.includes("HIIT")}
      onChange={(e) => handleCheckboxChange(e, 'workoutStyle')}
    />
    HIIT
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="workoutStyle"
      value="Running"
      checked={data.workoutStyle.includes("Running")}
      onChange={(e) => handleCheckboxChange(e, 'workoutStyle')}
    />
    Running
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="workoutStyle"
      value="Weight Training"
      checked={data.workoutStyle.includes("Weight Training")}
      onChange={(e) => handleCheckboxChange(e, 'workoutStyle')}
    />
    Weight Training
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="workoutStyle"
      value="Pilates"
      checked={data.workoutStyle.includes("Pilates")}
      onChange={(e) => handleCheckboxChange(e, 'workoutStyle')}
    />
    Pilates
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="workoutStyle"
      value="Plyometrics"
      checked={data.workoutStyle.includes("Plyometrics")}
      onChange={(e) => handleCheckboxChange(e, 'workoutStyle')}
    />
    Plyometrics
  </label>
</div>

  {/* Goals */}
  <div style={{ marginBottom: '15px' }}>
  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
    Fitness Goals
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="goals"
      value="Weight Loss"
      checked={data.goals.includes("Weight Loss")}
      onChange={(e) => handleCheckboxChange(e, 'goals')}
    />
    Weight Loss
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="goals"
      value="Maintenance"
      checked={data.goals.includes("Maintenance")}
      onChange={(e) => handleCheckboxChange(e, 'goals')}
    />
    Maintenance
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="goals"
      value="Hypertrophy"
      checked={data.goals.includes("Hypertrophy")}
      onChange={(e) => handleCheckboxChange(e, 'goals')}
    />
    Hypertrophy
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="goals"
      value="Strength"
      checked={data.goals.includes("Strength")}
      onChange={(e) => handleCheckboxChange(e, 'goals')}
    />
    Strength
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="goals"
      value="Cardiovascular Health"
      checked={data.goals.includes("Cardiovascular Health")}
      onChange={(e) => handleCheckboxChange(e, 'goals')}
    />
    Cardiovascular Health
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="goals"
      value="Endurance"
      checked={data.goals.includes("Endurance")}
      onChange={(e) => handleCheckboxChange(e, 'goals')}
    />
    Endurance
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="goals"
      value="Overall Wellness"
      checked={data.goals.includes("Overall Wellness")}
      onChange={(e) => handleCheckboxChange(e, 'goals')}
    />
    Overall Wellness
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="goals"
      value="Mental Health"
      checked={data.goals.includes("Mental Health")}
      onChange={(e) => handleCheckboxChange(e, 'goals')}
    />
    Mental Health
  </label>
</div>

  {/* Equipment */}
  <div style={{ marginBottom: '15px' }}>
  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
    Select all equipment you have access to
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="equipment"
      value="None"
      checked={data.equipment.includes("None")}
      onChange={(e) => handleCheckboxChange(e, 'equipment')}
    />
    None
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="equipment"
      value="Bands"
      checked={data.equipment.includes("Bands")}
      onChange={(e) => handleCheckboxChange(e, 'equipment')}
    />
    Resistance Bands
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="equipment"
      value="Dumbbells"
      checked={data.equipment.includes("Dumbbells")}
      onChange={(e) => handleCheckboxChange(e, 'equipment')}
    />
    Dumbbells
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="equipment"
      value="Barbell and Weights"
      checked={data.equipment.includes("Barbell and Weights")}
      onChange={(e) => handleCheckboxChange(e, 'equipment')}
    />
    Barbell and Weights
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="equipment"
      value="Gym Machines"
      checked={data.equipment.includes("Gym Machines")}
      onChange={(e) => handleCheckboxChange(e, 'equipment')}
    />
    Gym Machines
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="equipment"
      value="Pulley System"
      checked={data.equipment.includes("Pulley System")}
      onChange={(e) => handleCheckboxChange(e, 'equipment')}
    />
    Pulley System
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="equipment"
      value="Pull Up Bar"
      checked={data.equipment.includes("Pull Up Bar")}
      onChange={(e) => handleCheckboxChange(e, 'equipment')}
    />
    Pull Up Bar
  </label>
</div>

  {/* Level */}
  <div style={{ marginBottom: '15px' }}>
    <label htmlFor="level" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Level</label>
    <select
      id="level"
      name="level"
      value={data.level}
      onChange={(e) => setData({ ...data, level: e.target.value })}
      style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
    >
      <option value="">Select your skill level</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
    </select>
  </div>

  {/* Diet */}
  <div style={{ marginBottom: '15px' }}>
  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
    Dietary Restrictions
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="diet"
      value="Vegetarian"
      checked={data.diet.includes("Vegetarian")}
      onChange={(e) => handleCheckboxChange(e, 'diet')}
    />
    Vegetarian
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="diet"
      value="Vegan"
      checked={data.diet.includes("Vegan")}
      onChange={(e) => handleCheckboxChange(e, 'diet')}
    />
    Vegan
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="diet"
      value="Keto"
      checked={data.diet.includes("Keto")}
      onChange={(e) => handleCheckboxChange(e, 'diet')}
    />
    Keto
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="diet"
      value="Paleo"
      checked={data.diet.includes("Paleo")}
      onChange={(e) => handleCheckboxChange(e, 'diet')}
    />
    Paleo
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="diet"
      value="Lactose and Dairy Free"
      checked={data.diet.includes("Lactose and Dairy Free")}
      onChange={(e) => handleCheckboxChange(e, 'diet')}
    />
    Lactose and Dairy Free
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="diet"
      value="Gluten Free"
      checked={data.diet.includes("Gluten Free")}
      onChange={(e) => handleCheckboxChange(e, 'diet')}
    />
    Gluten Free
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="diet"
      value="Pescatarian"
      checked={data.diet.includes("Pescatarian")}
      onChange={(e) => handleCheckboxChange(e, 'diet')}
    />
    Pescatarian
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="diet"
      value="Sugar Free"
      checked={data.diet.includes("Sugar Free")}
      onChange={(e) => handleCheckboxChange(e, 'diet')}
    />
    Sugar Free
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="diet"
      value="Nut Free"
      checked={data.diet.includes("Nut Free")}
      onChange={(e) => handleCheckboxChange(e, 'diet')}
    />
    Nut Free
  </label>
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      name="diet"
      value="No Shellfish"
      checked={data.diet.includes("No Shellfish")}
      onChange={(e) => handleCheckboxChange(e, 'diet')}
    />
    No Shellfish
  </label>
</div>

</form>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
        >
          Register User
        </button>

        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9rem', color: '#777' }}>
          Already have an account? <a href='/login' style={{ color: '#007BFF', textDecoration: 'none' }}>Login</a>
        </p>
      </form>
    </div>
  );
}
