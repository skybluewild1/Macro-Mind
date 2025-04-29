import { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-row">
        <div className="brand">MacroMind</div>
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
