import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext"; // adjust path if needed
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleBrandClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-row">
        <div className="brand" onClick={handleBrandClick} style={{ cursor: 'pointer' }}>
          MacroMind
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>☰</div>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
        <li><Link to="/muscle-model" className="nav-link" onClick={() => setMenuOpen(false)}>Muscle Model</Link></li>
        <li><Link to="/motivation" className="nav-link" onClick={() => setMenuOpen(false)}>Motivation</Link></li>
        <li><Link to="/Login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</Link></li>
      </ul>
    </nav>
  );
}
