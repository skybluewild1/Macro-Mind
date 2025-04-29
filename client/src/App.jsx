import './App.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from "../src/components/Navbar";
import Home from "../src/pages/Home";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext';
import Dashboard from "./pages/Dashboard";
import TrackCals from "./pages/TrackCals";
import Workouts from "./pages/Workouts";
import MuscleModel from './muscleModel/MuscleModel';
import Motivation from './pages/Motivation';
import PremadeWorkoutDetails from './pages/PremadeWorkoutDetails';
import CreateWorkout from './pages/CreateWorkout';
import CustomWorkoutDetails from './pages/CustomWorkoutDetails';
//import { CustomWorkoutDetails } from './pages/CustomWorkoutDetails';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
//creates the routes to the pages
function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position = 'bottom-right' toastOptions={{duration: 2000}} />
      <Routes>
       <Route path='/' element = {<Home />} />
       <Route path='/register' element = {<Register />} />
       <Route path='/login' element = {<Login />} />
       <Route path='/dashboard' element = {<Dashboard />} />
       <Route path="/trackcals" element={<TrackCals />} />
       <Route path="/workouts" element={<Workouts />} />
       <Route path="/muscle-model" element={<MuscleModel />} />
       <Route path="/motivation" element={<Motivation />} />
       <Route path="/premade-workouts/:id" element={<PremadeWorkoutDetails />} />
       <Route path="/create-workout" element={<CreateWorkout />} />
       <Route path="/custom-workouts/:userId/:workoutId" element={<CustomWorkoutDetails />} />
      </Routes>   
    </UserContextProvider>
  )
}

export default App
