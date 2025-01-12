import { Link } from "react-router-dom";
import './Navbar.css';  // Make sure to link a separate CSS file for styling

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/Register" className="nav-link">Register</Link>
      <Link to="/Login" className="nav-link">Login</Link>
    </nav>
  );
}
