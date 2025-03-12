import { Link } from "react-router-dom";
import './Navbar.css';  // Make sure to link a separate CSS file for styling

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/dashboard" className="nav-link">Dashboard</Link>
      <Link to="/muscle-model" className="nav-link">Muscle Model</Link>
      <Link to="/motivation" className="nav-link">Motivation</Link>
      <Link to="/Login" className="nav-link">Login</Link>
    </nav>
  );
}
